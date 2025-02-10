import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast, { Toaster } from 'react-hot-toast';
import io from 'socket.io-client';

const BASE_URL = import.meta.env.MODE === "development" ? 'http://localhost:8001' : '/';

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLogin: false,
  isSignUp:false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      toast.error("Failed to check authentication");
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Signup successful");
      get().connectSocket();
      set({isSignUp:true});
    } catch (error) {
      toast.error("Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data.user });
      toast.success("Login successful");
      get().connectSocket();
      set({ isLogin: true });

    } catch (error) {
      toast.error("Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout successful");
      get().disconnectSocket();
    } catch (error) {
      toast.error("Logout failed");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update", data);
      set({ authUser: res.data });
      toast.success("Profile updated");
    } catch (error) {
      toast.error("Profile update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser, setOnlineUsers } = get();
    if (!authUser || (get().socket && get().socket.connected)) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
        email: authUser.email,
      },
    });

    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userSocketMap) => {
      console.log("Socket connected");
      const onlineUsers = Object.keys(userSocketMap).map((userId) => ({
        userId,
        email: userSocketMap[userId].email
      }));
      set({ onlineUsers });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  }
}));
