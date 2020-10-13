const routes = function (app) {
  require("./auth.routes")(app);
  require("./room.routes")(app);
  require("./sensor.routes")(app);
  require("./user.routes")(app);
  require("./access.routes")(app);
};
module.exports = routes;
