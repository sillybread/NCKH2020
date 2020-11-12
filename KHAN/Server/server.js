const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
require("dotenv").config();
const routes = require("./app/routes");
const app = express();
// Socket
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(function (req, res, next) {
  req.io = io;
  next()
})

io.on('connection', socket => {
  socket.join('khan');
}); 

//Sesson
const session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
// Cors
app.use(cors());

//Databasse Connect
const db = require("./app/models");
db.mongoose
  .connect(process.env.DB_CONECTION, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// simple route
app.get("/demo", (req, res) => {
  res.json({ message: "Welcome to application." });
});
// App routes
routes(app);


// set port, listen for requests

app.set('port', process.env.PORT || 8080);
app.set('ip', process.env.IP || '127.0.0.1');
server.listen(app.get('port'), app.get('ip'), function() {
  console.log('All right ! I am alive at Port: %s:%s!', app.get('ip'), app.get('port'));
})
/* app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
}); */


// Data realtime
var axios= require('axios');
const setRealtimeData = require('./app/controllers/data.controller').setRealtimeData;
const config = require('./app/controllers/GetSensorData/config.json')
axios.post(config.baseURL+config.api.login,config.loginInfo).then(rep =>{
    //setRealtimeData(rep.data.accessToken,io);
}).catch(err=>{
  console.log('API Service error',err);
}); 


