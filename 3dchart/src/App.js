import React from 'react';
import './App.css';
import SChart3D from './components/SChart.js'
//import Axios from 'axios';
/*
function Sample(){
  let rd = function(){
    return Math.random()*180-55;
  }
  let map = {
    map: [[[rd(),rd(),rd()],[rd(),rd(),rd()],[rd(),rd(),rd()]],[[rd(),rd(),rd()],[rd(),rd(),rd()],[rd(),rd(),rd()]],[[rd(),rd(),rd()],[rd(),rd(),rd()],[rd(),rd(),rd()]]]
  }
  return JSON.stringify(map);
}
*/

export default function App() {
  //Axios.get("http://localhost:5000/").then((res) => {console.log(res)});
  return (
    <div>
      <SChart3D  X="20" Y="3" Z="3"/>
    </div>
  );
}
