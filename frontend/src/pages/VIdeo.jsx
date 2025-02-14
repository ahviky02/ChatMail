import React, { useEffect, useRef } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useCallStore } from '../store/useCallStore';

const VideoCall = () => {
    const { authUser  } = useAuthStore.getState();
    const { inCommingCaller } = useCallStore.getState();
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const configuration = {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] // STUN server for NAT traversal
    };

    useEffect(() => {
        const startVideoCall = async () => {
            // Get local media stream
            const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localVideoRef.current.srcObject = localStream;

            // Create a new RTCPeerConnection
            peerConnectionRef.current = new RTCPeerConnection(configuration);

            // Add local stream tracks to the peer connection
            localStream.getTracks().forEach(track => {
                peerConnectionRef.current.addTrack(track, localStream);
            });

            // Handle remote stream
            peerConnectionRef.current.ontrack = (event) => {
                const [remoteStream] = event.streams;
                remoteVideoRef.current.srcObject = remoteStream;
            };

            // Handle ICE candidates
            peerConnectionRef.current.onicecandidate = (event) => {
                if (event.candidate) {
                    const { socket } = useAuthStore.getState();
                    socket.emit('sendCandidate', { candidate: event.candidate, receiverId: inCommingCaller.callerId });
                }
            };

            // Create an offer and set local description
            const offer = await peerConnectionRef.current.createOffer();
            await peerConnectionRef.current.setLocalDescription(offer);

            // Send the offer to the other peer
            const { socket } = useAuthStore.getState();
            socket.emit('callUser ', { offer, receiverId: inCommingCaller.callerId });
        };

        startVideoCall();

        // Cleanup function
        return () => {
            if (peerConnectionRef.current) {
                peerConnectionRef.current.close();
            }
        };
    }, [inCommingCaller]);

    return (
        <div className="video-call-container">
            <h2>Video Call</h2>
            <div className="video-container">
                <video ref={localVideoRef} autoPlay muted style={{ width: '300px', height: '300px' }} />
                <video ref={remoteVideoRef} autoPlay style={{ width: '300px', height: '300px' }} />
            </div>
        </div>
    );
};

export default VideoCall;