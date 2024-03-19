import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, require: true },
  mobileNo: { type: Number, require: true },
  email: { type: String, unique: true },
  password: { type: String, require: true },
});

export const UserModel = mongoose.model("User", userSchema);
