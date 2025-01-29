import User from '../models/user.model.js';
import Message from '../models/chat.model.js';

export const getChatUsers = async (req, res) => {
  try {
    // Fetch all users from the User model
    const users = await User.find();

    // Respond with the list of users in JSON format
    res.status(200).json(users);

    // Log the users in the console
  } catch (error) {
    // Log and respond with an error message in case of failure
    console.error('Get chat users error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getChatMessages = async (req, res) => {
  const {sender,receiver} = req.body;
  try {
    // Fetch all messages from the Message model
    const messages = await Message.findone({senderId:sender,receiverId:receiver});

    // Respond with the list of messages in JSON format
    res.status(200).json(messages);

    // Log the messages in the console
  } catch (error) {
    // Log and respond with an error message in case of failure
    console.error('Get chat messages error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



