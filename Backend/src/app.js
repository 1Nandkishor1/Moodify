
let cookie=require('cookie-parser')
let express=require('express')
let app=express();
app.use(express.json())
app.use(cookie())
let cors=require('cors');
app.use(cors({
  credentials: true,
  origin: "https://moodify-9h9y.onrender.com",
}));

let userroute=require('./routes/user.route')
let songroute=require('./routes/song.route')

app.use('/api/auth',userroute)
app.use('/api/song',songroute)


module.exports=app;