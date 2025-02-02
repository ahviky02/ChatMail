export const useMailStore = create((set, get) => ({
     mail: get(() => []),
     addMail: (mail) => set((state) => [...state.mail, mail]),
     removeMail: (mail) => set((state) => state.mail.filter((m) =>
          m !== mail)),
}));
