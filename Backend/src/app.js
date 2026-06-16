const cookie = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cookie());
app.use(cors({
  credentials: true,
  origin: "https://moodify-9h9y.onrender.com",
}));

const userroute = require('./routes/user.route');
const songroute = require('./routes/song.route');

app.use('/api/auth', userroute);
app.use('/api/song', songroute);

app.use(express.static(path.join(__dirname, "..", "public", "dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "dist", "index.html"));
});

module.exports = app;