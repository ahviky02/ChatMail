import Mail from '../models/mail.model.js';
import User from '../models/user.model.js';
import { getMailSocketId, io } from '../lib/socket.js';

export const getMailUsers = async (req, res) => {
  const { id } = req.query;
  try {
    const users = await User.find({ _id: { $ne: id } });
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
    const mails = await Mail.find({ to: req.query.to });
    res.status(200).json(mails);
  } catch (err) {
    console.error('Get receive mails error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const setMailStatus = async (req, res) => {
  try {
    const { id } = req.body;
    const mail = await Mail.findByIdAndUpdate(id, { mailStatus: 'read'});
    res.status(200).json(mail);
  } catch (err) {
    console.error('Set mail status error:', err);
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
      mailContent,
    });

    await newMail.save();
    res.status(201).json({ message: 'Mail composed successfully!' });

    const mailSocketId = getMailSocketId(recipient._id); // Corrected variable name to follow camelCase
    if (mailSocketId) {
      io.to(mailSocketId).emit('newMail', newMail);
    }

  } catch (err) {
    console.error('Compose mail error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
