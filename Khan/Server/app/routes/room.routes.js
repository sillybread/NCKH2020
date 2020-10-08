const { authJwt, verifyRoom } = require("../middlewares");
const controller = require("../controllers/room.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/room/create",
    [authJwt.verifyToken, verifyRoom.checkCreate],
    controller.createRoom
  );
  app.get("/api/room/", [authJwt.verifyToken], controller.getMyAccessRoom);
  app.delete(
    "/api/room/",
    [authJwt.verifyToken, verifyRoom.checkDelete],
    controller.deleteRoom
  );
};
