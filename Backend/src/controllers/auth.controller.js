import User from "../models/User.js";

export const signup = async  (req,res) => {

  const {fullname, email, password} = req.body;

  try {
   if (!fullname || !email || !password) {
      return res.status(400).json({message: 'All fields are required'});

   }
   // valid email or not
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
   if(!emailRegex.test(email)) {
      return res.status(400).json({message: 'Please enter a valid email'});
   }

   // Check if user already exists
   const user = await User.find({email});
   if(user) {
      return res.status(400).json({message: 'User already exists'});
   }
   // Hash password
   // Save user to DB
   // Send verification email

   if(password.length < 6) {
      return res.status(400).json({message: 'Password must be at least 6 characters'});
   }
  } catch (error) {
   
  }

  res.send('Signup Endpoint');
}

export const login = async (req,res) => {
   const {email, password} = req.body;
   res.send('Login endpoint');
}

export const logout = async (req,res) => {

   res.send('Logout endpoint');
}