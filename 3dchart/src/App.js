import React from 'react';
import './App.css';
import SChart3D from './components/SChart.js'

function sillyStuff(obj) {
  obj && obj.setState({
    sSliceAxis: "z",
    iSliceLevel: 0,
    bg_color: 0xccffcc
  })
}

export default function App() {
  return (
    <div>
      <SChart3D  X="5" Y="5" Z="5"  src="http://localhost:5000/" ref={me => {sillyStuff(me);}}/>
    </div>
  );
}