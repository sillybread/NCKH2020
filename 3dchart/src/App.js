import React from 'react';
import './App.css';
import SChart3D from './components/SChart.js'

function sillyStuff(component){
  let wj = function(inp){
    return "[" + inp + "],";
  }

  let rd = function(){
    let sReturn = "";
    for (let ii=0;ii<10;ii++)
      sReturn += Math.trunc(Math.random()*180-55)+',';
    return wj(sReturn);
  }

  let responseData = '{"map":'+wj(wj(rd()+rd()+rd()+rd())+wj(rd()+rd()+rd()+rd())+wj(rd()+rd()+rd()+rd())+wj(rd()+rd()+rd()+rd())+wj(rd()+rd()+rd()+rd())).replace(/,]/g,"]").slice(0,-1)+'}';
  let data = JSON.parse(responseData);
  component.setState({'map': data.map});

  // setInterval(function(){
  //   component.setState({bg_color: component.state.bg_color + 10});
  // },1000);
}

export default function App() {
  return (
    <div>
      <SChart3D ref={self => {sillyStuff(self)}} />
    </div>
  );
}
