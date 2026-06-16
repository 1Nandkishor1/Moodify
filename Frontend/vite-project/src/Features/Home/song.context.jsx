import { createContext, useState } from "react";

export const songContext = createContext();

export const SongProvider = ({ children }) => {
  const [song, setsong] = useState(null);
  const [loading, setloading] = useState(false);

  return (
    <songContext.Provider value={{ song, setsong, loading, setloading }}>
      {children}
    </songContext.Provider>
  );
};