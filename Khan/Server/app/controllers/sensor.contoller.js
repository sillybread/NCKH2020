const db = require("../models");
const itp = require("./interpolation");
const fake = require("./cubeInterpolation").Fake;
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

function Sample2() {
  var point = function (x, y, z, v) {
    return { x: x, y: y, z: z, value: v };
  };
  let aRet = [];
  data = fake();
  for (zz = 0; zz < 24; zz++)
    for (yy = 0; yy < 23; yy++)
      for (xx = 0; xx < 54; xx++) {
        aRet.push(data[xx][yy][zz]);
      }
  //return JSON.stringify({ data: data });
  return JSON.stringify({ data: aRet });
}

exports.getTemperature = (req, res) => {
  let mapSize = 10;
  let rd = function () {
    return Math.trunc(Math.random() * 180 - 55);
  };
  let ret = [];
  for (let i = 0; i < Math.pow(mapSize, 3); i++) {
    ret.push(rd());
  }
  //res.send(JSON.stringify({ data: ret }));
  res.send(Sample2());
};
