const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const { genSaltSync, hashSync } = require('bcryptjs');

const user = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique:[true,"this email is already associated with an account"]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});
user.pre("save",function (next){
    if(!this.isModified("password")){
        return next();
    }
    const salt = genSaltSync(12);
    const hashedPassword = hashSync(this.password,salt);
    this.password = hashedPassword;
    next();
})
user.method("createJWT",function(){
    return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
})
const User = mongoose.model('User', user);
module.exports = User;