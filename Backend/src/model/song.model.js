let mongoose=require('mongoose')

let schema=mongoose.Schema({
    songurl:{
        type:String,
        require:[true,"Songurl is Required"]
    },
    posterurl:{
        type:String,
        require:[true,"Poster url is Required"]
    },
    songname:{
        type:String,
        require:[true,"Song Name is Required"]
    },
    singers:{
        type:String,
        require:[true,"Singers Name is Required"]
    },
    mood:{
        type:String,
        enum:["happy","surprise","neutral","sad"]
    }
})

let songmodel=mongoose.model('song',schema)

module.exports=songmodel

