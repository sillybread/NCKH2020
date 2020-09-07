const mongoose = require("mongoose");

const Sensor = mongoose.model(
  "Sensor",
  new mongoose.Schema({
    deviceId: { type: String, require: true },
    name: { type: String },
    onwnerId: mongoose.Schema.Types.ObjectId,
    status: { type: String, default: "offline" },
  })
);
module.exports = Sensor;
