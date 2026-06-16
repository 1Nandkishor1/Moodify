import axios from "axios";

const api = axios.create({
  baseURL: "https://moodify-9h9y.onrender.com/api/song",
  withCredentials: true,
});

export async function getsong(mood){
    let res=await api.get("/get?mood="+mood)
    console.log(res.data)
    return res.data;
}
