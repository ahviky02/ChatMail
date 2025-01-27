import User from "../models/user.model.js";

export const getChatUsers = async (req, res) => {
     console.log("Get chat users");
  try {
    const users = await User.find({ _id: { $ne: req.user._id } });
    res.status(200).json(users);
    console.log("Get chat users success");
  } catch (error) {
    console.error("Get chat users error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};