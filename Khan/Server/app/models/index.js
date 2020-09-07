const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.room = require("./room.model");
db.sensor = require("./sensor.model");
module.exports = db;
