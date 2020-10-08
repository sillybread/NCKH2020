const { authJwt, verifyAccess } = require("../middlewares");
const controller = require("../controllers/access.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //get
  app.get(
    "/api/access/",
    [authJwt.verifyToken, verifyAccess.checkManager],
    controller.getAccess
  );
  //add
  app.post(
    "/api/access/add",
    [authJwt.verifyToken, verifyAccess.checkManager],
    controller.addAccess
  );
  //edit
  app.post(
    "/api/access/edit",
    [authJwt.verifyToken, verifyAccess.checkManager],
    controller.editAccess
  );
  //delete
  app.delete(
    "/api/access/",
    [authJwt.verifyToken, verifyAccess.checkManager],
    controller.deleteAccess
  );
};
