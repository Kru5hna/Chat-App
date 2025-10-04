import { sendWelcomeEmail } from "../email/emailHandlers.js";
import { ENV } from "../lib/env.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt, { hash } from "bcryptjs";


export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
   console.log('here');
   
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // check if emailis valid: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

      // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    
    // Generate token & set cookie
    if(newUser){

      //  await newUser.save();
      //  const token = generateToken(newUser, res);

       // some new suggestions in the code
       const savedUser = await newUser.save();
       const token = generateToken(savedUser._id, res); 
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
        token,
      });

      // send welcome email
      try {
         await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
      } catch (error) {
         
      }
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }

  } catch (error) {
    console.error("Signup Error : ", error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({email});

    if(!user) return res.status(400).json({msg: "Invalid credentials"});

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch) return res.status(400).json({msg: "Invalid credentials"});

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePicture: user.profilePicture,
    })
  } catch (error) {
    console.log('Login Error:', error);
    res.status(500).json({msg: "Internal Server Error"});
    
  }

};

export const logout = (_, res) => {

  res.cookie('jwt', '', {maxAge: 0});
  res.status(200).json({msg: "Logged out successfully"});

};
