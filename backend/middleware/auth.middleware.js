import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoutes = async (req, res, next) => {
  try {
    console.log('Checking if user is authenticated...');

    // Ensure you have cookie-parser middleware set up in your Express app
    const token = req.cookies.jwt; // Correctly accessing the JWT from cookies

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If token verification fails, it will throw an error
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Not authorized, user not found' });
    }

    // Attach the user to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Not authorized, token expired' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};