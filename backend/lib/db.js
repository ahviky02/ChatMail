 import mongoose from 'mongoose';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 2000, // Timeout after 20 seconds
    });
    console.log('Database Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectToMongoDB;

