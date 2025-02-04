import { create } from 'zustand';
import { axiosInstance } from "../lib/axios";

export const useMailStore = create((set, get) => ({
  Contents: [],
  mailsUsers: [],
  selectedMailUser: null, // Fixed: Changed 'selected:User' to 'selectedMailUser'
  isMailLoading: false, // Fixed: Changed 'isUser Loading' to 'isMailLoading'
  isContentLoading: false,
  isComposeLoading:false,
  isMailError: false,

  searchMail: async (search) => {
    set({ isMailLoading: true });
    try {
      const response = await axiosInstance.get(`/mail/users?search=${search}`);
      set({ mailsUsers: response.data });
    } catch (error) {
      set({ isMailError: true });
      console.error('Failed to fetch mail users:', error);
    } finally {
      set({ isMailLoading: false });
    }
  },

  getMailUsers: async () => {
    set({ isMailLoading: true });
    try {
      const response = await axiosInstance.get('/mail/users');
      set({ mailsUsers: response.data });
    } catch (error) {
      set({ isMailError: true });
      console.error('Failed to fetch mail users:', error);
    } finally {
      set({ isMailLoading: false });
    }
  },

  composeMail: async (mail) => {
    console.log(mail);
    set({ isComposeLoading: true });
    try {
      const response = await axiosInstance.post('/mail/compose', mail);
      set({ Contents: response.data });
    } catch (error) {
      console.error('Failed to compose mail:', error);
    } finally {
      set({ isComposeLoading: false });
    }
  }
}));
