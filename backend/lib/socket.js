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
const mailSocketMap = {};

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

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
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
