import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { useAuthStore } from './useAuthStore';

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null, // Fixed: Changed 'selected:User' to 'selectedUser: null'
  isUserLoading: false, // Fixed: Changed 'isUser Loading' to 'isUserLoading'
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true }); // Fixed: Changed 'isUser Loading' to 'isUserLoading'
    try {
      const res = await axiosInstance.get('/chat/users');
      set({ users: res.data });
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error('Fetch users error:', error);
    } finally {
      set({ isUserLoading: false }); // Fixed: Changed 'isUser Loading' to 'isUserLoading'
    }
  },

  seachUsers: async (search) => {
    set({ isUserLoading: true }); // Fixed: Changed 'isUser Loading' to 'isUserLoading'
    try {
      const res = await axiosInstance.get(`/chat/users?search=${search}`);
      set({ users: res.data });
    } catch (error) {
      toast.error('Failed to search users');
      console.error('Search users error:', error);
    } finally {
      set({ isUserLoading: false }); // Fixed: Changed 'isUser Loading' to 'isUserLoading'
    }
  },

  getMessages: async (sender, receiver) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.post('/chat/getMessages', { sender, receiver });
      // console.log('res:', res);
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

  setSelectedUser: (user) => { // Fixed: Changed 'setSelected:User' to 'setSelectedUser'
    set({ selectedUser: user }); // Fixed: Changed 'selected:User' to 'selectedUser'
  },

  sendMessage: async (data) => {
    try {
      await axiosInstance.post('/chat/sentMessage', data);
      console.log('Message sent:', data.message);
      set((state) => ({
        messages: [...state.messages, { text: data.message, senderId: data.sender }]
      }));
      // Optionally, you can also update the messages state here if needed
    } catch (error) {
      toast.error('Failed to send message');
      console.error('Send message error:', error);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get(); // Fixed: Changed 'selectedUser ' to 'selectedUser'
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on('newMessage', (newMessage) => {
      set((state) => ({ messages: [...state.messages, newMessage] }));
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off('newMessage');
  },

  addNewUser: async (data) => { // Fixed: Changed 'addNew:User' to 'addNewUser'
    set((state) => ({ users: [...state.users, data] }));
  }
}));