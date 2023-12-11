import bcrypt from "bcrypt";
import { HttpError } from "../helpers/index.js";
import wrapController from "../decorators/controllerWrapper.js";
import User from "../models/User.js";

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  console.log(password);

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    email: newUser.email,
    username: newUser.username,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompared = await bcrypt.compare(password, user.password);
  if (!passwordCompared) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = "allalalal123";

  res.json({
    token,
  });
};

export default {
  register: wrapController(register),
  login: wrapController(login),
};
