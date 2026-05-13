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

exports.deleteUser = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json("You cannot delete your own account");
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json("User not found");
    }

    res.json("User deleted successfully");
  } catch (error) {
    res.status(500).json("Failed to delete user");
  }
};
