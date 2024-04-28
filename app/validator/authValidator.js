const Joi = require("joi");
const JoiValidator = require("./joiValidator");

class AuthValidator extends JoiValidator{

    register(obj){
        return this.validate({
            name:Joi.string().required(),
            email:Joi.string().email().required(),
            password:Joi.string()
        },obj)
    }
    login(obj){
        return this.validate({
            email:Joi.string().email(),
            password:Joi.string()
        },obj)
    }
}

module.exports = new AuthValidator()