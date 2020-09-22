import React from 'react';
import './App.css';
import SChart3DLite from './components/SChartLite.js'

export default function App() {
  return (
    <div>
      <SChart3DLite ref={self=>{self.setState({bg_color: 0xffffff})}}/>
    </div>
  );
}