import React from 'react';
import './App.css';
import SChart3DLite from './components/SChartLite.js'

let Config =
{
  "size": {
    "x": 3,
    "y": 3,
    "z": 3,
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
    let a = new Array(3).fill(0).map(x => new Array(new Array(3).fill(0).map(x => Math.trunc(Math.random()*100))));
    obj.setState({
      oData: a
    })
  },1000);
}

export default function App() {
  return (
    <div>
      <SChart3DLite size={Config.size} ref={me => injectState(me)}/>
    </div>
  );
}