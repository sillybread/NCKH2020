const mongoose = require("mongoose");

const Structure = mongoose.model(
  "Structure",
  new mongoose.Schema(
    {
      room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
      sensor: { type: mongoose.Schema.Types.ObjectId, ref: "Sensor" },
      location: {
        x: { type: Number },
        y: { type: Number },
        z: { type: Number },
      },
    },
    { timestamps: true }
  )
);
module.exports = Structure;
