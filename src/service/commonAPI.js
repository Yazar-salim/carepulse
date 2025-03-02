import axios from "axios";
import { baseURL } from "./baseURl";


export const commonAPI= async(method,endpoint,requestbody)=>{
    const datas ={
        method:method,
        url:baseURL+endpoint,
        data:requestbody
    }

    return await axios(datas)
    .then ((obj)=>{
        return obj
    })
    .catch ((error)=>{
        return error
    })
}