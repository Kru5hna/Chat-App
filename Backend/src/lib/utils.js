import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (user,res) => {
   const JWT_SECRET = process.env;
   if(!JWT_SECRET) throw new Error("JWT_SECRET is not set");
   // create a token 
   const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: '7d',
   });

   res.cookie('jwt', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false, // use secure cookies in production
      sameSite: 'strict',  
   })
   return token;
}