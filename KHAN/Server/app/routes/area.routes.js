const { authJwt, verifyAccess, verifyRoom } = require("../middlewares");
const controller = require("../controllers/area.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //create
  app.post(
    "/api/area/create",
    [authJwt.verifyToken, verifyRoom.checkCreate],
    controller.createArea
  );
  //edit
  app.post(
    "/api/area/edit",
    [authJwt.verifyToken, verifyAccess.checkManager, verifyRoom.checkEdit],
    controller.editArea
  );
  //delete
  app.delete(
    "/api/area/",
    [authJwt.verifyToken, verifyAccess.checkOwner],
    controller.deleteArea
  );
};
