const db = require("../models");
const Access = db.access;
exports.getAccess = (req, res) => {
  Access.find({ room: req.body.room_id })
    .populate("user")
    .exec((err, result) => {
      if (err) {
        res.status(400).send({ messageError: err });
        return;
      }
      res.status(200).send(result);
    });
};
exports.addAccess = (req, res) => {
  const newAccess = new Access({
    room: req.body.room_id,
    user: req.body.user_id,
    role: req.body.role,
  });
  newAccess
    .save()
    .then(() => {
      res.status(200).send({ message: "Add Success" });
    })
    .catch((err) => {
      res.status(400).send({ messageError: err });
    });
};
exports.editAccess = (req, res) => {
  Access.findById(req.body.access_id).exec((err, access) => {
    if (err) {
      res.status(400).send({ messageError: err });
      return;
    }
    access.role = req.body.role;
    access
      .save()
      .then(() => {
        res.status(200).send({ message: "Edit success" });
      })
      .catch((err) => {
        res.status(400).send({ messageError: err });
      });
  });
};
exports.deleteAccess = (req, res) => {
  Access.remove({ _id: req.body.access_id }).exec((err) => {
    if (err) {
      res.status(400).send({ messageError: err });
      return;
    }
    res.status(200).send({ message: "Delete success" });
  });
};
