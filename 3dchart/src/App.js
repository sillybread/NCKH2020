// eslint-disable-next-line
import React, {useEffect, useState} from 'react';
import './App.css';
import TChart from './components/3DChart.js'
import HueBar from './components/HueBar.js'

/*
let Config =
{
  "size": {
    "x": 50,
    "y": 23,
    "z": 24,
    "tilesize": 5
  },
  "door": {
    "show": true,
    "direction": "A"//"4 hướng là 4 cạnh của hình chữ nhật có thể đánh dấu A B C D"
  },
  "axis-labels": {
    "axis-x": {
      "show": true,
      "list": [0, 5, 12, 19]
    },
    "axis-y": {
      "show": true,
      "list": [2, 6]
    },
    "axis-z": {
      "show": true,
      "list": [5, 9]
    }
  }
}

let _3rd = () => {
  let iMin = 999;
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
  }
};
//let Data =
// {
// 	"values": 
// 	[[
// 		[0, 1, 2],
// 		[0, 1, 2],
// 		[0, 1, 2]
// 	],
// 	[
// 		[0, 1, 2],
// 		[0, 1, 2],
// 		[0, 1, 2]
// 	],
// 	[
// 		[0, 1, 2],
// 		[0, 1, 2],
// 		[0, 1, 2]
// 	]],
// 	"min": 0,
// 	"max": 2
// }

let Slice =
{
    axis: "x",
    level: 0
} 
*/

export default function App() {
  /*
  const [dat,setData] = useState(_3rd());
  
  useEffect(()=>{
    setInterval(()=>{
      setData(_3rd());
    },1000);
  },[])
  */

  return (
    <div className="chartContainer">
      <HueBar width={window.innerWidth} height={10} min={0} max={21}/>
    </div>  
  );//<TChart config={Config} data={dat} slice={Slice}/>
}