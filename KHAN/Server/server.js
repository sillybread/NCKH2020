/* Express --------------------------------------------*/
const express = require("express");
const app = express();
const server = require('http').createServer(app);

/* Socket.io server------------------------------------*/
const io = require('socket.io')(server);

const socketController = require("./app/controllers/socket.controller").socketController;
io.on('connection', socket => {
  socketController(socket);
});

/* Body Parser (content-type - application/json) -----*/
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Cors --------------------------------------------*/
const cors = require('cors')
app.use(cors());

/* dotEnv --------------------------------------------*/
require("dotenv").config();

/* Express Session------------------------------------*/
const session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

/* App Router------------------------------------*/
const routes = require("./app/routes");

app.use(function (req, res, next) {
  req.io = io;
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
})

routes(app);

/* Databasse Connect------------------------------------*/
const db = require("./app/models");
db.mongoose
  .connect(process.env.DB_CONECTION, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB Connect Success");
  })
  .catch((err) => {
    console.error("Connect to MongoDB failed", err);
    process.exit();
  });


/* Run Server------------------------------------*/
app.set('port', process.env.PORT || 8080);

app.set('ip', process.env.IP || '127.0.0.1');

server.listen(app.get('port'), app.get('ip'), function() {
  console.log('I am nunning at: http://%s:%s', app.get('ip'), app.get('port'));
});

/* Connect IoT Lab API and Get real time data-----*/
const axios= require('axios');
const setRealtimeData = require('./app/controllers/data.controller').setRealtimeData;
const config = require('./app/config/data.config');

axios.post(config.baseURL+config.api.login,config.loginInfo).then(rep =>{
  console.log('API IoT Lab Connect Success');
  setRealtimeData(rep.data.accessToken,io);
}).catch(err=>{
  console.error('API IoT Lab Service error:',err);
}); 




