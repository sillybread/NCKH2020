import React from 'react';
import './App.css';
import SChart3D from './components/SChart.js'
//import Axios from 'axios';

function sillyStuff(obj) {
  obj.setState({
    sSliceAxis: "z",
    iSliceLevel: 3,
    bg_color: 0xffffff
  })
}

export default function App() {
  return ( <div>
    <SChart3D X = "5"
    Y = "5"
    Z = "5"
    src = "http://localhost:5000/"
    ref = {
      me => {
        sillyStuff(me);
      }
    }
    /> </div>
  );
}