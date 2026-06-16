import React, { useState, useEffect, createContext } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await getMe();
      if (res && res.userdata) {
        setuser(res.userdata);
      }
    } catch (error) {
      console.error("Initial auth check failed:", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setuser, loading, setloading }}>
      {children}
    </AuthContext.Provider>
  );
};



