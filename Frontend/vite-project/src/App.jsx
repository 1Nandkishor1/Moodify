import React from 'react';
import routes from "./routes";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Features/auth/auth.context";
import "./Features/global/style/global.scss";
import EmotionDetector from './Features/screen/pages/EmotionDetector';
import { SongProvider } from './Features/Home/song.context';


const App = () => {
  return (
    <AuthProvider>
      <SongProvider>   {/* ✅ IMPORTANT */}
        <RouterProvider router={routes} />
      </SongProvider>
    </AuthProvider>
  );
};

export default App;