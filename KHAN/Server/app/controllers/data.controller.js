
const db = require("../models");
const axios = require('axios');
const config = require('./GetSensorData/config.json')
const visualData = require('./GetSensorData/visualData');
const { Fake } = require("./cubeInterpolation");
var current = 'data-current';


const Data = db.data;
exports.getCurrent = (req, res) => {
    res.status(200).send(current);
};

exports.setRealtimeData =(tokenApi,io)=>{
    if(config.mode !="fake"){
        RealData(tokenApi,'xxxxxxxx',io)
    }else{
        FakeData(tokenApi,io,1)
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
            /* console.log(result.data); */
            current = result.data
            //io.to('khan').emit('event',result.data);
            oldDate = data.data[0].data_createdDate
        
        }
        RealData(tokenApi,oldDate,io);
    }).catch(err=>{
        console.log(err);
    });
}
const FakeData = (tokenApi,io,index)=>{
    var newIndex;
         if(index < (config.rowsFake-1)*18)
        {
            newIndex = index+18;
        }else{
            newIndex =1;
        }
        //VISUAL DATA
        visualData.Get(index).then(data=>{
            /* console.log(data); */
            current = data;
            //io.to('khan').emit('event',data);
            FakeData(tokenApi,io,newIndex);
            
        })
        .catch(err=>{
            console.log(err);
        })
}