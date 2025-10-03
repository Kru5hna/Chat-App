import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt, { hash } from "bcryptjs";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // valid email or not
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    // Check if user already exists
    const user = await User.find({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash password

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      fullname,
      password: hashPass,
    });

    // Save user to DB
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json(
        {
          _id: newUser._id,
          email: newUser.email,
          fullname: newUser.fullname,
          email: newUser.email,
          profilePicture: newUser.profilePicture,
        },
        { msg: "User created successfully", user: newUser }
      );
    } else {
      res.status(400).json({ msg: "Invalid User Data" });
    }
    // Send verification email

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
  } catch (error) {
      console.error("Signup Error : ", error);
      res.status(500).json({ message: "Server Error" });
  }

  res.send("Signup Endpoint");
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  res.send("Login endpoint");
};

export const logout = async (req, res) => {
  res.send("Logout endpoint");
};
