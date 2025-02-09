import mongoose from "mongoose";

const mailSchema = mongoose.Schema({
  to: {
    type: String,
    ref: "User",
    required: true
  },
  from: {
    type: String,
    ref: "User",
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  mailContent: {
    type: String,
    required: true
  },
  mailStatus: {
    type: String,
    enum: ["sent", "read", "deleted"],
    default: "sent"
  },
  mailDate: {
    type: Date,
    default: Date.now
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create the Mail model
const Mail = mongoose.model('Mail', mailSchema);

export default Mail; // Use ES6 export
