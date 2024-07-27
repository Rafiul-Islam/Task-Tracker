import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {config} from "dotenv";

config();

export async function signup(req, res) {
  const body = req.body;
  if (!body.name.trim() || !body.email.trim() || !body.password.trim()) {
    return res.status(400).send({message: 'Name, Email and password are required.'});
  }

  try {
    const {name, email, password} = body;
    const user = await User.findOne({email});
    if (user) return res.status(400).send({message: 'User already exists.'});

    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const savedUser = await User.create({name, email, password: encryptedPassword});

    return res.status(201).send(savedUser);

  } catch (error) {
    return res.status(500).send({message: 'Something went wrong.'});
  }
}

export async function login(req, res) {
  const body = req.body;

  if (!body.email.trim() || !body.password.trim())
    return res.status(400).send({message: 'Email and password are required.'});

  try {
    const {email, password} = body;
    const user = await User.findOne({email});
    if (!user) return res.status(404).send({message: 'Invalid User.'});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(404).send({message: 'Invalid User.'});

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).send({token});

  } catch (error) {
    return res.status(500).send({message: 'Something went wrong.'});
  }
}
