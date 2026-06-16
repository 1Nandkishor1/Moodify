import React, { useState } from 'react';
import "../style/auth.scss";
import { useAuth } from "../hooks/hooks.api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, Loader2 } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(username, email, password);
      navigate("/login");
    } catch (err) {
      setError(err?.message || "Registration failed. Please try again.");
      console.log(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="auth-card glass-morphism"
      >
        <div className="auth-header">
          <div className="logo-icon accent-gradient">
            <UserPlus size={24} color="white" />
          </div>
          <h1 className="text-gradient">Create Account</h1>
          <p>Join Moodify and start your musical journey</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="error-message"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={submitHandler} className="auth-form">
          <div className="input-group">
            <User className="input-icon" size={18} />
            <input 
              onChange={(e) => setUsername(e.target.value)} 
              type="text" 
              placeholder="Full Name" 
              required 
            />
          </div>

          <div className="input-group">
            <Mail className="input-icon" size={18} />
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              placeholder="Email address" 
              required 
            />
          </div>
          
          <div className="input-group">
            <Lock className="input-icon" size={18} />
            <input 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              placeholder="Password" 
              required 
            />
          </div>

          <button type="submit" className="submit-btn accent-gradient" disabled={loading}>
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <span>Create Account</span>
                <UserPlus size={18} style={{ marginLeft: '8px' }} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;