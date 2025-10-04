import User from "../models/User.js";
import Message from "../models/Message.js";

export const getAllContacts = async (req, res) => {
   try {
       // Logic to get all contacts
       const loggedInUserId = req.user._id; // Assuming user ID is available in req.user
      
       const filterdUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');
       res.status(200).json({ users: filterdUsers });
   } catch (error) {
       console.error("Error fetching contacts:", error);
       res.status(500).json({ message: "Server error" });
   }
      
   }