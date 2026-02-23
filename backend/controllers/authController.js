const User = require("../models/User");

const bcrypt = require("bcryptjs");

const token = require("../utils/generateToken");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hash,
    role,
  });

  res.json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(400)

      .json("User Not Found");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res
      .status(400)

      .json("Wrong Password");
  }

  res.json({
    token: token(user._id),

    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
