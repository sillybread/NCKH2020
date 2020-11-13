var io = require('socket.io-client');
var socket = io.connect('http://127.0.0.1:8080');
var myUser ='5f6356569122e721b0d933d0';
var myToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNjM1NjU2OTEyMmU3MjFiMGQ5MzNkMCIsImlhdCI6MTYwNTIxNTYyMCwiZXhwIjoxNjA1MzAyMDIwfQ.R_wrgukwV0lyKiysYAxNYEvwu10-V9uPtfv0p9B8db8';

console.log('run');
socket.on('connect', function(){
    console.log("connect");
    socket.emit('login',myToken);
});

socket.on('getData', function(data){
    console.log(data);
});
socket.on('notification', function(data){
    console.log(data);
});
socket.on('access', function(data){
    console.log(data);
    if(data.message =='add'){
        socket.emit('join-room', 'room'+data.data.access.room);  
    }
    if(data.message =='edit'){
        //do something
    }
    if(data.message =='delete' && data.data.access.user==myUser){
        socket.emit('leave-room', 'room'+data.data.access.room);  
    }
    
});
socket.on('room', function(data){
    if(data.message == 'delete'){
        socket.emit('leave-room', 'room'+data.data.room._id);  
    }
    if(data.message == 'edit'){
        console.log(data);  
    }
});
socket.on('structure', function(data){
    if(data.message == 'add'){
        console.log(data); 
    }
    if(data.message == 'update'){
        console.log(data);  
    }
});

socket.on('disconnect', function(){});