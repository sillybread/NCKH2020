import React from 'react';
import './App.css';
import SChart3DLite from './components/SChartLite.js'

let Config =
{
  "size": {
    "x": 50,
    "y": 50,
    "z": 50,
	"tilesize": 1
  },
  "door": {
    "show": true,
    "direction": "A"//"4 hướng là 4 cạnh của hình chữ nhật có thể đánh dấu A B C D"
  },
  "axis-labels": {
    "axis-x": {
      "show": true,
      "list": [0, 10, 12, 19]
    },
    "axis-y": {
      "show": true,
      "list": [2, 3]
    },
    "axis-z": {
      "show": true,
      "list": [1, 2]
    }
  }
}

let Data =
[ 
  [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ],
  [
    [9, 10, 11],
    [12, 13, 14],
    [15, 16, 17]
  ],
  [
    [18, 19, 20],
    [21, 22, 23],
    [24, 25, 26]
  ]
]

let Slice =
{
    axis: "x",
    level: 1
}

function injectState(obj){
  obj.setState({
    oConfig: Config,
    oData: Data,
    oSlice: Slice
  })

  setInterval(()=>{
    let a = new Array(50).fill(0).map(
      x => new Array(50).fill(0).map(
        x => new Array(50).fill(0).map(
          x => Math.trunc(Math.random()*1024))));
    obj.setState({oData: a})  
  },1000);

  window.addEventListener('keypress', (e) => {
    if (e.key === 'z'){
      obj.setState({
        oSlice: {
          axis: Slice.axis, 
          level: prompt("")
        }
      });
    }
  })
}

export default function App() {
  return (
    <div>
      <SChart3DLite size={Config.size} ref={me => injectState(me)}/>
    </div>
  );
}