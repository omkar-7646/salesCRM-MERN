const Deal = require("../models/Deal");

// CREATE DEAL

exports.createDeal = async (req, res) => {
  const deal = await Deal.create(req.body);

  res.json(deal);
};

// GET DEALS

exports.getDeals = async (req, res) => {
  const leadId = req.query.leadId;

  let filter = {};

  if (leadId) {
    filter.leadId = leadId;
  }

  const deals = await Deal.find(filter);

  res.json(deals);
};

// UPDATE STAGE

exports.updateDeal = async (req, res) => {
  const deal = await Deal.findByIdAndUpdate(
    req.params.id,

    req.body,

    { new: true },
  );

  res.json(deal);
};

// DELETE DEAL

exports.deleteDeal = async (req, res) => {
  await Deal.findByIdAndDelete(req.params.id);

  res.json("Deal Deleted");
};
