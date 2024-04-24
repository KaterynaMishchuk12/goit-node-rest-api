import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "katerynammm@meta.ua",
    pass: process.env.PASSWORD_TO_META,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async (data) => {
  const email = { ...data, from: "katerynammm@meta.ua" };
  await transporter.sendMail(email);
  return true;
};

export default sendEmail;
