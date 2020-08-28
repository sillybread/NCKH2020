import React from 'react';
import './App.css';
import SChart3D from './components/SChart.js'

function sillyStuff(component){
  setInterval(function(){
    component.setState({bg_color: component.state.bg_color + Math.random()*100});
  },1000)
}

export default function App() {
  return (
    <div>
      <SChart3D ref={self => {sillyStuff(self)}} />
    </div>
  );
}
