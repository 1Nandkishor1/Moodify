import React, { createContext, useContext, useState } from "react";

const EmotionContext = createContext();

export const EmotionProvider = ({ children }) => {
  const [emotion, setEmotion] = useState("Click Start");
  const [isRunning, setIsRunning] = useState(false);

  return (
    <EmotionContext.Provider
      value={{ emotion, setEmotion, isRunning, setIsRunning }}
    >
      {children}
    </EmotionContext.Provider>
  );
};

export const useEmotionContext = () => useContext(EmotionContext);