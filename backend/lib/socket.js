import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
  },
});

const userSocketMap = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  const userId = socket.handshake.query.userId;
  const email = socket.handshake.query.email;

  if (userId) {
    userSocketMap[userId] = { socketId: socket.id, email };
    io.emit('getOnlineUsers', userSocketMap);
  } else {
    console.warn('No userId provided in handshake query');
  }

  // Handle video call initiation
  socket.on('callUser ', ({ callerId, receiverId }) => {
    const receiver = userSocketMap[receiverId];
    if (receiver) {
      socket.to(receiver.socketId).emit('callIncoming', { callerId });
    } else {
      socket.emit('userNotAvailable', { receiverId });
    }
  });

  // Handle call acceptance
  socket.on('acceptCall', ({ callerId, receiverId }) => {
    const caller = userSocketMap[callerId];
    if (caller) {
      socket.to(caller.socketId).emit('callAccepted', { receiverId });
    } else {
      socket.emit('userNotAvailable', { callerId });
    }
  });

  // Handle ICE candidates
  socket.on('sendCandidate', ({ candidate, receiverId }) => {
    const receiver = userSocketMap[receiverId];
    if (receiver) {
      socket.to(receiver.socketId).emit('receiveCandidate', { candidate });
    }
  });

  // Handle call rejection
  socket.on('rejectCall', ({ callerId }) => {
    const caller = userSocketMap[callerId];
    if (caller) {
      socket.to(caller.socketId).emit('callRejected');
    } else {
      socket.emit('userNotAvailable', { callerId });
    }
  });

  socket.on('disconnect', () => {
    console.log('User  disconnected:', socket.id);
    const userId = Object.keys(userSocketMap).find(
      (key) => userSocketMap[key].socketId === socket.id
    );
    if (userId) {
      delete userSocketMap[userId];
      io.emit('getOnlineUsers', userSocketMap);
    }
  });
});

export { io, app, server };

export function getReceiverSocketId(receiverId) {
  return userSocketMap[receiverId]?.socketId;
}

export function getMailSocketId(receiverId) {
  return userSocketMap[receiverId]?.socketId;
}