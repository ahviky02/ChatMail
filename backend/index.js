import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import chatRoutes from './routes/chat.routes.js';
import mailRoutes from './routes/mail.routes.js';
import connectToMongoDB from './lib/db.js';
import { app, server } from './lib/socket.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/mail", mailRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
