import { create } from 'zustand';
import { axiosInstance } from "../lib/axios";
import toast from 'react-hot-toast';
import { useAuthStore } from './useAuthStore';


export const useMailStore = create((set, get) => ({
  sentContents: [],
  inboxContents: [],
  ToUsers: [],
  sentList: [],
  inboxList: [],
  mailUsers: [],
  sentSelectMail: null,
  inboxSelectMail: null,
  isMailLoading: false,
  isContentLoading: false,
  isComposeLoading: false,
  isMailError: false,

  getMailUsers: async () => {
    set({ isMailLoading: true });
    try {
      const { data } = await axiosInstance.get(`/mail/users?id=${id}`);
      console.log(data);
      set({ mailUsers: data });
    } catch (er) {
      set({ isMailError: true });
    } finally {
      set({ isMailLoading: false });
    }
  },

  getToMails: async (to) => {
    try {
      const { data } = await axiosInstance.get(`/mail/usersTo?to=${to}`);
      set({ ToUsers: data });
    } catch (error) {
      console.error('Error fetching sent mails:', error);
    } finally {
    }
  },

  getSentList: async (from) => {
    set({ isContentLoading: true });
    try {
      const { data } = await axiosInstance.get(`/mail/sent?from=${from}`);
      set({ sentList: data });
    } catch (error) {
      console.error('Error fetching sent mails:', error);
      set({ isMailError: true });
    } finally {
      set({ isContentLoading: false });
    }
  },

  getInboxList: async (to) => {
    set({ isContentLoading: true });
    try {
      const { data } = await axiosInstance.get(`/mail/inbox?to=${to}`);
      set({ inboxList: data });
    } catch (error) {
      console.error('Error fetching inbox mails:', error);
      set({ isMailError: true });
    } finally {
      set({ isContentLoading: false });
    }
  },

  setSentSelectedMails: (mails) => {
    set({ sentSelectMail: mails });
  },

  unSetSentSelectedMails: () => {
    set({ sentSelectMail: null });
  },

  setInboxSelectedMails: (mails) => {
    set({ inboxSelectMail: mails });
  },

  unSetInboxSelectedMails: () => {
    set({ inboxSelectMail: null });
  },

  composeMail: async (mail) => {
    set({ isComposeLoading: true });
    try {
      const response = await axiosInstance.post('/mail/compose', mail);
      set((state) => ({
        sentContents: [...state.sentContents, response.data],
      }));
      toast.success('Mail sent successfully');
    } catch (error) {
      console.error('Failed to compose mail:', error);
      toast.error('Failed to compose mail');
    } finally {
      set({ isComposeLoading: false });
    }
  },

  subscribeToMail: () => {
    const socket = useAuthStore.getState().socket;
    socket.on('newMail', (newMail) => {
      set((state) => ({ inboxList: [...state.inboxList, newMail] }));
    });
  },

  setMailStatus: async (mail) => {
    const id = mail._id;
    const status = mail.mailStatus;
    try{
      const response = await axiosInstance.put('/mail/status', { id, status });
    }
    catch (error) {
      console.error('Failed to update mail status:', error);
    }
    // try {
    //   const response = await axiosInstance.post('/mail/status', mail);
    //   toast.success('Mail status updated successfully');
    // } catch (error) {
    //   console.error('Failed to update mail status:', error);
    //   toast.error('Failed to update mail status');
    // }
  },

  unsubscribeToMail: () => {
    const socket = useAuthStore.getState().socket;
    socket.off('newMail');
  }
}));
