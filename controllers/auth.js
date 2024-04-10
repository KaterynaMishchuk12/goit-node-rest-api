// authController.js
import HttpError from "../helpers/HttpError.js";
import { User } from "../models/userModel.js";

import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
const secretKey = process.env.SECRET_KEY;

export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) throw HttpError(409, "Email in use");

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw HttpError(400, "Invalid email or password");

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) throw HttpError(401, "Email or password is wrong");

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: "12h" });

    res.status(200).json({
      token,
      user: { email, subscription },
    });
  } catch (error) {
    next(error);
  }
};
