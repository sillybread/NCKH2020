const db = require("../models");
const Sensor = db.sensor;
const Activate = db.activate;
const result = require("../helps/result.helps");

/* Create -------------------------------------*/
exports.createSensor = (req, res) => {
  const newSensor = new Sensor({
    deviceId: req.body.deviceId,
    activateKey: req.body.activateKey
  });
  newSensor.save()
  .then((sensor)=>{
    result.Ok(res,{sensor: sensor});
  })
  .catch(err=>{
    result.ServerError(res,err);
  })
};

/* Activate Sensor -----------------*/

exports.activateSensor = (req, res) => {
 Sensor.find({deviceId: req.body.deviceId}).exec((err,sensor)=>{
    if(err){
      result.ServerError(res,err);
      return;
    }
    if(sensor.length==0){
      result.NotFound(res,'Cảm biến không tồn tại');
      return;
    }
    if(sensor[0].activateKey !== req.body.activateKey){
      result.Forbidden(res,'Sai mâ kích hoạt');
      return;
    }
    if(sensor[0].activated == true){
      result.Forbidden(res,'Đã được sử dụng');
      return;
    }
    sensor[0].activated = true;
    sensor[0].save().then(sr=>{
      const newActivate = new Activate({
        user: req.userId,
        sensor: sr._id
      })
      
      newActivate.save().then(()=>{
        result.Ok(res,'Kích hoạt thành công');
      })
      .catch(err=>{
        result.ServerError(res,err);
      })
    }).catch(err=>{
      result.ServerError(res,err);
    })
    
 });
};

/* Get No Activate Sensors -----------------*/
exports.getNoActivateSensor = (req,res)=>{
  Sensor.find({activated: false},"_id name deviceId").exec((err,sensors)=>{
    if(err){
      result.ServerError(res,err);
      return;
    }
    result.Ok(res,{sensors:sensors});
  })
}

/* Get Activate Sensor By User -----------------*/
exports.getActivateSensor = (req,res)=>{
  Activate
  .find({user:req.userId},{_id:0, user:0,createdAt:0,updatedAt:0,__v:0})
  .populate('sensor',{createdAt:0,updatedAt:0,__v:0,activated:0,isUsed:0})
  .exec((err,sensors)=>{
    if(err){
      result.ServerError(res,err);
      return;
    }
    result.Ok(res,{sensors:sensors});
  })
}

/* Get Sensor NoT add to room-----------------*/
exports.getNotAddSensor = (req,res)=>{
  Activate
  .find({user:req.userId},{_id:0, user:0,createdAt:0,updatedAt:0,__v:0})
  .populate({
    path: 'sensor',
    select: '_id name deviceId',
    match: {
        isUsed: false,
        isAdd: false,
    }
    }
  )
  .exec((err,sensors)=>{
    
    if(err){
      result.ServerError(res,err);
      return;
    }
    result.Ok(res,{sensors: sensors});
  })
}


//Get Room Sensor all
exports.getRoomSensor = (req,res)=>{
  Sensor.find({room:req.body.room_id,isAdd:true},'_id name deviceId isUsed')
  .exec((err,sensors)=>{
    if(err){
      result.ServerError(res,err);
      return;
    }
    result.Ok(res,{sensors:sensors});

  })
}

//Get Room Sensor no used
exports.getRoomSensorNotUse = (req,res)=>{
  Sensor.find({room:req.body.room_id,isUsed:false},'_id name deviceId')
  .exec((err,sensors)=>{
    if(err){
      result.ServerError(res,err);
      return;
    }
    result.Ok(res,{sensors:sensors});
    
  })
}

//Add Sensor To Room
exports.addRoomSensor = (req,res)=>{
  Sensor.findById(req.body.sensor_id)
  .exec((err,sensor)=>{
    if(err){
      result.ServerError(res,err);
      return;
    }
    if(sensor){
      sensor.room = req.body.room_id,
      sensor.isAdd = true;

      sensor
      .save()
      .then(sensor=>{
        result.Ok(res,{sensor:sensor});
      })
      .catch(err =>{
        result.ServerError(res,err);
      })

    }else{
      result.NotFound(res,'Không tìm thấy');
    }
   
  })
}

//Remove From Room
exports.removeRoomSensor= (req,res)=>{
  Sensor.findById(req.body.sensor_id)
  .exec((err,sensor)=>{
    if(err){
      result.ServerError(res,err);
      return;
    }
    if(sensor){
      sensor.room = null
      sensor.isAdd = false;

      sensor
      .save()
      .then(sensor=>{
        result.Ok(res,'Gỡ khỏi kho thành công');
      })
      .catch(err =>{
        result.ServerError(res,err);
      })

    }else{
      result.NotFound(res,'Không tìm thấy');
    }
   
  })
}