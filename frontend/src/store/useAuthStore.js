import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast, { Toaster } from 'react-hot-toast';


export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  checkAuth: async () => {
       try{
          const res = await axiosInstance.get("/auth/check");
          set({authUser: res.data}); 
       }catch(error){
          set({authUser: null});
       }
       finally{
          set({isCheckingAuth: false});
       }
  },

  signup: async (data) => {
    set({isSigningUp: true});
    console.log("Signup success:", data);
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({authUser: res.data});
      toast.success("Signup successful");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed");
    } finally {
      set({isSigningUp: false});
    }
  },

  login: async (data) => {
    set({isLoggingIn: true});
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({authUser: res.data.user});
      toast.success("Login successful");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
    } finally {
      set({isLoggingIn: false});
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({authUser: null});
      toast.success("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  }
}))