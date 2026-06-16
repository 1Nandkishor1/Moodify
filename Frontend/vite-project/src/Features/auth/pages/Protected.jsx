
import React from 'react'
import { useAuth } from '../hooks/hooks.api'
import {  useNavigate,Navigate} from "react-router-dom";

const Protected = ({children}) => {
    let navigate=useNavigate();
    let{loading,user}=useAuth();
    console.log(user);

    if (loading) {
        return (
            <div className="auth-container">
                <div className="auth-background">
                    <div className="blob blob-1"></div>
                    <div className="blob blob-2"></div>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin"></div>
                    <p className="text-muted">Authenticating...</p>
                </div>
            </div>
        );
    }
    
     if(!user){
       return  <Navigate to={"/login"} />
     }
    
  return (
    children
  )
}

export default Protected



// 1. Component function runs (render phase)
// 2. JSX is returned (UI prepared)
// 3. DOM updates (paint happens)
// 4. useEffect runs (after render)