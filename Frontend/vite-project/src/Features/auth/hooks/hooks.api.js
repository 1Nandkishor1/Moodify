
import { registerUser,loginUser,getMe,logoutUser } from "../services/auth.api";
import {  useContext, useEffect} from "react";
import { AuthContext } from "../auth.context";

export function useAuth(){
let context=useContext(AuthContext);
let{user,setuser,loading,setloading}=context;

 async function register(username,email,password){
    try{
        setloading(true);
        let res =await registerUser(username,email,password);
        console.log("API RESPONSE:", res.userdata);
        setuser(res.userdata); 
        setloading(false);
        }catch(error){
            throw error;
        }
        finally{
            setloading(false);
        }
    }

     async function login(email,password){
        try{
            setloading(true);
            let res=await loginUser(email,password);
            console.log("API RESPONSE:", res.userdata);
            setuser(res.userdata);
            setloading(false);
        }catch(error){
            throw error;
        }
        finally{
            setloading(false);
        }
    }

    async function logout() {
        try {
            setloading(true);
            await logoutUser();
            setuser(null);
        } catch (error) {
            throw error;
        } finally {
            setloading(false);
        }
    }

    return { register, login, logout, user, loading };
}
