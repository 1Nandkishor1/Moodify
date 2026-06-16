let mongoose=require('mongoose')

let schema=mongoose.Schema({
    username:{
        type:String,
        unique:[true,"User Exist With this Name"],
        require:true,
    },
    email:{
        type:String,
        unique:[true,"Email Already Exist"],
        require:true
    },
    password:{
        type:String,
        require:true,
        select:false
    }
})

let usermodel=mongoose.model('user',schema)

module.exports=usermodel

