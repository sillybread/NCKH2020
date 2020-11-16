const mongoose = require("mongoose");

const Sensor = mongoose.model(
  "Sensor",
  new mongoose.Schema(
    {
      deviceId: { type: String, require: true },  
      name: { type: String ,default:"Cảm biến nhiệt độ"},

      activateKey: { type: String, require: true },
      activated: {type: Boolean, default: false},

      isUsed: {type: Boolean, default: false},

      isAdd: {type: Boolean, default: false},
      room: { type: mongoose.Schema.Types.ObjectId, ref: "Room"}
    },
    { timestamps: true }
  )
);
module.exports = Sensor;
