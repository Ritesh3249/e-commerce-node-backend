const createHttpError = require("http-errors")
const authValidator = require("../../validator/authValidator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const fs = require("fs")
const UserSchema = require("../../model/User")



class AuthUserController {
    async register(req, res, next) {
        let bodyData = authValidator.register(req.body)


        let findData = await UserSchema.findOne({ email: bodyData.email })
        console.log("we are here",bodyData)
        if (findData) {
            return next(createHttpError(401, "User already exists"))
        }

        bodyData.password = await bcrypt.hash(bodyData.password, 10)
        let user = await UserSchema.create(bodyData);
        if(!user){
            return next(createHttpError(401, "User not created"))

        }
        let token = jwt.sign({
            name: bodyData.name,
            email: bodyData.email
        }, process.env.SECRET_ACCESS_KEY
            , {
                expiresIn: "120000h"
            }
        ) 
        return res.status(200).send({ token,message:"Register successfully" })




    }
    async login(req, res, next) {
        let bodyData = authValidator.login(req.body)


        let findData = await UserSchema.findOne({ email: bodyData.email })
        console.log("we are here",findData)
        if (!findData) {
            return next(createHttpError(401, "User not exists"))
        }

       let com = await bcrypt.compareSync(bodyData.password, findData.password)
        if(!com){
            return next(createHttpError(401, "Invalid password"))

        }
        let token = jwt.sign({
            name: bodyData.name,
            email: bodyData.email
        }, process.env.SECRET_ACCESS_KEY
            , {
                expiresIn: "120000h"
            }
        ) 
        return res.status(200).send({ token,message:"Login successfully" })




    }
}

module.exports = new AuthUserController()