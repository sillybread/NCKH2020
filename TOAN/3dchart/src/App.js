 /* eslint-disable */
import SensorMap3D from 'components/SensorMap3D';
import React, {useEffect, useState} from 'react';
import './App.css';


const Data = [
    {
      _id: '5fd3a8f43ce9b40017ac81e5',
      datatype_id: '102',
      data_id: 3078048,
      x: 49,
      y: 0,
      z: 0,
      value: -16.21999931,
      status: 'RUNNING'
    },
    {
      _id: '5fd3a8f43ce9b40017ac81e6',
      datatype_id: '103',
      data_id: 3078049,
      x: 0,
      y: 19,
      z: 0,
      value: -16.65999985,
      status: 'RUNNING'
    },
    {
      _id: '5fd3a8f43ce9b40017ac81e7',
      datatype_id: '104',
      data_id: 3078050,
      x: 49,
      y: 19,
      z: 0,
      value: -17.53466656866667,
      status: 'RUNNING'
    },
    {
      _id: '5fd3a8f43ce9b40017ac81e8',
      datatype_id: '105',
      data_id: 3078051,
      x: 0,
      y: 0,
      z: 19,
      value: -17.87999916,
      status: 'RUNNING'
    },
    {
      _id: '5fd3a8f43ce9b40017ac81e9',
      datatype_id: '106',
      data_id: 3078052,
      x: 49,
      y: 0,
      z: 19,
      value: -17.44000053,
      status: 'RUNNING'
    },
    {
      _id: '5fd3a8f43ce9b40017ac81ea',
      datatype_id: '107',
      data_id: 3078053,
      x: 0,
      y: 19,
      z: 19,
      value: -17.87999916,
      status: 'RUNNING'
    },
    {
      _id: '5fd3a8f43ce9b40017ac81ec',
      datatype_id: '108',
      data_id: 3078055,
      x: 49,
      y: 19,
      z: 19,
      value: -16.11000061,
      status: 'RUNNING'
    },
    {
      _id: '5fd3a8f43ce9b40017ac81e4',
      datatype_id: '101',
      data_id: 3078047,
      x: 0,
      y: 0,
      z: 0,
      value: -18.11000061,
      status: 'RUNNING'
    },
    {
      _id: '5fd3a8f43ce9b40017ac81eb',
      datatype_id: '112',
      data_id: 3078054,
      x: 24,
      y: 10,
      z: 10,
      value: -18.32999992,
      status: 'RUNNING'
    }
  ]

const Config = {
    size: {
      x: 500,
      y: 200,
      z: 200
    },
    door: {
      show: true,
      direction: 'B'
    },
    description: '',
    sensorDensity: 10,
    _id: '5fd3a8b53ce9b40017ac81e1',
    name: 'Kho lạnh Anh Huy',
    createdAt: '2020-12-11T17:13:25.671Z',
    updatedAt: '2020-12-11T17:47:53.249Z',
    __v: 0
  }

export default function App() {
    return (
        <div style={{width:"100vw", height: "100vh"}}>
            <SensorMap3D config={Config} data={Data}/>
        </div>
    );
}