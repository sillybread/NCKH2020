const db = require("../models");
const User = db.user;
const Room = db.room;
exports.createRoom = (req, res) => {
  const newRoom = new Room({
    userRoot: req.userId,
    name: req.body.name,
    description: req.body.description,
  });
  newRoom.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ message: "Create Success" });
  });
};
exports.getMyRoom = (req, res) => {
  Room.find({ userRoot: req.userId })
    .then((room) => {
      res.status(200).json(room);
    })
    .catch((err) => res.status(500).send({ messageError: err }));
};
