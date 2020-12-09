import Matrix from 'components/matrix/matrix.js';
import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import NoiSuyBaChieu from 'helpers/Interpolations/cubeInterpolation';


const  MatrixView = (props) =>{
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
      }else{
        setData(null);
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
              }
          });
      }
    },[currentRoom.info])

     return (data && config ) && <Matrix data={data} config={config} />
}
export default MatrixView;