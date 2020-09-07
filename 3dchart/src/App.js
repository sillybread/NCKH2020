import React from 'react';
import './App.css';
import SChart3D from './components/SChart.js'
//import Axios from 'axios';

<<<<<<< HEAD
function sillyStuff(obj) {
=======
function sillyStuff(obj){
>>>>>>> 1be80c17c98d15de9fdd485e15056335df29721e
  obj.setState({
    sSliceAxis: "z",
    iSliceLevel: 3,
    bg_color: 0xffffff
  })
}

export default function App() {
<<<<<<< HEAD
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
=======
  return (
    <div>
      <SChart3D  X="5" Y="5" Z="5"  src="http://localhost:5000/" ref={me => {sillyStuff(me);}}/>
    </div>
  );
}
>>>>>>> 1be80c17c98d15de9fdd485e15056335df29721e
