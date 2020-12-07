// eslint-disable-next-line
import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import TChart from 'components/3DChart/3DChart.js'
import HueBar from 'components/HueBar.js'
import MySlice from 'components/MySlice.js';
import { useSelector } from 'react-redux';
import NoiSuyBaChieu from 'helpers/Interpolations/cubeInterpolation';


export default function SChart() {
    const [data,setData] = useState(null);
    const currentRoom = useSelector(state => state.CurrentRoom);
    const roomData = useSelector(state => state.RoomData);
    const [config,setConfig] = useState(null);

    useEffect(()=>{
      if(roomData && currentRoom && roomData.currentData && currentRoom.info && currentRoom.info.size){
          if(roomData.currentData.data){
            setData(NoiSuyBaChieu(roomData.currentData.data,currentRoom.info));
          }else{
            setData(NoiSuyBaChieu(roomData.currentData.datas,currentRoom.info));
          }
      }

    },[roomData.currentData,currentRoom.info])

    useEffect(()=>{
      if(currentRoom && currentRoom.info && currentRoom.info.size){
          const density = currentRoom.info.sensorDensity;
          const xBlock = currentRoom.info.size.x / density -1;
          const yBlock = currentRoom.info.size.y / density -1;
          const zBlock = currentRoom.info.size.z / density -1;
          setConfig({
              "size": {
                "x": xBlock,
                "y": yBlock,
                "z": zBlock,
                "tilesize": 5
              },
              "door": currentRoom.info.door,
              "axis-labels": {
                "axis-x": {
                  "show": true,
                  "list": []
                },
                "axis-y": {
                  "show": false,
                  "list": []
                },
                "axis-z": {
                  "show": false,
                  "list": []
                }
              }
          });
      }
    },[currentRoom.info])


    const [axis, setAxis] = useState('x');
    const [slice,setSlice] = useState({
        origin: null,
        destination: null
    });
    const [exTemp, setExTemp] = useState({
        min: 0,
        max: 0
    })
    useEffect(()=>{
        data!=null && setExTemp({
            min: data.min,
            max: data.max
        });
    },[data])
  
     return (config !=null && data != null) && (
      <>
      <TChart config={config} data={data} slice={slice}/>
      <div className="p-x-4">
        <HueBar min={exTemp.min} max={exTemp.max} width={"100%"} height={10}/>
      </div>
      <MySlice max={0} max={ config.size[axis]-1}
          onChangeValue={(value)=> {
              let vDes = {
                  x: config.size.x,
                  y: config.size.y,
                  z: config.size.z
              }
              vDes[axis] = config.size[axis] - value;
              setSlice({
                  origin: null,
                  destination: vDes
              });
          }}
          onChangeAxis={(ax)=>setAxis(ax)}
      />
      </> 
    )
}