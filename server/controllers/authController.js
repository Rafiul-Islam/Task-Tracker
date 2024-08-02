import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import sendEmail from "../utils/send-email.js";
import getUrl from "../utils/get-url.js";

config();

export async function signup(req, res) {
  const body = req.body;
  if (!body.name.trim() || !body.email.trim() || !body.password.trim()) {
    return res
      .status(400)
      .send({ message: "Name, Email and password are required." });
  }

  try {
    const { name, email, password } = body;
    const user = await User.findOne({ email });
    if (user) return res.status(400).send({ message: "User already exists." });

    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const savedUser = await User.create({
      name,
      email,
      password: encryptedPassword,
    });

    return res.status(201).send(savedUser);
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong." });
  }
}

export async function login(req, res) {
  const body = req.body;

  if (!body.email.trim() || !body.password.trim())
    return res
      .status(400)
      .send({ message: "Email and password are required." });

  try {
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "Invalid User." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(404).send({ message: "Invalid User." });

    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).send({ token });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong." });
  }
}

export async function generateForgotPasswordURL(req, res) {
  try {
    const email = req.body.email;
    if (!email) return res.status(400).send({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: "User does not exist" });

    const JWT_SECRET_FOR_FORGOT_PASSWORD =
      process.env.JWT_SECRET_KEY + user.password;
    const payload = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, JWT_SECRET_FOR_FORGOT_PASSWORD, {
      expiresIn: "15m",
    });
    const RESET_PASSWORD_URL = `${getUrl(req)}/api/auth/reset-password/${
      user._id
    }/${token}`;

    const sendTo = user.email;
    const mailSubject = "Email For Send Reset Password URL.";
    const emailHTML = `
    <p>Here is your link for reset the password. Please click on the button and submit the form.</p>
    <a role="button" style="cursor: pointer" href=${RESET_PASSWORD_URL}>
      Reset Password
    </a>
  `;
    const isMailSent = await sendEmail(sendTo, mailSubject, "", emailHTML);

    return isMailSent
      ? res.status(200).send({ message: `A email has been sent to ${email}` })
      : res.status(400).send({ message: `Failed to send email to ${email}` });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export async function validateResetPasswordURL(req, res) {
  const { userId, token } = req.params;
  if (!userId || !token)
    return res.status(400).send({ message: "Invalid URL" });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User does not exist" });

    const JWT_SECRET_FOR_FORGOT_PASSWORD =
      process.env.JWT_SECRET_KEY + user.password;
    const decoded = jwt.verify(token, JWT_SECRET_FOR_FORGOT_PASSWORD);
    return res.status(200).send({ ...decoded, token });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export async function resetPassword(req, res) {
  const { password, confirmPassword } = req.body;
  const userId = req.params.userId;
  const token = req.headers["token"];
  if (!userId || !token)
    return res.status(400).send({ message: "Invalid request" });
  if (!password)
    return res.status(400).send({ message: "Password is required" });
  if (!confirmPassword)
    return res.status(400).send({ message: "Confirm passwords is required" });
  if (password !== confirmPassword)
    return res
      .status(400)
      .send({ message: "Passwords and confirm password are not same" });

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(404).send({ message: "User does not exist" });

    const JWT_SECRET_FOR_FORGOT_PASSWORD =
      process.env.JWT_SECRET_KEY + user.password;
    const decoded = jwt.verify(token, JWT_SECRET_FOR_FORGOT_PASSWORD);
    if (!decoded) return res.status(400).send({ message: "Invalid request" });

    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: encryptedPassword },
      { new: true }
    );
    if (!updatedUser)
      return res.status(400).send({ message: "Failed to update user" });
    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}
