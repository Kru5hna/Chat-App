import mongoose from "mongoose";

// schema design
const userSchema = new mongoose.Schema({
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   fullname: { type: String, required: true },
   profilePicture: { type: String, default: "" },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;

