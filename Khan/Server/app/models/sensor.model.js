const mongoose = require("mongoose");

const Sensor = mongoose.model(
  "Sensor",
  new mongoose.Schema(
    {
      deviceId: { type: String, require: true },
      name: { type: String },
      activeKey: { type: String, require: true },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    { timestamps: true }
  )
);
module.exports = Sensor;
