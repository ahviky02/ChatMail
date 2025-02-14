// src/components/Calling.jsx
import { Phone } from 'lucide-react';
import { useCallStore } from '../store/useCallStore';
import { useAuthStore } from '../store/useAuthStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Calling = () => {
    const { outGoingCall, inCommingCall, resetCall, inCommingCaller } = useCallStore();
    const { authUser  } = useAuthStore.getState();
    const navigate = useNavigate();

    useEffect(() => {
        if (authUser ) {
            const unsubscribe = inCommingCall(); // Start listening for incoming calls
            return () => unsubscribe(); // Cleanup on unmount
        }
    }, [authUser ]);

    const callAccept = () => {
        console.log("Call Accepted");
        if (inCommingCaller) {
            const { callerId } = inCommingCaller;
            const { socket } = useAuthStore.getState();
            socket.emit('acceptCall', { callerId, receiverId: authUser ._id });
            resetCall(); // Reset call state after accepting
            navigate('/video-call'); // Navigate to the video call screen
        }
    };

    const callReject = () => {
        console.log("Call Rejected");
        if (inCommingCaller) {
            const { callerId } = inCommingCaller;
            const { socket } = useAuthStore.getState();
            socket.emit('rejectCall', { callerId, receiverId: authUser ._id });
            resetCall(); // Reset call state after rejecting
        }
    };

    const calling = () => {
        console.log("Currently Calling");
        outGoingCall(authUser ._id, "67aa6ddb0f29719fc745ac02"); // Replace with actual receiver ID
        navigate('/video-call'); // Navigate to the video call screen
    };

    return (
        <div className="container bg-primary justify-center items-center flex h-screen">
            <div className='row flex justify-center items-center space-x-4'>
                <button 
                    className='rounded bg-green-500 p-4 flex items-center space-x-2' 
                    onClick={callAccept} 
                    disabled={!inCommingCaller}
                >
                    <Phone size={24} />
                    <span className="text-white font-semibold">Accept Call</span>
                </button>
                <button 
                    className='rounded bg-red-500 p-4 flex items-center space-x-2' 
                    onClick={callReject} 
                    disabled={!inCommingCaller}
                >
                    <Phone size={24} />
                    <span className="text-white font-semibold">Reject Call</span>
                </button>
                <button 
                    className='rounded bg-blue-500 p -4 flex items-center space-x-2' 
                    onClick={calling}
                >
                    <Phone size={24} />
                    <span className="text-white font-semibold">In Call</span>
                </button>
            </div>
        </div>
    );
};

export default Calling;