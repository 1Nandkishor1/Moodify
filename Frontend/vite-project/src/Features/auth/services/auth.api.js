import axios from "axios";
let api=axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
})

export async function registerUser(username,email,password){
    try {
        let res=await api.post("/register",{username,email,password})
        console.log(res.data)
        return res.data;

    } catch (error) {
        console.log(error);
        throw error.response?.data || { message: "Server connection failed. Please check if the backend is running." };
    }
}

export async function loginUser(email,password){
    try {
        let res=await api.post("/login",{email,password})
        return res.data;
    } catch (error) {
        console.log(error);
        throw error.response?.data || { message: "Server connection failed. Please check if the backend is running." };
    }
}

export async function getMe(){
    try {
        let res=await api.get("/get-me")
        return res.data;
    } catch (error) {
        console.log(error);
        throw error.response?.data || { message: "Server connection failed. Please check if the backend is running." };
    }
}

export async function logoutUser(){
    try {
        let res=await api.post("/log-out")
        return res.data;
    } catch (error) {
        console.log(error);
        throw error.response?.data || { message: "Server connection failed." };
    }
}