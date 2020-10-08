const db = require("../models");
const Room = db.room;
const Access = db.access;

//Create Room
exports.createRoom = (req, res) => {
  const newRoom = new Room({
    name: req.body.name,
    description: req.body.description,
    size: {
      x: req.body.size.x,
      y: req.body.size.y,
      z: req.body.size.z,
    },
    sensorDensity: req.body.sensorDensity,
    door: {
      direction: req.body.door.direction,
    },
  });
  newRoom.save((err, newRoom) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    const newAcces = new Access({
      room: newRoom._id,
      role: "Owner",
      user: req.userId,
    });

    newAcces.save((err, access) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (access) {
        res.status(200).send({ message: "Create Success" });
      }
    });
  });
};

//Get Assess Room
exports.getMyAccessRoom = (req, res) => {
  Access.find({ user: req.userId })
    .populate("room")
    .exec((err1, result) => {
      res.status(200).send(result);
    });
};

//Delete Room
exports.deleteRoom = (req, res) => {
  Room.remove({ _id: req.body._id }).exec((err) => {
    if (err) {
      res.status(400).send({ messageErro: err });
    } else {
      Access.remove({ room: req.body._id, user: req.userId }).exec((err) => {
        if (err) {
          res.status(400).send({ messageErro: err });
        } else {
          res.status(200).send({ message: "Delete success" });
        }
      });
    }
  });
};
