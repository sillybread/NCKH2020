
const db = require("../models");
const axios = require('axios');
const config = require('../config/data.config');
const visualData = require('./GetSensorData/visualData');

const xlsxFile = require('read-excel-file/node');
const interpolationArea = require('./Interpolations/MonitorInterpolation');

const Area = db.area;
const Room = db.room;
const Structure = db.structure;
const Sensor = db.sensor;

global.currentData = null;

const fake = require("./Interpolations/cubeInterpolation").Fake;
const result = require("../helps/result.helps");



/* Demo Get Data (Dev Tool)-------------------------------*/
exports.getDemoData = (req, res) => {
  res.send(fake());
};

/* Get Current Data-------------------------------------*/
exports.getCurrent = (req, res) => {
    Structure.findOne({ room: req.body.room_id},'map').populate({
        path: 'map',
        populate: { path: 'sensor' }
    }).sort({"createdAt":-1}).exec((err,structure)=>{
        if(err){
            result.ServerError(res,err);
            return;
        }
        if(structure && global.currentDat !=null){
            let data = new Array();
            let realtimeData;
            structure.map.map(st =>{
                realtimeData = global.currentDat.data.find(sensor => {
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
            result.Ok( res, {room:req.body.room_id,data:data,time: realtimeData.data_createdDate});
        }else{
            result.NotFound(res,'Không có dữ liệu')
        }
        
    });
};

/* get Sensor(activated) data-------------------------------------*/
exports.getSensorData = (req,res)=>{
    Sensor
    .find({ room:req.body.room_id})
    .exec((err,sensors)=>{
        if(err){
            result.ServerError(res,err);
            return;
        }
        if(sensors){
            if(global.currentDat  != null){
                let data = new Array();
                let realtimeData;

                sensors.map(sensorX=>{
                    realtimeData = global.currentDat.data.find(sensor => {
                        return sensor.datatype_id === sensorX.deviceId;
                    });
                    data.push({
                        sensor: sensorX._id,
                        value: realtimeData.data_value,
                        status: (realtimeData.data_value >99)?"OFF":((sensorX.isUsed)?"RUNNING":"ON")
                    })
                });
                result.Ok(res,{
                    room: req.body.room_id,
                    data: data,
                    time: realtimeData.data_createdDate
                });
            }else{
                result.NotFound(res,'Không có dữ liệu');
            }
            
        }else{
            result.NotFound(res,"Không tìm thấy danh sách cảm biến")
        }
    })
}


/* set Realtime Data -------------------------------------*/
exports.setRealtimeData =(tokenApi,io)=>{
    if(config.mode !="fake"){
        RealData(tokenApi,'xxxxxxxx',io);
    }else{
        xlsxFile('./app/controllers/GetSensorData/Data11.xlsx').then(rows =>{
            FakeData(tokenApi,rows,io,1);
        })
        
    } 
}

/* Real Data -------------------------------------*/
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
            global.currentDat = result.data
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

/* Fake Data -------------------------------------*/
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
            global.currentDat = data;
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
                if(structure !=null){
                    let data = new Array();
                    let realtimeData;
                    let areaThemp;
                    structure.map.map(st =>{
                        realtimeData = global.currentDat.data.find(sensor => {
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
                    
                    Area.find({room:room._id}).exec((err,areas)=>{
                        if(err){
                            console.log(err);
                            return;
                        }
                        if(areas!=null){
                            //console.log(data,room,areas);
                            areaThemp = interpolationArea.Get(data,room,areas);
                            console.log(areaThemp);
                            io.to('room'+room._id).emit('getArea',{data:areaThemp, time: realtimeData.data_createdDate});
                        }
                    })
                    io.to('room'+room._id).emit('getData',{room:room._id,data:data,time: realtimeData.data_createdDate });
                }
            });
        })
    })       
}