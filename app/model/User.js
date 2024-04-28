const mongoose = require("mongoose")

const User = new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
})

const UserSchema = mongoose.model('users',User)

module.exports = UserSchema