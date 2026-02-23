const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Lead",

      required: true,
    },

    title: {
      type: String,

      required: true,
    },

    amount: Number,

    stage: {
      type: String,

      enum: ["Prospect", "Negotiation", "Won", "Lost"],

      default: "Prospect",
    },
  },

  { timestamps: true },
);

module.exports = mongoose.model(
  "Deal",

  dealSchema,
);
