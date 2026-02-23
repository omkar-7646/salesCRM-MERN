const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Lead",

      required: true,
    },

    type: {
      type: String,

      enum: ["call", "meeting", "note", "followup"],

      required: true,
    },

    description: String,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",
    },
  },

  { timestamps: true },
);

module.exports = mongoose.model(
  "Activity",

  activitySchema,
);
