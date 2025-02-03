import mongoose from "mongoose";

const mailSchema = mongoose.Schema({

     to: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
     },
     from: {
          type: mongoose.Schema.Types.ObjectId,
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

},
     {
          timestamps: true, // Automatically manage createdAt and updatedAt fields
     }

);

// Create the User model
const Mail = mongoose.model('Mails', mailSchema);

export default Mail; // Use ES6 export



