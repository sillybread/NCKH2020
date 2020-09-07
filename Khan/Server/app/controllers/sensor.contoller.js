const db = require("../models");
const Sensor = db.room;
const User = db.user;
exports.createSensor = (req, res) => {
  User.findById(req.userId)
    .then((data) => {
      res.status(400).json(data);
    })
    .catch((err) => {
      res.status(500).json({ err: err });
    });
};
exports.getTemperature = (req, res) => {
<<<<<<< HEAD
  let mapSize = 10;
=======
  let mapSize = 5;
>>>>>>> 1be80c17c98d15de9fdd485e15056335df29721e
  let rd = function () {
    return Math.trunc(Math.random() * 180 - 55);
  };
  let ret = [];
  for (let i = 0; i < Math.pow(mapSize, 3); i++) {
    ret.push(rd());
  }
  res.send(JSON.stringify({ data: ret }));
};
