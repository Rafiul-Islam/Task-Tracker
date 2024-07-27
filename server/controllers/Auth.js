import User from "../models/User.js";

export async function signup(req, res) {
  const body = req.body;
  if (!body.name || !body.email || !body.password) {
    return res.status(400).send({message: 'Name, Email and password are required'});
  }

  try {
    const {name, email, password} = body;
    const user = await User.findOne({email});
    if (user) return res.status(400).send({message: 'User already exists'});
    const savedUser = await User.create({name, email, password});
    return res.status(201).send(savedUser);
  } catch (error) {
    return res.status(500).send({message: 'Something went wrong'});
  }
}
