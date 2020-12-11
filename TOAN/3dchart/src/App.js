 /* eslint-disable */
import React, {useEffect, useState} from 'react';
import './App.css';
import TChart from './components/3DChart.js';
import HueBar from './components/HueBar.js'
import {SensorMap} from 'components/matrix/matrix.js';


const Data = [
    [0,0,0],
    [1,1,1],
    [2,2,2],
    [3,3,3]
]

export default function App() {
    return (
        //<div style={{width:300, height: 300}}>
            <SensorMap data={Data}/>
        //</div>
    );
}