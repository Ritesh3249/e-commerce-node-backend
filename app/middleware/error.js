const { JsonWebTokenError } = require("jsonwebtoken");

module.exports = (err,req,res,next)=>{
    let {status,message,name} = err
    if(err instanceof JsonWebTokenError){
        status = 401
    }
    if(!status){
        status = 500;
        message = "Internal server error"
    }
    if(name == "TokenExpiredError"){
        status = 401;
        message = "The token is expired"
    }
    // next(err)
    return res.status(status).send({message})
}