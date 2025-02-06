import Mail from '../models/mail.model.js';
import User from '../models/user.model.js';

export const getMailUsers = async (req, res) => {
  const { search } = req.query;
  try {
    let users;
    if (search) {
      users = await User.find({
        $or: [
          { name: { $regex: search, $options: 'i' } }, // Search by name (case insensitive)
          { email: { $regex: search, $options: 'i' } }  // Search by email (case insensitive)
        ]
      });
    } else {
      users = await User.find({});
    }
    res.status(200).json(users);
  } catch (error) {
    console.error('Get mail users error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getSendMails = async (req, res) => { // Renamed for consistency
  try {
    const mails = await Mail.find({ from: req.query.from });
    res.status(200).json(mails);
  } catch (err) {
    console.error('Get sent mails error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getReceiveMails = async (req, res) => {
  try {
    const mails = await Mail.find({ to: req.user.email }); // Ensure req.user is correctly populated
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
    const sender = await User.findOne({ email: from });
    const recipient = await User.findOne({ email: to });

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
