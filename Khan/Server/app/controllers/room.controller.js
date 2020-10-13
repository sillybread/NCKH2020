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
        res.status(500).send({ messageError: err });
        return;
      }

      res.status(200).send({ message: "Create Success" });
    });
  });
};

//Get Assess Room
exports.getMyAccessRoom = (req, res) => {
  Access.find({ user: req.userId })
    .populate("room")
    .exec((err, result) => {
      if (err) {
        res.status(500).send({ messageError: err });
        return;
      }
      res.status(200).send(result);
    });
};

//Delete Room
exports.deleteRoom = (req, res) => {
  Room.remove({ _id: req.body.room_id }).exec((err) => {
    if (err) {
      res.status(400).send({ messageError: err });
      return;
    }
    Access.remove({ room: req.body.room_id, user: req.userId }).exec((err) => {
      if (err) {
        res.status(400).send({ messageError: err });
        return;
      }
      res.status(200).send({ message: "Delete success" });
    });
  });
};

//edit
exports.editRoom = (req, res) => {
  Room.findById(req.body.room_id).exec((err, room) => {
    if (err) {
      res.status(400).send({ messageError: err });
      return;
    }
    if (req.body.name) room.name = req.body.name;
    if (req.body.description) room.description = req.body.description;
    if (req.body.size) {
      if (req.body.size.x) room.size.x = Number(req.body.size.x);
      if (req.body.size.y) room.size.y = Number(req.body.size.y);
      if (req.body.size.z) room.size.z = Number(req.body.size.z);
    }

    if (req.body.sensorDensity)
      room.sensorDensity = Number(req.body.sensorDensity);
    if (req.body.door) {
      if (req.body.door.show != null) room.door.show = req.body.door.show;
      if (req.body.door.direction)
        room.door.direction = req.body.door.direction;
    }
    room
      .save()
      .then(() => {
        res.status(200).send({ message: "Edit Success" });
      })
      .catch((err) => {
        res.status(400).send({ messageError: err });
      });
  });
};
