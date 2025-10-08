import jwt from "jsonwebtoken";
import { ENV } from "./env.js";


export const generateToken = (user,res) => {
   const JWT_SECRET = ENV.JWT_SECRET;
   // console.log("JWT_SECRET:", process.env.JWT_SECRET);

   if(!JWT_SECRET) throw new Error("JWT_SECRET is not set");
   // create a token 
   const token = jwt.sign({ userId : user._id }, JWT_SECRET, {
      expiresIn: '7d',
   });

   res.cookie('jwt', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production' ? true : false, // use secure cookies in production
      sameSite: 'strict',  
      // sameSite: 'none'
   })
   return token;
}