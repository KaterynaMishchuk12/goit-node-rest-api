import { User } from "../models/userModel.js";
// import HttpError from "../helpers/HttpError.js";

export const registerUser = async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    email: newUser.email,
  });
};
