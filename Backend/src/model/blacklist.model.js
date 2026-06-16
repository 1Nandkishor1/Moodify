let mongoose=require('mongoose')

let schema=mongoose.Schema({
    token:{
        type:String,
        require:[true,"Token Is Required To be Blacklisted"]
    }
},
    {timestamps:true}
)

let blacklistModel=mongoose.model('blacklist',schema)

module.exports=blacklistModel;