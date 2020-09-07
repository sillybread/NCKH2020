const { authJwt } = require("../middlewares");
const controller = require("../controllers/sensor.contoller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/sensor/create", [authJwt.verifyToken], controller.createSensor);
  app.get("/api/sensor/demoTemperature", controller.getTemperature);
};
