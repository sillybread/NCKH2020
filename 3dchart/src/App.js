import React from 'react';
import './App.css';
import SChart3D from './components/SChart.js'
//import Axios from 'axios';

function sillyStuff(obj){
  obj.setState({
    sSliceAxis: "x",
    iSliceLevel: 2
  })
}

export default function App() {
  return (
    <div>
      <SChart3D  X="10" Y="10" Z="10" src="http://localhost:5000/" ref={me => {sillyStuff(me);}}/>
    </div>
  );
}
