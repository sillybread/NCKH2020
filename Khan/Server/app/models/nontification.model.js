const mongoose = require("mongoose");

const Nontification = mongoose.model(
  "Nontification",
  new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      content: { type: String },
      type: { type: String, default: "Area_Temperature" },
    },
    { timestamps: true }
  )
);
module.exports = Nontification;
