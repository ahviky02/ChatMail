import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the cors package
import authRoutes from './routes/auth.routes.js';
import chatRoutes from './routes/chat.routes.js';
import mailRoutes from './routes/mail.routes.js'
import connectToMongoDB from './lib/db.js';
import cookieParser from 'cookie-parser';
import {app,server} from './lib/socket.js';


dotenv.config();

app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
})); // Enable CORS for all routes

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/mail", mailRoutes);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});