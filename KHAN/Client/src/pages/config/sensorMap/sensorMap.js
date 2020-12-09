import React from 'react';
import Chart from 'react-apexcharts';
import { DropdownMenu, DropdownToggle, UncontrolledButtonDropdown, DropdownItem, Row, Col, Card, CardBody } from 'reactstrap';
import MySlice from 'components/MySlice';
import SensorItem from './sensorItem';
import ConfigSensor from './configSensor';
import { useSelector } from 'react-redux';

const demoMap = [
    [0, 0, 0, 0],
    [1, 3, 3, 1],
    [1, 2, 2, 1],
    [1, 1, 1, 1],
];

const SensorMap = () => {
    const sensors = useSelector(state =>state.RoomData.sensorData)
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
                            from: 0,
                            to: 1,
                            name: 'Trống',
                            color: '#fafafa',
                        },

                        {
                            from: 2,
                            to: 3,
                            name: 'Đang chạy',
                            color: '#00A100',
                        },
                        {
                            from: 4,
                            to: 5,
                            name: 'Đang tắt',
                            color: '#FFAA00',
                        },

                        {
                            from: 6,
                            to: 7,
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
                min: 0,
                max: 7,
            }),
        },
        {
            name: '1',
            data: generateData(20, {
                min: 0,
                max: 7,
            }),
        },
        {
            name: '2',
            data: generateData(20, {
                min: 0,
                max: 7,
            }),
        },
        {
            name: '3',
            data: generateData(20, {
                min: 0,
                max: 7,
            }),
        },
        {
            name: '4',
            data: generateData(20, {
                min: 0,
                max: 7,
            }),
        },
        {
            name: '5',
            data: generateData(20, {
                min: 0,
                max: 7,
            }),
        },
        {
            name: '6',
            data: generateData(20, {
                min: 0,
                max: 7,
            }),
        },
        {
            name: '7',
            data: generateData(20, {
                min: 0,
                max: 7,
            }),
        },
        {
            name: '8',
            data: generateData(20, {
                min: 0,
                max: 7,
            }),
        },
    ];
    
    return (
        <React.Fragment>
            <Row className="page-title align-items-center">
            <Col xs={12}>
                    <h4 className="mb-1 mt-0">Quản lý mạng cảm biến</h4>
            </ Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Card className="mb-5">
                        <CardBody>
                        <ConfigSensor config={modalConfig} toggle={()=>{setModalConfig({...modalConfig,show:!modalConfig.show})}}/>
                        <Chart
                            options={apexAreaChart2Opts}
                            series={apexAreaChart2Data}
                            type="heatmap"
                            className="heatmap-charts"
                            height={450}
                        />

                        <MySlice min={0} max={100} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
     
            <Row>
                <Col xs={12}>
                    <Card className="mb-5">
                        <CardBody>
                        <Row className="mb-2">
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
                        {(sensors !=null)&& (sensors.data !=null) && sensors.data.map((sensor,i) => {
                            return <SensorItem id={sensor._id} value={sensor.value} name={sensor.name} status={sensor.status} key={i}/>;
                        })}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default SensorMap;
