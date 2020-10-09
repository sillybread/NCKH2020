import React from 'react';
import './App.css';
import SChart3DLite from './components/SChartLite.js'

let Config =
{
  "size": {
    "x": 50,
    "y": 50,
    "z": 50
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
    level: 0
}

function injectState(obj){
  obj.setState({
    oConfig: Config,

    oData: Data,
    oSlice: Slice,
    bg_color: 0xccccff
  })
    setInterval(()=>{
      let a = new Array(50).fill(0).map(
        x => new Array(50).fill(0).map(
          x => new Array(50).fill(0).map(
            x => Math.trunc(Math.random()*1024))));
      obj.setState({
        oData: a, 
      })  
    },1000);

  window.addEventListener('keypress', (e) => {
    if (e.key === 'z'){
      let aData = prompt("axis|level").split("|");
      obj.setState({
        oSlice: {
          axis: aData[0],
          level: aData[1]
        }
      });
    }
  })
}

export default function App() {
  return (
    <div>
      <SChart3DLite tileSize={6} ref={me => injectState(me)}/>
    </div>
  );
}