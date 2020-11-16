var io = require('socket.io-client');
var socket = io.connect('http://127.0.0.1:8080');
var myUser ='5fb1871ae4760a0cb847ac35';
var myToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjE4NzFhZTQ3NjBhMGNiODQ3YWMzNSIsImlhdCI6MTYwNTQ2OTk4MiwiZXhwIjoxNjA1NTU2MzgyfQ.CtFBYzoCSVpETqKfQERuauK8ZxNgdTIvg51r-2VlBRc';

console.log('run socket client');
socket.on('connect', function(){
    console.log("connect");
    socket.emit('login',myToken);
});
socket.on('getData', function(data){
    console.log(data);
});
socket.on('log', function(data){
    console.log(data);
});

socket.on('getArea',function(data){
    console.log(data);
})

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
    if(data.message == 'add-area'){
        console.log(data);  
    }
    if(data.message == 'edit-area'){
        console.log(data);  
    }
    if(data.message == 'delete-area'){
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