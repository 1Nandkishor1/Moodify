# Moodify 🎵

> An AI-powered music recommendation engine that detects your mood in real-time and curates personalized playlists — controlled by your hands.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://moodify-9h9y.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/1Nandkishor1/Moodify)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
![React](https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb)
![MediaPipe](https://img.shields.io/badge/Google-MediaPipe-4285F4?style=for-the-badge&logo=google)

---

## 📌 Overview

Moodify is a full-stack MERN application that combines AI-based emotion detection with music recommendations. Using Google MediaPipe, the app analyzes your facial expressions in real-time to identify your current mood and serves music tailored to it. Gesture-based controls via hand-pose detection let you manage playback without touching your keyboard.

---

## ✨ Features

- **Real-Time Emotion Detection** — Uses Google MediaPipe Face Landmarker to identify mood from facial expressions via webcam
- **Mood-Based Music Recommendations** — Dynamically curates songs based on detected emotion (happy, sad, energetic, calm, etc.)
- **Gesture Controls** — Hand-pose detection enables play, pause, skip, and volume control via hand gestures
- **Personalized User Profiles** — Stores listening history and preferences per user
- **Secure Authentication** — JWT-based login/register with `httpOnly` cookie session management
- **Media Management** — Profile and media assets managed via ImageKit
- **MongoDB-Backed Storage** — User data, song metadata, and preferences persisted in MongoDB

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, SCSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| AI / ML | Google MediaPipe (Face Landmarker, Hand Pose) |
| Auth | JWT, bcryptjs, cookie-parser |
| Media | ImageKit |
| Deployment | Render |

---

## 📁 Project Structure

```
Moodify/
├── Backend/
│   ├── routes/
│   │   ├── user.route.js
│   │   └── song.route.js
│   ├── app.js
│   └── server.js
└── Frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── hooks/
    │   ├── api/
    │   └── style/
    └── vite.config.js
```

---

## ⚙️ Local Setup

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- ImageKit account
- Webcam (for emotion detection)

### 1. Clone the repository

```bash
git clone https://github.com/1Nandkishor1/Moodify.git
cd Moodify
```

### 2. Backend setup

```bash
cd Backend
npm install
```

Create a `.env` file in `/Backend`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
CLIENT_URL=http://localhost:5173
```

```bash
node server.js
```

### 3. Frontend setup

```bash
cd Frontend
npm install
npm run dev
```

---

## 🤖 AI Features In Depth

### Emotion Detection
Google MediaPipe's **Face Landmarker** model processes webcam frames client-side to identify facial expressions. The detected emotion maps to a mood category which drives the recommendation engine.

| Detected Mood | Music Category |
|---|---|
| Happy | Upbeat / Pop |
| Sad | Acoustic / Lo-fi |
| Energetic | EDM / Hip-hop |
| Calm | Ambient / Classical |
| Angry | Metal / Rock |

### Gesture Controls
**Hand Pose Detection** via MediaPipe identifies hand landmarks and interprets predefined gesture patterns for:
- ✋ Open palm → Pause
- 👆 Index finger up → Next track
- 👇 Index finger down → Previous track
- ✌️ Two fingers → Volume control

---

## 🔐 Authentication Flow

1. User registers/logs in → JWT token issued and stored in an `httpOnly` cookie
2. `withCredentials: true` ensures cookies are sent on every API request
3. Protected routes validate the token server-side before serving data

---

## 🚀 Deployment

The application is deployed on Render:

- **Frontend** — React/Vite static site served via Render Static Site
- **Backend** — Express API running as a Render Web Service
- Cross-origin cookies configured with `sameSite: "None"` and `secure: true`

**Live URL:** [https://moodify-9h9y.onrender.com](https://moodify-9h9y.onrender.com)

---

## 📸 Screenshots

> _Add screenshots here — emotion detection in action, gesture controls, mood-based playlist view_

---

## 🙋‍♂️ Author

**Nandkishor Kumhar**
- GitHub: [@1Nandkishor1](https://github.com/1Nandkishor1)
- Email: kumharnandkishor01@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
