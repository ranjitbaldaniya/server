import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  dateOfBirth: { type: Date, require: true },
  gender: { type: String, require: true },
  address1: { type: String, require: true },
  address2: { type: String, require: true },
  country: { type: String, require: true },
  state: { type: String, require: true },
  mobileNo: { type: Number, require: true },
  email: { type: String, unique: true },
  password: { type: String, require: true },
});

export const UserModel = mongoose.model("User", userSchema);
