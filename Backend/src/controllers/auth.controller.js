let jwt=require('jsonwebtoken')
let bcrypt=require('bcrypt')
let userModel=require('../model/user.model');
const blacklistModel = require('../model/blacklist.model');
let redis=require('../config/blacklist')



async function registerController(req,res){
    let {username,email,password}=req.body;

    let isUsernameExist=await userModel.findOne({$or:[
        {username:username},
        {email:email}
    ]})

    if(isUsernameExist){
        return res.status(401).json({
            message:"User Already Exist With This Username/Email"
        })
    }
    
  
    let userdata =await userModel.create({username:username,email:email,password:await bcrypt.hash(password,10)})
    let token=jwt.sign(
        {id:userdata._id,
        username:userdata.username},
        process.env.JWT_SECRET
    )

    res.cookie("token",token)

    res.status(201).json({
        message:"User Registered Successfully",
        userdata:{
            username:userdata.username,
            email:userdata.email,
        },
        token
    })
    
}

async function loginController(req,res){
    let {email,password}=req.body;

    let isregistered=await userModel.findOne({email:email}).select("+password");

    if(!isregistered){
        return res.status(401).json({
            message:"User Not Registerd With This Email"
        })
    }
    
    let iscorrectpassword=await bcrypt.compare(password,isregistered.password);
    if(!iscorrectpassword){
        return res.status(401).json({
            message:"Incorrect Password"
        })
    }
    

    let token=jwt.sign({id:isregistered._id,username:isregistered.username},process.env.JWT_SECRET)
    res.cookie("token",token)
    return res.status(200).json({
        message:"User Login Successfull",
        userdata:{
            username:isregistered.username,
            email:isregistered.email,
        },
        token
    })
}

async function getmeController(req,res){
    let userdata=await userModel.findById(req.user.id)

    res.status(200).json({
        message:"User Detaeil Fetched Succesfullt",
        userdata:
        {
            username:userdata.username,
            email:userdata.email,    
        }
    })
}

async function logoutController(req,res){
    let token=req.cookies.token;

    res.clearCookie(token)

    await redis.set(token,Date.now().toString())

    res.status(200).json({
        message:"User Log-Out Successfully"
    })

}

module.exports={
    registerController,loginController,getmeController,logoutController
}

