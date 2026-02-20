const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { findOne, exists } = require('./workoutModel');

const validator = require('validator')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required :true
    }

});

// for register or signup
userSchema.statics.signup = async function(email , password){

    if(!email || !password){
        throw new Error("all fields must be filled");
    }

    if(!validator.isEmail(email)){
        throw new  Error("email not valid")
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("password is not strong")
    }

    const exists = await this.findOne({email})
    if(exists){
        throw new  Error("email already in use")
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password , salt);

    //create
    const user = await this.create({email , password : hash});

    return user;
}


// for login or signin
userSchema.statics.login = async function (email , password) {
    
    if(!email || !password){
        throw new Error("all fields must be filled");
    }

    const user = await this.findOne({email});
    if(!user){
        throw new Error("incorrect email")
    }

    const match = await bcrypt.compare(password , user.password);
    if(!match){
        throw new Error("incorrect password")
    }

    return user;
}

module.exports = mongoose.model('User' , userSchema);