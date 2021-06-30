import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import validator from "validator"

const userSchema=mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[{validator:validator.isEmail,message:"Invalid email"}]
    },
    password:{
        type:String,
        required:true,
        validate:[{validator:validator.isStrongPassword,message:"Weak password"}]
    }
},
{
    timestamps:true
})


userSchema.pre('save',async function(){
    const user=this

    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
        console.log("pass hashed",user.password)
    }
})


//to create a new User model
const User=mongoose.model('User',userSchema)

export default User