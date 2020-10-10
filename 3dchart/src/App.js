// eslint-disable-next-line
import React, {useEffect, useState} from 'react';
import './App.css';
import TChart from './components/3DChart.js'

let Config =
{
  "size": {
    "x": 50,
    "y": 50,
    "z": 50,
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

let Data = () => {
  return new Array(50).fill(0).map(
  x => new Array(50).fill(0).map(
    x => new Array(50).fill(0).map(
      x => Math.trunc(Math.random()*1024))))
};

let Slice =
{
    axis: "x",
    level: 0
}

export default function App() {
  const [dat,setData] = useState(Data());
  
  useEffect(()=>{
    setInterval(()=>{
      setData(Data());
    },1000);
  },[])

  return (
    <div>
      <TChart config={Config} data={dat} slice={Slice}/>
    </div>
  );
}