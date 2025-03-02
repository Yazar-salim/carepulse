import {commonAPI} from "./commonAPI";

export const registerUser= async(requestbody)=>{
    return await commonAPI("post",'/users',requestbody)
}


export const getUserData= async()=>{
    return await commonAPI("get","/users","")
}

export const doctorDataAPI=async ()=>{
    return await commonAPI("get","/doctors","")
}

export const doctorAppointment=async (payload)=>{
    return await commonAPI("post","/appointments",payload)
}

export const showAppointmentsPatient=async()=>{
    return await commonAPI("get","/appointments","")
}

export const getuser=async(user)=>{
    return await commonAPI("get","/users",user)
}

export const updateuserprofile=async(id,updatedetails)=>{
    return await commonAPI("patch",`/users/${id}`,updatedetails)
}



export const updateAppointmentStatus=async (id,updateStatus)=>{
    return await commonAPI("patch",`/appointments/${id}`,JSON.stringify(updateStatus))
}

export const cancelAppointment=async(id)=>{
    return await commonAPI("delete",`/appointments/${id}`,{})
}