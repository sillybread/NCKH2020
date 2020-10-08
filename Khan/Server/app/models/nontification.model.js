const mongoose = require("mongoose");

const Nontification = mongoose.model(
  "Nontification",
  new mongoose.Schema(
    {
      area: { type: mongoose.Schema.Types.ObjectId, ref: "Area" },
      content: { type: String },
      type: { type: String, default: "temperature" },
    },
    { timestamps: true }
  )
);
module.exports = Nontification;
