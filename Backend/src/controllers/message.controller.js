import User from "../models/User.js";
import Message from "../models/Message.js";
import cloudinary from "../lib/cloudinary.js";


export const getAllContacts = async (req, res) => {
  try {
    // Logic to get all contacts
    const loggedInUserId = req.user._id; // Assuming user ID is available in req.user

    const filterdUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json({ users: filterdUsers });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages Controller :", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if(!text && !image){
      return res.status(400).json({error: "Message text or image is required"});
    }
    if(senderId.equals(receiverId)) {
      return res.status(400).json({error: "You cannot send message to yourself"});
    }
    const receiverExists = await User.findById(receiverId);
    if(!receiverExists){
      return res.status(404).json({error: "Receiver not found"});
    }

    let imageUrl;
    if (image) {
      // upload base64 img to cloudinary...
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    // save it to database
    await newMessage.save();

    // Todo: send the message to the other user using socket.io
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage Controller :", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Find all unique user IDs that the logged-in user has chatted with
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];
    // why using set here 👆🏻? to remove duplicate userIds

    const chatPartners = await User.find({
      _id: { $in: chatPartnerIds },
    }).select("-password");
    res.status(200).json(chatPartners);
  } catch (error) {
    console.error("Error in getChatPartners: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
