import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import User from "../models/User.js";

export const protectRoute = async (req,res, next) => {
  try {
    const token = req.cookies.jwt;
    
    if(!token) return res.status(401).json({msg: "Not authorized, no token"});
    
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if(!decoded) return res.status(401).json({msg: "Not authorized, token failed"});
 
    const user = await User.findById(decoded.userId).select("-password");
    if(!user) return res.status(401).json({msg: "Not authorized, user not found"});
 
    req.user = user;
    next();
  } catch (error) {
   console.log('Auth Middleware Error:', error);
   res.status(500).json({msg: "Not authorized, token failed"});
   
  }

}