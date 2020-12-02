import React from 'react';
import Chart from 'react-apexcharts';
import { DropdownMenu, DropdownToggle, UncontrolledButtonDropdown, DropdownItem, Row, Col } from 'reactstrap';
import MySlice from 'components/MySlice';
import SensorItem from './sensorItem';
import ConfigSensor from './configSensor';

const demoMap = [
    [0, 0, 0, 0],
    [1, 3, 3, 1],
    [1, 2, 2, 1],
    [1, 1, 1, 1],
];

const SensorMap = () => {

    const [modalConfig,setModalConfig] = React.useState({
        x:0,
        y:0,
        z:0,
        show:false,
    });


    const apexAreaChart2Opts = {
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                radius: 0,
                useFillColorAsStroke: false,
                colorScale: {
                    ranges: [
                        {
                            from: -1,
                            to: 0,
                            name: 'Trống',
                            color: '#fafafa',
                        },

                        {
                            from: 0,
                            to: 1,
                            name: 'Đang chạy',
                            color: '#00A100',
                        },
                        {
                            from: 1,
                            to: 2,
                            name: 'Đang tắt',
                            color: '#FFAA00',
                        },

                        {
                            from: 2,
                            to: 3,
                            name: 'Cần thiết',
                            color: '#DC0404',
                        },
                    ],
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 1,
        },
        chart: {
            events: {
                dataPointSelection: (event, chartContext, config) => {
                    showLocation(config);
                },
            },
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            enabled: false,
        },
    };
    const showLocation = function (context) {
        console.log(context.dataPointIndex,context.seriesIndex);
        setModalConfig({
            x:context.dataPointIndex,
            y:context.seriesIndex,
            z:0,
            show: true,
        });
    };
    const generateData = (count, yrange) => {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = i;
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            series.push([x, y]);
            i++;
        }
        return series;
    };
    const apexAreaChart2Data = [
        {
            name: '0',
            data: generateData(20, {
                min: -1,
                max: 3,
            }),
        },
        {
            name: '1',
            data: generateData(20, {
                min: -1,
                max: 3,
            }),
        },
        {
            name: '2',
            data: generateData(20, {
                min: -1,
                max: 3,
            }),
        },
        {
            name: '3',
            data: generateData(20, {
                min: -1,
                max: 3,
            }),
        },
        {
            name: '4',
            data: generateData(20, {
                min: -1,
                max: 3,
            }),
        },
        {
            name: '5',
            data: generateData(20, {
                min: -1,
                max: 3,
            }),
        },
        {
            name: '6',
            data: generateData(20, {
                min: -1,
                max: 3,
            }),
        },
        {
            name: '7',
            data: generateData(20, {
                min: -1,
                max: 3,
            }),
        },
        {
            name: '8',
            data: generateData(20, {
                min: -1,
                max: 3,
            }),
        },
    ];
    const sensors = [
        {
            "_id": "5fc06f5fa91004001721b0a8",
            "datatype_id": "101",
            "data_id": 3078047,
            "value": -19.44000053,
            "name": "Cảm biến nhiệt độ 101",
            "status": "RUNNING"
          },
          {
            "_id": "5fc06f5fa91004001721b0a9",
            "datatype_id": "102",
            "data_id": 3078048,
            "value": -17.65999985,
            "name": "Cảm biến nhiệt độ 102",
            "status": "ON"
          },
          {
            "_id": "5fc06f5fa91004001721b0aa",
            "datatype_id": "103",
            "data_id": 3078049,
            "value": -16.11000061,
            "name": "Cảm biến nhiệt độ 103",
            "status": "ON"
          },
          {
            "_id": "5fc06f5fa91004001721b0ab",
            "datatype_id": "104",
            "data_id": 3078050,
            "value": -18.44000053,
            "name": "Cảm biến nhiệt độ 104",
            "status": "ON"
          },
          {
            "_id": "5fc06f5fa91004001721b0ac",
            "datatype_id": "105",
            "data_id": 3078051,
            "value": -17,
            "name": "Cảm biến nhiệt độ 105",
            "status": "ON"
          },
          {
            "_id": "5fc06f5fa91004001721b0ad",
            "datatype_id": "106",
            "data_id": 3078052,
            "value": -18.87999916,
            "name": "Cảm biến nhiệt độ 106",
            "status": "ON"
          },
          {
            "_id": "5fc06f5fa91004001721b0ae",
            "datatype_id": "107",
            "data_id": 3078053,
            "value": -17.77000046,
            "name": "Cảm biến nhiệt độ 107",
            "status": "ON"
          },
          {
            "_id": "5fc06f5fa91004001721b0af",
            "datatype_id": "112",
            "data_id": 3078054,
            "value": -19.54999924,
            "name": "Cảm biến nhiệt độ 112",
            "status": "ON"
          },
          {
            "_id": "5fc06f5fa91004001721b0b0",
            "datatype_id": "108",
            "data_id": 3078055,
            "value": -17.11000061,
            "name": "Cảm biến nhiệt độ 108",
            "status": "ON"
          },
          {
            "_id": "5fc06f5fa91004001721b0b1",
            "datatype_id": "109",
            "data_id": 3078056,
            "value": -17.44000053,
            "name": "Cảm biến nhiệt độ 109",
            "status": "ON"
          },
          {
            "_id": "5fc06f5fa91004001721b0b2",
            "datatype_id": "110",
            "data_id": 3078057,
            "value": -16.11000061,
            "name": "Cảm biến nhiệt độ 110",
            "status": "ON"
          },
          {
            "_id": "5fc06f5fa91004001721b0b3",
            "datatype_id": "111",
            "data_id": 3078058,
            "value": -17.44000053,
            "name": "Cảm biến nhiệt độ 111",
            "status": "ON"
          },
          {
            "_id": "5fc06f5fa91004001721b0b4",
            "datatype_id": "114",
            "data_id": 3078059,
            "value": -17.828750252499994,
            "name": "Cảm biến nhiệt độ 114",
            "status": "ON"
          },
          {
            "_id": "5fc06f5fa91004001721b0b5",
            "datatype_id": "113",
            "data_id": 3078060,
            "value": -18.77000046,
            "name": "Cảm biến nhiệt độ 113",
            "status": "ON"
          },
          {
            "_id": "5fc06f5fa91004001721b0b6",
            "datatype_id": "115",
            "data_id": 3078061,
            "value": -18.65999985,
            "name": "Cảm biến nhiệt độ 115",
            "status": "ON"
          },
          {
            "_id": "5fc06f5fa91004001721b0b7",
            "datatype_id": "118",
            "data_id": 3078062,
            "value": -17.828750252499994,
            "name": "Cảm biến nhiệt độ 118",
            "status": "ON"
          },
          {
            "_id": "5fc06f5fa91004001721b0b8",
            "datatype_id": "117",
            "data_id": 3078063,
            "value": -17.11000061,
            "name": "Cảm biến nhiệt độ 117",
            "status": "ON"
          },
          {
            "_id": "5fc06f5fa91004001721b0b9",
            "datatype_id": "116",
            "data_id": 3078064,
            "value": -17.77000046,
            "name": "Cảm biến nhiệt độ 116",
            "status": "ON"
          }
    ];
    return (
        <>  
            <ConfigSensor config={modalConfig} toggle={()=>{setModalConfig({...modalConfig,show:!modalConfig.show})}}/>
            <Chart
                options={apexAreaChart2Opts}
                series={apexAreaChart2Data}
                type="heatmap"
                className="heatmap-charts"
                height={450}
            />

            <MySlice min={0} max={100} />

            <Row className="mb-2 mt-5">
                <Col sm={3}>
                    <h5>Danh sách cảm biến</h5>
                </Col>

                <Col sm={9}>
                    <div className="float-sm-right mt-3 mt-sm-0">
                        <UncontrolledButtonDropdown className="d-inline-block">
                            <DropdownToggle tag="button" className="btn btn-secondary btn-sm dropdown-toggle">
                                <i className="uil uil-filter"></i>{' '}
                                Tất cả
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>Tất cả</DropdownItem>
                                <DropdownItem className='text-success'>Đang chạy</DropdownItem>
                                <DropdownItem className='text-primary'>Đang bật</DropdownItem>
                                <DropdownItem className='text-warning'>Đang tắt</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </div>
                </Col>
            </Row>
            {sensors.map((sensor) => {
                return <SensorItem id={sensor._id} value={sensor.value} name={sensor.name} status={sensor.status} />;
            })}
        </>
    );
};

export default SensorMap;
