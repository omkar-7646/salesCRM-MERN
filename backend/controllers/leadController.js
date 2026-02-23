const Lead = require("../models/Lead");

// CREATE LEAD

exports.createLead = async (req, res) => {
  const lead = await Lead.create({
    ...req.body,

    createdBy: req.user._id,

    assignedTo: req.user._id,
  });

  res.json(lead);
};

// GET LEADS (Search + Filter)

exports.getLeads = async (req, res) => {
  try {
    const search = req.query.search || "";

    const status = req.query.status || "";

    let filter = {};

    // SALES USER

    if (req.user.role === "sales") {
      filter.assignedTo = req.user._id;
    }

    // SEARCH

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },

        { email: { $regex: search, $options: "i" } },

        { company: { $regex: search, $options: "i" } },
      ];
    }

    // FILTER

    if (status) {
      filter.status = status;
    }

    const leads = await Lead.find(filter)

      .populate("assignedTo", "name");

    res.json(leads);
  } catch {
    res.status(500).json("Server Error");
  }
};

// VIEW DETAIL

exports.getLeadById = async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    return res
      .status(404)

      .json("Lead Not Found");
  }

  res.json(lead);
};

// UPDATE

exports.updateLead = async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,

    req.body,

    { new: true },
  );

  res.json(lead);
};

// DELETE

exports.deleteLead = async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);

  res.json("Lead Deleted");
};
