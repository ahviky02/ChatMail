import Mail from '../models/mail.model.js';
import User from '../models/user.model.js';

export const getMailUsers = async (req, res) => {
  const { search } = req.query;
  if (search) {
    try {
      const users = await User.find({
        $or: [
          { name: { $regex: search, $options: 'i' } }, // Search by name (case insensitive)
          { email: { $regex: search, $options: 'i' } }  // Search by email (case insensitive)
        ]
      });
      res.status(200).json(users);
    } catch (error) {
      console.error('Get mail users error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      console.error('Get mail users error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const getSendMails = async (req, res) => {
  try {
    const mails = await Mail.find({ from: req.user.email });
    res.status(200).json(mails);
  } catch (err) {
    console.error('Get send mails error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getReceiveMails = async (req, res) => {
  try {
    const mails = await Mail.find({ to: req.user.email });
    res.status(200).json(mails);
  } catch (err) {
    console.error('Get receive mails error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const compose = async (req, res) => {
  try {
    const { from, to, subject, mailContent } = req.body;

    // Find the sender and recipient user documents by their email addresses
    const sender = await User.find({ email: from });
    const recipient = await User.find({ email: to });

    if (!sender || !recipient) {
      return res.status(400).json({ message: 'Sender or recipient not found' });
    }

    const newMail = new Mail({
      from,
      to,
      subject,
      mailContent
    });

    await newMail.save();
    res.status(201).json({ message: "Mail composed successfully!" });
  } catch (err) {
    console.error('Compose mail error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
