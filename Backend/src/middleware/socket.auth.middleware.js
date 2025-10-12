import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import User from "../models/User.js";


export const socketAuthMiddleware = async (socket, next) => {
  try {
    // token kashe extract karshil from http-only cookies

    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

      // if not 
      if(!token) {
         console.log('Socket connection rejected: NO Token Provided');
         return next(new Error("Unauthorized - No token provided"));
         
      }

      // if yes then verify

      const decoded = jwt.verify(token, ENV.JWT_SECRET);
      if(!decoded) {
        console.log('Socket connection rejected: Invalid token');
        return next(new Error("Unauthorised - Invalid Token"));
        
      }

      // find user and check
      const user = await User.findById(decoded.userId).select(-password);

      if(!user) {
        console.log('Socket connection rejected:  User not found');
        return next(new Error("User not found"));

        
      }
      // todo: user info attach 
      socket.user = user;
      socket.userId = user._id.toString();

      console.log(`Socket Authenticated for user: ${user.fullName} (${user._id})`);
      

      next();
  } catch (error) {
    console.log('Error in Socket Authentication: ', error.message);
    next(new Error("Unauthorized - Authentication failed."))
  }
};
