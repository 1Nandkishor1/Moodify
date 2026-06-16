import axios from "axios";

let api=axios.create({
    baseURL:"http://localhost:3000/api/song",
    withCredentials:true
})

export async function getsong(mood){
    let res=await api.get("/get?mood="+mood)
    console.log(res.data)
    return res.data;
}
