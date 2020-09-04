import React from 'react';
import './App.css';
import SChart3D from './components/SChart.js'
//import Axios from 'axios';

export default function App() {
  return (
    <div>
      <SChart3D  X="10" Y="10" Z="10" data="http://localhost:5000/"/>
    </div>
  );
}
