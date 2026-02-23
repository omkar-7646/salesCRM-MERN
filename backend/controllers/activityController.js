const Activity = require("../models/Activity");

// CREATE ACTIVITY

exports.createActivity = async (req, res) => {
  const activity = await Activity.create({
    ...req.body,

    createdBy: req.user._id,
  });

  res.json(activity);
};

// GET ACTIVITIES

exports.getActivities = async (req, res) => {
  const leadId = req.query.leadId;

  let filter = {};

  if (leadId) {
    filter.leadId = leadId;
  }

  const activities = await Activity.find(filter)

    .populate("createdBy", "name")

    .sort({ createdAt: -1 });

  res.json(activities);
};

// DELETE

exports.deleteActivity = async (req, res) => {
  await Activity.findByIdAndDelete(req.params.id);

  res.json("Deleted");
};
