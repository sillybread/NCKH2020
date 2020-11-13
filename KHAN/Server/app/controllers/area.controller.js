const db = require("../models");
const Room = db.room;
const Access = db.access;
const Structure = db.structure;
const Area = db.area;

//Create Area
exports.createArea = (req, res) => {
    res.status(200).send(req.body);
};


//Edit Area
exports.editArea = (req, res) => {

};

//Delete Area
exports.deleteArea = (req, res) => {

};
