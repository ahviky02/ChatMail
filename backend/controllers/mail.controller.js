import Mail from '../models/mail.model.js';
import User from '../models/user.model.js';

export const getMailUsers = async (req, res) => {
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

export const getSendMails = async (req, res) => {
     try {
          const mails = await Mail.find({ from: req.user.email });
          res.status(200).json(mails);
     }
     catch (err) {
          console.error('Get send mails error:', err);
          res.status(500).json({ message: 'Internal server error' });
     }
};

export const getReceiveMails = async (req, res) => {
     try {
          const mails = await Mail.find({ to: req.user.email });
          res.status(200).json(mails);
     }
     catch (err) {
          console.error('Get receive mails error:', err);
          res.status(500).json({ message: 'Internal server error' });
     }
};

export const composeMails = async (req, res) => {
     const { from, to, mailContent, subject } = req.body;
     try {
          const mail = await Mail.create(req.body);
          res.status(200).json(mail);
     }
     catch (err) {

          console.error('Compose mail error:', err);
          res.status(500).json({ message: 'Internal server error' });
     }
};