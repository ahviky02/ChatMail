import { create } from 'zustand';
import { axiosInstance } from "../lib/axios";

export const useMailStore = create((set,get) => ({
  sentContents: [],
  inboxContents: [],
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
      const  data  = await axiosInstance.get(`/mail/users?id=${id}`);
      console.log(data);
    } catch (er) {
      set({ isMailError: true });
    } finally {
      set({ isMailLoading: false });
    }
  },

  getSentList: async (from) => {
    set({ isContentLoading: true });
    try {
      const { data } = await axiosInstance.get(`/mail/sent?from=${from}`);
      set({ sentList: data });
      // console.log("Sent Mails:", get().sentList);
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
      set({ sentContents: response.data });
    } catch (error) {
      console.error('Failed to compose mail:', error);
    } finally {
      set({ isComposeLoading: false });
    }
  },

  subscribeToMail: (socket) => {
    socket.on('mail', (mail) => {
      set({ inboxContents: mail });
    });
  }


}));