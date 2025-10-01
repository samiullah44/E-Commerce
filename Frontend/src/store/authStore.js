import {create} from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance=axios.create({
  baseURL:"http://localhost:5000/api",
  withCredentials:true
});
const showError = (error) => {
  if (error.response?.data?.errors) {
    error.response.data.message.forEach(err => toast.error(`${err.field}: ${err.message}`));
  }else if(error.response?.data?.message){
   toast.error(error.response.data.message)
  } else {
    toast.error("Something went wrong");
  }
};


export const useAuthStore=create((set)=>({
authUser:null,
isLogingIn:false,
isSigningUp:false,

signup:async(data)=>{
set({isSigningUp:true});
try {
  const res=await axiosInstance.post("/auth/signup",data);
  set({authUser:res.data});
  toast.success("Account Created Successfully!");
} catch (error) {
  showError(error);
}finally {
  set({ isSigningUp: false });
}
},
login:async(data)=>{
  set({isLogingIn:true});
  try {
    const res=await axiosInstance.post("/auth/login",data);
    set({authUser:res.data});
    toast.success("LoggedIn Successfully!")
    console.log(res.data)
    console.log(res.data);
  } catch (error) {
    showError(error);
  }finally{
    set({isLogingIn:false});
  }
}

}));