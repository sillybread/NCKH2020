const mongoose = require("mongoose");

const Room = mongoose.model(
  "Room",
  new mongoose.Schema(
    {
      userRoot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: { type: String, require: true },
      description: { type: String, default: null },
      sensorId: { type: String, default: null },
      access: [
        {
          userAccess: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          role: { type: String, default: "Admin" },
        },
      ],
    },
    { timestamps: true }
  )
);

module.exports = Room;
