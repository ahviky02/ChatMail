import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get('/chat/users');
      set({ users: res.data });
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.post('/chat/messages');
      set({ messages: res.data });
    } catch (error) {
      toast.error('Failed to fetch messages');
    } finally {
      set({ isMessageLoading: false });
    }
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  newUsers: async (data) => {
    set((state) => ({ users: [...state.users, data] }));
  }
}));
