const User = require("../models/User");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("_id name email role createdAt")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json("Failed to load users");
  }
};
