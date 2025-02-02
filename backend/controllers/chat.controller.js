import User from '../models/user.model.js';
import Message from '../models/chat.model.js';
import { getReceiverSocketId } from '../lib/socket.js';
import { io } from '../lib/socket.js'; // Ensure you import io if you're using it

export const getChatUsers = async (req, res) => {
  const { search } = req.query; // Get the search query from the request
  if (search) {

    try {
      // Fetch users based on the search query
      const users = await User.find({
        $or: [
          { name: { $regex: search, $options: 'i' } }, // Search by name (case insensitive)
          { email: { $regex: search, $options: 'i' } }  // Search by email (case insensitive)
        ]
      });

      // Respond with the list of users in JSON format
      res.status(200).json(users);
    } catch (error) {
      // Log and respond with an error message in case of failure
      console.error('Get chat users error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      console.error('Get chat users error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const getChatMessages = async (req, res) => {
  const { sender, receiver } = req.body;
  try {
    // Fetch messages from the Message model
    const messages = await Message.find({
      $or: [
        { senderId: sender, receiverId: receiver },
        { senderId: receiver, receiverId: sender }
      ]
    });

    if (messages.length === 0) {
      // If no messages are found, respond with a specific message
      return res.status(404).json({ message: 'No messages found between the specified users' });
    }

    // Respond with the list of messages in JSON format
    res.status(200).json(messages);
    console.log('Chat messages:', messages);
  } catch (error) {
    // Log and respond with an error message in case of failure
    console.error('Get chat messages error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const sentMessage = async (req, res) => {
  const { sender, receiver, message } = req.body;
  try {
    // Create a new message instance
    const newMessage = new Message({ senderId: sender, receiverId: receiver, text: message });

    // Save the new message to the database
    await newMessage.save();
    console.log('Message sent:', newMessage);

    const receiverSocketId = getReceiverSocketId(receiver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    // Respond with a success message
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    // Log and respond with an error message in case of failure
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};