let mongoose=require('mongoose')

async function ConnectToDB(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Database Is Connected ");
        
    })
}

module.exports=ConnectToDB;


