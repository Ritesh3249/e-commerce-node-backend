const createError = require("http-errors")
const Joi = require("joi")

class JoiValidator{

    validate(joiSchema,obj){
        const objectSchema = Joi.object(joiSchema)
        const {value,error} = objectSchema.validate(obj)
        if(error) throw createError.NotAcceptable(error.details[0].message)
        return value
    }
}

module.exports = JoiValidator
 