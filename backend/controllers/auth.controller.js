import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
import multer from "multer";


const storage = multer.memoryStorage();
const upload = multer({ storage });


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({ 
      message: "Login successful", 
      user: { id: user._id, name: user.name, email: user.email } 
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const signup = [
  upload.single('image'),
  async (req, res) => {
    try {
      const { name, email, dob, gender, phone, password } = req.body;
      const profilePic = req.file;

      if (!name || !email || !dob || !gender || !phone || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        name,
        email,
        dob,
        gender,
        phone,
        password: hashedPassword,
      });

      if (profilePic) {
        const uploadResponse = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream((error, result) => {
            if (error) {
              console.error("Upload failed:", error);
              reject(error); // Reject the promise on error
            } else {
              resolve(result); // Resolve with the result
            }
          }).end(profilePic.buffer);
        });
        newUser.profilePic = uploadResponse.secure_url; // Save the secure URL to the user object
      }

      await newUser.save();
      generateTokenAndSetCookie(newUser._id, res);
      
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
];



export const updateProfile = [
  upload.single('image'),
  async (req, res) => {
    try {
      const profilePic = req.file;
      const userId = req.user._id;

      if (!profilePic) {
        return res.status(400).json({ message: "Profile picture is required" });
      }

      const uploadResponse = await cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return res.status(500).json({ message: "Internal server error" });
          }

          User.findByIdAndUpdate(
            userId,
            { profilePic: result.secure_url },
            { new: true }
          )
            .then(updatedUser => res.status(200).json(updatedUser))
            .catch(error => {
              console.error("Update profile error:", error);
              res.status(500).json({ message: "Internal server error" });
            });
        }
      );

      uploadResponse.end(profilePic.buffer);
    } catch (error) {
      console.error("Update profile error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
];



export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};