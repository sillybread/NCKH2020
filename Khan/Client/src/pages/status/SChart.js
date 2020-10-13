// eslint-disable-next-line
import React, {useEffect, useState} from 'react';
import TChart from './component3DChart/TChart.js'
import HueBar from './component3DChart/HueBar.js'
import Axios from 'axios';
import MySlice from '../../components/MySlice.js';
import { config } from '@fullcalendar/core';


let Config =
{
  "size": {
    "x": 53,
    "y": 22,
    "z": 25,
    "tilesize": 5
  },
  "door": {
    "show": true,
    "direction": "C"//"4 hướng là 4 cạnh của hình chữ nhật có thể đánh dấu A B C D"
  },
  "axis-labels": {
    "axis-x": {
      "show": true,
      "list": [0, 53]
    },
    "axis-y": {
      "show": true,
      "list": [22]
    },
    "axis-z": {
      "show": true,
      "list": [25]
    }
  }
}


let _3rd = () => {

  // Example POST method implementation:
  /* let iMin = 999;
  let iMax = -999;
  let rd;
  return { values: new Array(24).fill(0).map(
  x => new Array(23).fill(0).map(
    x => new Array(50).fill(0).map(
      x => {
        rd = Math.random()*1024;
        if (rd < iMin) iMin = rd;
        if (rd > iMax) iMax = rd;
        return rd;
      }
      )
    )
  ),
  min: iMin,
  max: iMax
  } */
};
/* let Data =
{
	"values": 
	[[
		[0, 1, 2],
		[0, 1, 2],
		[0, 1, 2]
	],
	[
		[0, 1, 2],
		[0, 1, 2],
		[0, 1, 2]
	],
	[
		[0, 1, 2],
		[0, 1, 2],
		[0, 1, 2]
	]],
	"min": 0,
	"max": 2
} */


function axiosTest() {
  // create a promise for the axios request
  const promise = Axios.get("http://localhost:8080/api/sensor/demoTemperature");

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response.data)

  // return it
  return dataPromise
}

// now we can use that data from the outside!

export default function SChart() {
  const [data,setData] = useState(null); 
  const [slice,setSlice] = useState(
    {
      axis: "z",
      level: 0
  }
  );
  useEffect(()=>{
    axiosTest()
    .then(data => {
      setData(data);
   })
     .catch(err => console.log(err))
  },[]);
  const getMaxSlice = (myslice)=>{
    if(myslice.axis ==="x") return Config.size.x;
    if(myslice.axis ==="y") return Config.size.y;
    if(myslice.axis ==="z") return Config.size.z;
  }
/* <div className="chartContainer">
      <HueBar width={window.innerWidth} height={10} min={0} max={21}/>
    </div>  */
  return (<>
  <TChart config={Config} data={data} slice={slice}/>
  <div className="p-x-4">
    <HueBar min={-19.99} max={-7.22}></HueBar>
  </div>
  <MySlice max={0} max={getMaxSlice(slice)} 
      onChangeValue={(value)=> {setSlice({axis:slice.axis,level:value});console.log(slice)}}
      onChangeAxis={(ax)=>{setSlice({axis:ax,level:slice.level})}}
  ></MySlice>
  </>
       
  );
}