import { UserModel } from "../models/userModel.js";
import bcriptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    const { email, password } = req.body.data;

    // console.log("body", req.body);

    //checking that email is alredy exist
    const user = await UserModel.findOne({ email });
    console.log("user", user);

    if (user) {
      // User already exists, send an error response
      return res
        .status(400)
        .json({ error: "User already exists with same email" });
    }

    //hasing password
    const salt = await bcriptjs.genSalt(10);
    const hashedPassword = await bcriptjs.hash(password, salt);

    req.body.data.password = hashedPassword;

    // console.log("hash body", req.body);

    const createUser = new UserModel(req.body.data);
    const savedUser = await createUser.save();
    // console.log("savedUser", savedUser);

    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.log("error while registration", error);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body.data;

    //checking that email is alredy exist or not
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    //checking password
    const validPassword = await bcriptjs.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    //create token data
    const tokenData = {
      id: user._id,
      username: user.firstname,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, "12345", { expiresIn: "1d" });

    // console.log("token", token);

    res.cookie("access_token", token);
    res.status(200).json({ token, userId: user?._id });
  } catch (error) {
    console.log("error while login", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
