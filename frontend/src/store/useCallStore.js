import { create } from 'zustand';
import { useAuthStore } from './useAuthStore'; // Assuming you have an auth store

export const useCallStore = create((set) => ({
    inCommingCaller: null,
    outGoingCall: (callerId, receiverId) => {
        const { socket } = useAuthStore.getState();
        socket.emit('callUser ', { callerId, receiverId });
    },
    resetCall: () => set({ inCommingCaller: null }),
    inCommingCall: () => {
        const handleIncomingCall = (caller) => {
            set({ inCommingCaller: caller });
        };

        const { socket } = useAuthStore.getState();
        socket.on('callIncoming', handleIncomingCall);

        // Return a cleanup function to unsubscribe
        return () => {
            socket.off('callIncoming', handleIncomingCall);
        };
    },
}));