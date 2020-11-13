
const db = require("../models");
const axios = require('axios');
const config = require('./GetSensorData/config.json')
const visualData = require('./GetSensorData/visualData');
var current = 'data-current';
const xlsxFile = require('read-excel-file/node');


const Data = db.data;
const Room = db.room;
const Structure = db.structure;

exports.getCurrent = (req, res) => {
    Structure.findOne({ room: req.body.room_id},'map').populate({
        path: 'map',
        populate: { path: 'sensor' }
    }).sort({"createdAt":-1}).exec((err,structure)=>{
        if(err){
            res.status(400).send({ messageError: err });
            return;
        }
        let data = new Array();
        let realtimeData;

        structure.map.map(st =>{
             realtimeData = current.data.find(sensor => {
                return sensor.datatype_id === st.sensor.deviceId;
            });
            data.push({
                id: st.sensor.deviceId,
                x: st.location.x,
                y: st.location.y,
                z: st.location.z,
                value: realtimeData.data_value,
            })
        })
        res.status(200).send({room:req.body.room_id,data:data,time: realtimeData.data_createdDate});
    });
};

exports.setRealtimeData =(tokenApi,io)=>{
    if(config.mode !="fake"){
        RealData(tokenApi,'xxxxxxxx',io)
    }else{
        xlsxFile('./app/controllers/GetSensorData/Data11.xlsx').then(rows =>{
            FakeData(tokenApi,rows,io,1)
        })
        
    } 
}
const RealData = (tokenApi,oldDate,io)=>{
    axios({
        url:config.baseURL+config.api.getValue,
        method:"get",
        headers:{
            "Authorization":"JWT "+tokenApi
        },
    }).then(result =>{
        let data = result.data; 
        if(data.data[0].data_createdDate != oldDate){
            current = result.data
            sendDataToRoom(io);
            oldDate = data.data[0].data_createdDate
        
        }
    
        setTimeout(()=>{
            
            RealData(tokenApi,oldDate,io);
        },1000);
    }).catch(err=>{
        console.log(err);
    });
}
const FakeData = (tokenApi,rows,io,index)=>{
    var newIndex;
        if(index < (config.rowsFake-1)*18)
        {
            newIndex = index+18;
        }else{
            newIndex =1;
        }
        //VISUAL DATA
        let data = visualData.Get(rows,index);
            current = data;
            sendDataToRoom(io);
            setTimeout(()=>{
                FakeData(tokenApi,rows,io,newIndex);
            },10000);  
}

const sendDataToRoom = (io)=>{
    Room.find({}).exec((err,rooms)=>{
        if(err){
            console.log(err);
            return;
        }
        rooms.map((room)=>{
            Structure.findOne({ room: room._id}).populate({
                path: 'map',
                populate: { path: 'sensor' }
                }).sort({"createdAt":-1}).exec((err,structure)=>{
                if(err){
                    console.log(err);
                    return;
                }
                let data = new Array();
                let realtimeData;
                if(structure !=null){
                    structure.map.map(st =>{
                        realtimeData = current.data.find(sensor => {
                            return sensor.datatype_id === st.sensor.deviceId;
                        });
                        data.push({
                            id: st.sensor.deviceId,
                            x: st.location.x,
                            y: st.location.y,
                            z: st.location.z,
                            value: realtimeData.data_value,
                        })
                    })
                    io.to('room'+room._id).emit('getData',{room:room._id,data:data,time: realtimeData.data_createdDate });
                }
            });
        })
        })       
}