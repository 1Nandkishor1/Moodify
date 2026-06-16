let usermodel=require('../model/user.model')
let express=require('express')
let userroute=express.Router()
let authController=require('../controllers/auth.controller')
let authuser=require('../middleware/auth.middleware')

userroute.post('/register',authController.registerController);

userroute.post('/login',authController.loginController);

userroute.get('/get-me',authuser.authUser,authController.getmeController);

userroute.post('/log-out',authController.logoutController);


module.exports=userroute;