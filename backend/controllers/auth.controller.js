import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token and set cookie
    generateTokenAndSetCookie(user._id, res);

    // Successful login response
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
  // Clear the cookie or invalidate the session
  try{
    res.cookie("jwt","",{maxAge:0});// Adjust the cookie name as necessary
    res.clearCookie("jwt");
    res.status(200).json({ message: "User  logged out successfully" });
  }
  catch{
    res.status(500).json({ message: "Internal server error" });
  }
 
};

export const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, dob, gender, phone, password, profilePic } = req.body;

    // Check if the user already exists
    let existingUser  = await User.findOne({ email: "ahvi@gmail.com"  }); // Use findOne instead of findAll
    console.log(existingUser);
    if (existingUser ) {
      return res.status(400).json({ message: "User  already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser  = new User({
      name,
      email,
      dob,
      gender,
      phone,
      password: hashedPassword,
      profilePic,
    });

    // Save the user to the database
    await newUser .save();
    generateTokenAndSetCookie(newUser ._id, res);
    
    res.status(201).json({ message: "User  created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    // Check if profilePic is not provided
    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    // Upload the profile picture to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    
    // Update the user's profile picture in the database
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    // Respond with the updated user information
    res.status(200).json(updateUser);
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = async (req, res) => {
  try{
    res.status(200).json(req.user);
  }catch (error) {
    console.log("error in checkAuth", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}