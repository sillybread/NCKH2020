const db = require("../models");
const Access = db.access;

checkCreate = (req, res, next) => {
  Access.find({ user: req.userId })
    .populate("room")
    .exec((err, result) => {
      if (err) {
        res.status(500).send({ messageError: err });
        return;
      }
      for (let i = 0; i < result.length; i++) {
        if (result[i].room.name === req.body.name) {
          res
            .status(400)
            .send({ messageError: "Failed! Room'name is already in use!" });
          return;
        }
      }
      next();
    });
};

checkDelete = (req, res, next) => {
  Access.findOne({ room: req.body._id, role: "Owner", user: req.userId }).exec(
    (err, result) => {
      if (err) {
        res.status(400).send({ messageError: "Failed! Id not found!" });
        return;
      }
      if (result) {
        next();
      } else {
        res
          .status(400)
          .send({ messageError: "Failed! You don't have access!" });
        return;
      }
    }
  );
};

const verifyRoom = {
  checkCreate,
  checkDelete,
};

module.exports = verifyRoom;
