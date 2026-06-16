const songmodel = require("../model/song.model");
const NodeID3 = require("node-id3");
const uploadFile = require("../services/imagekit");
const { all } = require("../app");

async function songuploadcontroller(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const songBuffer = req.file.buffer;
    console.log(req.body.mood)

    // 🔹 Extract metadata
    const tags = NodeID3.read(songBuffer);
    let [songUpload, imageUpload] = await Promise.all([
      uploadFile({
        buffer: songBuffer,
        fileName: tags.title || req.file.originalname,
        folder: "songs",
      }),
      // 🔹 Upload cover
      uploadFile({
        buffer: tags.image.imageBuffer,
        fileName: `${Date.now()}-cover.jpg`,
        folder: "covers",
      }),
    ]);
    // 🔹 Upload song

    // 🔹 Save to DB
    const newSong = await songmodel.create({
      songurl: songUpload.url,
      posterurl: imageUpload.url,
      songname: tags.title?.trim() || req.file.originalname,
      singers: tags.artist || "Unknown",
      mood:req.body.mood,
    });

    console.log("Saved to DB:", newSong);

    res.status(201).json({
      message: "Song Uploaded Successfully",
      song: newSong,
    });
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ message: "Upload failed" });
  }
}

async function songgetcontroller(req,res){
    let mood=req.query.mood;
    console.log(mood)
    let song=await songmodel.find({mood:mood})

    res.status(200).json({
        message:"Song Fetched Successfully",
        song
    })

}

module.exports = { songuploadcontroller,songgetcontroller };
