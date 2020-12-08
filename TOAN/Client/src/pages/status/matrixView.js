import NoiSuyBaChieu from 'helpers/Interpolations/cubeInterpolation';
import Matrix from "components/matrix/matrix";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const MatrixChart = (props) => {
    const [data,setData] = useState({ values: [[[0]]], min: 0, max: 0});
    const [config,setConfig] = useState({ size: { x: 0, y: 0, z: 0 } });
    const roomData = useSelector(state => state.RoomData);
    const currentRoom = useSelector(state => state.CurrentRoom);

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
                }
            });
        }
      },[currentRoom.info])

    return(
        <>
            <Matrix config={config} data={data}/>
        </>
    )
}

export default MatrixChart;