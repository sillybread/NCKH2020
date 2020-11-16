const { authJwt,verifyAccess } = require("../middlewares");
const controller = require("../controllers/sensor.contoller");
module.exports = function (app) {

  /* Create -------------------------------------*/
  app.post("/api/sensor/create",controller.createSensor);

  //active Sensor
  app.post("/api/sensor/activate",[authJwt.verifyToken],controller.activateSensor);

  /* Get No Activate Sensors ---            ---*/
  app.get("/api/sensor/noActivate",[authJwt.verifyToken],controller.getNoActivateSensor);

  //get Activate Sensor
  app.get("/api/sensor/activate",[authJwt.verifyToken],controller.getActivateSensor);
  
  //get sensor not add to room
  app.get("/api/sensor/notAdd",[authJwt.verifyToken],controller.getNotAddSensor);


  //Get Room Sensor all
  app.get("/api/room/sensor/all",[authJwt.verifyToken,verifyAccess.checkManager],controller.getRoomSensor);

  //Get Room Sensor no used
  app.get("/api/room/sensor/notUse",[authJwt.verifyToken,verifyAccess.checkManager],controller.getRoomSensorNotUse);

  //Add Sensor To Room
  app.post("/api/room/sensor/add",[authJwt.verifyToken,verifyAccess.checkOwner],controller.addRoomSensor);
  
  //Remove From Room
  app.delete("/api/room/sensor",[authJwt.verifyToken,verifyAccess.checkOwner],controller.removeRoomSensor);

};
