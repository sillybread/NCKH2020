import React from 'react';
import Chart from 'react-apexcharts';
import { DropdownMenu, DropdownToggle, UncontrolledButtonDropdown, DropdownItem, Row, Col, Card, CardBody, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import SensorItem from './sensorItem';
import ConfigSensor from './configSensor';
import { useSelector } from 'react-redux';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const PremiumSlider = (Slider.createSliderWithTooltip)(Slider);

const SensorMapController = (props) => {
    const min = props.min ? props.min : 0;
    const max = props.max ? props.max : 10;
    const [_val_, setValue] = React.useState(0);

    React.useEffect(() => {
        props.onChange(_val_);
    }, [_val_]);

    return  (
        <InputGroup className="col-12 mb-3 row">
            <InputGroupAddon addonType="prepend">Tọa độ Z</InputGroupAddon>
            <div className='form-control col-11 pt-2'>
                <PremiumSlider
                    className="mt-1"
                    min={min}
                    max={max}
                    value={_val_}
                    onChange={(v)=>{setValue(v)}}
                />
            </div>
            <Input
                className='col-1'
                type="number"
                value={_val_}
                onChange={(event) => {
                    let num = event.target.value;
                    let val = num >= min && num <= max ? num : num < min ? max : min;
                    setValue(val);
                }}
            />
        </InputGroup>
    )
}
SensorMapController.defaultProps = {
    onChange: (v) =>{}
}
const EMPTY = [[]];
const SensorMap = () => {
    const BASE = 450;
    const [_z_, setZ] = React.useState(0);
    const [aData, setData] = React.useState(EMPTY);
    const [filter, setFilter] = React.useState('ALL');
    const currRoom = useSelector(state => state.CurrentRoom);
    const sensors = useSelector(state =>state.RoomData.sensorData);
    const currData = useSelector(state =>state.RoomData.currentData);
    const [modalConfig,setModalConfig] = React.useState({x:0, y:0, z:0, show:false});
    const [maxZ, setMaxZ] = React.useState(0);
    const Vietnamese_is_so_beautiful = {
        ALL: "Tất cả",
        RUNNING: "Đang chạy",
        ON: "Đang bật",
        OFF: "Đang tắt"
    };

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
                            to: 0.99,
                            name: 'Trống',
                            color: '#fafafa',
                        },

                        {
                            from: 1,
                            to: 1.99,
                            name: 'Đang chạy',
                            color: '#00A100',
                        },
                        {
                            from: 2,
                            to: 2.99,
                            name: 'Đang tắt',
                            color: '#FFAA00',
                        },

                        {
                            from: 3,
                            to: 3.99,
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
            width: 1
        },
        chart: {
            animations: {
                enabled: false,
                easing: 'easeinout',
                speed: 1,
                animateGradually: {
                    enabled: false,
                    delay: 0
                },
                dynamicAnimation: {
                    enabled: false,
                    speed: 1
                }
            },
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
        //console.log(context.dataPointIndex,context.seriesIndex);
        setModalConfig({
            x:context.dataPointIndex,
            y:context.seriesIndex,
            z: modalConfig.z,
            show: true,
        });
    };

    React.useEffect(()=>{
        if (!currRoom.info || !sensors || !currData) return;
        let {x, y, z} = currRoom.info.size;
        const unit = currRoom.info.sensorDensity;
        x = Math.trunc(x/unit);
        y = Math.trunc(y/unit);
        z = Math.trunc(z/unit);
        setMaxZ(z-1);

        const aBoard = new Array(y).fill(0).map(e => new Array(x).fill(0));
        if (parseInt(_z_) === 0 || parseInt(_z_) === z-1){
            aBoard[0][0] = 3;
            aBoard[0][x-1] = 3;
            aBoard[y-1][0] = 3;
            aBoard[y-1][x-1] = 3;
        }
        const aSensor = currData.datas || [];
        aSensor.forEach(e =>{
            if (parseInt(e.z) === parseInt(_z_))
                aBoard[e.y][e.x] = (e.status === "RUNNING")?1:0;
        })
        setData(((aInput) => {
            const aRet = [];
            for (let idx=0; idx < aInput.length; idx++){
                const data = [];
                for (let jdx=0; jdx < aInput[idx].length; jdx++){
                    data.push([jdx, aInput[idx][jdx]]);
                }
                aRet.push({ name: idx, data});
            }
            return aRet;
        })(aBoard));
        //console.log(aBoard);
        setModalConfig({...modalConfig, z: _z_})
    },[_z_, currRoom.info, sensors, currData]);

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
                                series={aData}
                                type="heatmap"
                                className="heatmap-charts"
                                height={BASE}
                            />
                        <SensorMapController min={0} max={maxZ} onChange={setZ}/>
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
                                            <i className="uil uil-filter"/>{' '+ Vietnamese_is_so_beautiful[filter]}
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem onClick={()=>setFilter('ALL')}>{Vietnamese_is_so_beautiful.ALL}</DropdownItem>
                                            <DropdownItem onClick={()=>setFilter('RUNNING')} className='text-success'>{Vietnamese_is_so_beautiful.RUNNING}</DropdownItem>
                                            <DropdownItem onClick={()=>setFilter('ON')} className='text-primary'>{Vietnamese_is_so_beautiful.ON}</DropdownItem>
                                            <DropdownItem onClick={()=>setFilter('OFF')} className='text-warning'>{Vietnamese_is_so_beautiful.OFF}</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledButtonDropdown>
                                </div>
                            </Col>
                        </Row>
                        {(sensors !=null) && (sensors.data !=null) && sensors.data.map((sensor,i) => {
                            if (filter!=="ALL" && sensor.status!==filter) return;
                            return <SensorItem id={sensor._id} value={sensor.value} name={sensor.name} status={Vietnamese_is_so_beautiful[sensor.status]} key={i}/>;
                        })}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default SensorMap;
