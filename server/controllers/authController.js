import User from "../models/User.js";
import bcrypt from "bcrypt";

export async function signup(req, res) {
  const body = req.body;
  if (!body.name.trim() || !body.email.trim() || !body.password.trim()) {
    return res.status(400).send({message: 'Name, Email and password are required'});
  }

  try {
    const {name, email, password} = body;
    const user = await User.findOne({email});

    if (user) return res.status(400).send({message: 'User already exists'});

    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const savedUser = await User.create({name, email, password: encryptedPassword});

    return res.status(201).send(savedUser);
  } catch (error) {
    return res.status(500).send({message: 'Something went wrong'});
  }
}
