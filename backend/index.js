import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the cors package
import authRoutes from './routes/auth.routes.js';
import chatRoutes from './routes/chat.routes.js';
import mailRoutes from './routes/mail.routes.js'
import connectToMongoDB from './lib/db.js';
import cookieParser from 'cookie-parser';
import {app,server} from './lib/socket.js';
import fs from 'fs';
import multer from 'multer';

import path from 'path';


dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
})); // Enable CORS for all routes

app.use(express.urlencoded({ extended: true }));
app.use(express.json());




// // Route for handling file uploads
// app.put('/api/auth/update', upload.single('image'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   // Here you can handle the file and user ID as needed
//   const userId = req.body.id; // Assuming the user ID is sent in the request body
//   const filePath = req.file.path; // Path to the uploaded file

//   // You can now update the user's profile in your database with the file path
//   // For example:
//   // User.update({ _id: userId }, { profilePic: filePath })
//   //   .then(() => res.status(200).send('Profile updated successfully.'))
//   //   .catch(err => res.status(500).send('Error updating profile.'));

//   res.status(200).send({
//     message: 'Profile updated successfully.',
//     filePath: filePath,
//   });
// });


app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/mail", mailRoutes);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));
  });
}

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});