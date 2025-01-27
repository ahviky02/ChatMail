import User from '../models/user.model.js';

export const getChatUsers = async (req, res) => {
  try {
    // Fetch all users from the User model
    const users = await User.findAll;
    // Respond with the list of users in JSON format
    res.status(200).json(users);
    // Log the users in the console
    console.log(JSON.stringify(users));
  } catch (error) {
    // Log and respond with an error message in case of failure
    console.error('Get chat users error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};