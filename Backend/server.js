require('dotenv').config()
let ConnectToDB=require('./src/config/database')
let app=require("./src/app")


app.listen(3000,()=>{
    console.log("Server Is Running On Port 3000");
})

ConnectToDB()
