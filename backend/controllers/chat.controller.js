import User from '../models/user.model.js';
import Message from '../models/chat.model.js';

export const getChatUsers = async (req, res) => {
  try {
    // Fetch all users from the User model
    const users = await User.find();

    // Respond with the list of users in JSON format
    res.status(200).json(users);

  } catch (error) {
    // Log and respond with an error message in case of failure
    console.error('Get chat users error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getChatMessages = async (req, res) => {
  const { sender, receiver } = req.body;
  try {
    // Fetch messages from the Message model
    const messages = await Message.find({ senderId: sender, receiverId: receiver });

    if (messages.length === 0) {
      // If no messages are found, respond with a specific message
      return res.status(404).json({ message: 'No messages found between the specified users' });
    }

    // Respond with the list of messages in JSON format
    res.status(200).json(messages);

    // Log the messages in the console
    console.log('Chat messages:', messages);
  } catch (error) {
    // Log and respond with an error message in case of failure
    console.error('Get chat messages error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


