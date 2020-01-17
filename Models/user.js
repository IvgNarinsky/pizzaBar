const mongoose = require("mongoose")
const {Schema} =mongoose
const jwt=require('jsonwebtoken')
const key=require('../config/keys')
const bcypte=require('bcrypt')

const user=new Schema({
    firstName:{type:String,trim:true,lowercase:true,required:true},
    lastName:{type:String,trim:true,lowercase:true,required:true},
    email:{type:String,trim:true,lowercase:true,required:true,unique:true,required:true,
    validate(v){
        if(!(v.includes(".com")&&v.includes("@"))){
            throw new Error("invalid email")
        }
    }},
    tokens:[{token:{type:String}}],
    password:{type:String,trim:true,required:true},
    time:String,
    date:String
})

user.methods.generateToken=function(){
    const user=this
    const token=jwt.sign({_id:user._id.toHexString()},key.SECRET,{expiresIn:"3 weeks"})
    user.tokens.push({token})
    return user.save().then(user=>{
        return Promise.resolve(token)
    }).catch(err=>{
        return Promise.reject(err)
    })
}

user.methods.toJSON=function(){
    const user=this
    const userObject=user.toObject()
    delete userObject.password
    return userObject
}

 user.statics.userWithCord=async function (email,password)
{
    const user=await this.findOne({email:email})
    if(!user)
    {
        throw new Error("unable to login")
    }
    const isMatch=await bcypte.compare(password,user.password)
    if(isMatch)
    {       
        return user
    }else{
        throw new Error("unale to login ")
    }

 
}
user.pre("save",async function(){
       const user=this
       if(user.isModified("password")){
           user.password=await bcypte.hash(user.password,8)
       } 
})

mongoose.model('USER',user)