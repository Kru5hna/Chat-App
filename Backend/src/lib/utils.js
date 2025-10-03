import jwt from "jsonwebtoken";

export const generateToken = (user) => {
   // create a token 
   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
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