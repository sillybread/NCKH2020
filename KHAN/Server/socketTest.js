var io = require('socket.io-client');
var socket = io.connect('http://iotlab.net.vn:3000');
console.log('run');
socket.on('connect', function(){
    console.log("oke");
});
socket.emit('login', '40');
socket.on('event', function(data){
    //console.log(data);
});

socket.on('login_notification', function(data){
    console.log(data);
});

socket.on('5f617d8f4414ff1a747de2d7', function(data){
    console.log(data);
});
socket.on('disconnect', function(){});