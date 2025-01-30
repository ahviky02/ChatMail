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
      console.error('Fetch users error:', error);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (sender, receiver) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.put('/chat/getMessages', { sender, receiver });
      if (res.data.length === 0) {
        toast.error('No messages found between the specified users');
      } else {
        set({ messages: res.data });
      }
    } catch (error) {
      toast.error('Failed to fetch messages');
      console.error('Fetch messages error:', error);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  addNewUser: async (data) => {
    set((state) => ({ users: [...state.users, data] }));
  }
}));
