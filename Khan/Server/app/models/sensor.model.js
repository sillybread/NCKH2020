const mongoose = require("mongoose");

const Sensor = mongoose.model(
  "Sensor",
  new mongoose.Schema(
    {
      deviceId: { type: String, require: true },
      name: { type: String },

      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },

      status: { type: String, default: "running" },

      location: {
        x: { type: Number },
        y: { type: Number },
        z: { type: Number },
      },
    },
    { timestamps: true }
  )
);
module.exports = Sensor;
