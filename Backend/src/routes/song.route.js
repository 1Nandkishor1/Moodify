let express=require('express')
let router=express.Router()
let songcontroller=require('../controllers/songupload.controller')
let authuser=require('../middleware/auth.middleware')
const { upload } = require('../middleware/multer')

router.post("/upload",upload.single("song"),songcontroller.songuploadcontroller)

router.get("/get",songcontroller.songgetcontroller)

module.exports=router;