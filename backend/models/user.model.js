import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures that the email is unique
      match: /.+\@.+\..+/, // Basic email format validation
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'Other'], // Enum for gender
      required: true,
    },
    phone: {
      type: String,
      maxlength: 15, // Limits the phone number length
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the User model
const User = mongoose.model('Users', userSchema);

export default User; // Use ES6 export