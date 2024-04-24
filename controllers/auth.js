import HttpError from "../helpers/HttpError.js";
import { User } from "../models/userModel.js";
import sendEmail from "../helpers/sendEmail.js";

import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import path from "path";
import { promises as fs } from "fs";
import Jimp from "jimp";
import { nanoid } from "nanoid";

dotenv.config();
const secretKey = process.env.SECRET_KEY;
const baseUrl = process.env.BASE_URL;

const avatarsDir = path.join(process.cwd(), "public", "avatars");

export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) throw HttpError(409, "Email in use");

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${baseUrl}/api/users/verify/${verificationToken}">Click to verify your email</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
      user: {
        email: newUser.email,
        subscribtion: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) throw HttpError(404, "Not found");

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.status(200).json({ message: "Verification successfull" });
  } catch (error) {
    next(error);
  }
};

export const resendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) throw HttpError(401, "Not found");
    if (user.verify)
      throw HttpError(400, "Verification has already been passed");

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${baseUrl}/api/users/verify/${user.verificationToken}">Click to verify your email</a>`,
    };
    await sendEmail(verifyEmail);

    res.status(200).json({
      message: "Verification email sent",
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

    if (!user.verify) throw HttpError(401, "Email is not verified");

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) throw HttpError(401, "Email or password is wrong");

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: "12h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      token,
      user: { email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

export const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

export const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    if (!req.file) throw HttpError(400, "No file uploaded");

    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    await fs.rename(tempUpload, resultUpload);

    const image = await Jimp.read(resultUpload);
    await image.resize(250, 250).write(resultUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};
