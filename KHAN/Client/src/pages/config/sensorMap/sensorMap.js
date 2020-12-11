import React from 'react';
import Chart from 'react-apexcharts';
import { DropdownMenu, DropdownToggle, UncontrolledButtonDropdown, DropdownItem, Row, Col, Card, CardBody, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import SensorItem from './sensorItem';
import ConfigSensor from './configSensor';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { getAreaData, getCubeData, getCurrentData, getSensorData } from 'redux/actions';
const PremiumSlider = (Slider.createSliderWithTooltip)(Slider);

const SensorMapController = (props) => {
    const min = props.min ? props.min : 0;
    const max = props.max ? props.max : 10;

    return  (
        <InputGroup className="col-12 mb-3 row">
            <InputGroupAddon addonType="prepend">Tọa độ Z</InputGroupAddon>
            <div className='form-control col-11 pt-2'>
                <PremiumSlider
                    step={1}
                    dots
                    className="mt-1"
                    min={min}
                    max={max}
                    value={props.value}
                    onChange={props.onChange}
                />
            </div>
            <Input
                className='col-1'
                type="number"
                value={props.value}
                onChange={(event) => {
                    let num = event.target.value;
                    let val = num >= min && num <= max ? num : num < min ? max : min;
                    props.onChange(val);
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
    const [BASE,SET_BASE] = React.useState(450);
    const [_z_, setZ] = React.useState(0);
    const [aData, setData] = React.useState(EMPTY);
    const [filter, setFilter] = React.useState('ALL');

    const CurrentRoomInfo = useSelector(state => state.RoomList.currentRoomInfo);
    const user = useSelector(state =>state.Auth.user);
    const sensors = useSelector(state =>state.RoomData.sensorData);
    const structure = useSelector(state =>state.RoomStructrure.structure);
    const loading = useSelector(state =>state.RoomStructrure.loading);
    const error = useSelector(state =>state.RoomStructrure.error);

    const dispatch = useDispatch();

    const [modalConfig,setModalConfig] = React.useState({x:0, y:0, z:0,d:10, show:false});
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
                            color: '#7f8c8d',
                        },

                        {
                            from: 1,
                            to: 1.99,
                            name: 'Đã thêm',
                            color: '#00A100',
                        },
                        {
                            from: 2,
                            to: 2.99,
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
                    setModalConfig({
                        ...modalConfig,
                        x:config.dataPointIndex,
                        y:config.seriesIndex,
                        show: true,
                    });
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


    React.useEffect(()=>{
        if (CurrentRoomInfo) {
            let {x, y, z} = CurrentRoomInfo.size;
            const unit = CurrentRoomInfo.sensorDensity;
            x = Math.trunc(x/unit);
            y = Math.trunc(y/unit);
            z = Math.trunc(z/unit);
            setMaxZ(z-1);

            const aBoard = new Array(y).fill(0).map(e => new Array(x).fill(0));
            if (parseInt(_z_) === 0 || parseInt(_z_) === z-1){
                aBoard[0][0] = 2;
                aBoard[0][x-1] = 2;
                aBoard[y-1][0] = 2;
                aBoard[y-1][x-1] = 2;
            }
            const aSensor = (structure && structure.map.map)?structure.map : []
            aSensor.forEach(e =>{
                if (parseInt(e.location.z) === parseInt(_z_))
                    aBoard[e.location.y][e.location.x] = 1;
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
        }
        
    },[_z_, CurrentRoomInfo, structure]); 

    React.useEffect(()=>{
        if(structure && CurrentRoomInfo && user){
            dispatch(getAreaData(user,CurrentRoomInfo._id));
            dispatch(getCurrentData(user,CurrentRoomInfo._id));
            dispatch(getSensorData(user,CurrentRoomInfo._id));
            dispatch(getCubeData(user,CurrentRoomInfo._id));
            
        }
    },[structure])

    const EditInfoSensor = (id) =>{
        if(CurrentRoomInfo && structure && structure.map.map){
            let a = structure.map.find(st=>(st.sensor._id ===id));
            console.log(a);
            if(a){
                setZ(a.location.z);
                setModalConfig(
                    {...modalConfig,
                        x:a.location.x,
                        y:a.location.y,
                        z:a.location.z,
                        show:true
                    }
                )
            }
        }
            
    }

    const [submitting,setSubmitting] = React.useState(false);

    React.useEffect(()=>{
        if(submitting && loading && error ==null){
            setModalConfig({...modalConfig,show: false});
            setSubmitting(false);
        }
    },[loading,error,submitting])

    

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
                        <ConfigSensor  
                            d={(CurrentRoomInfo)&& CurrentRoomInfo.sensorDensity} 
                            z={_z_} 
                            config={modalConfig} 
                            toggle={()=>{setModalConfig({...modalConfig,show:!modalConfig.show})}}
                            sensors={(sensors && sensors.datas) && sensors.datas}
                            structure={(structure && structure.map.map)?structure.map : []}
                            setSubmitting = {(value)=>{setSubmitting(value)}}
                            
                        />
                            <Chart
                                options={apexAreaChart2Opts}
                                series={aData}
                                type="heatmap"
                                className="heatmap-charts"
                                height={BASE}
                            />
                        <SensorMapController 
                            min={0} 
                            max={maxZ} 
                            value={_z_}
                            onChange={setZ}
                            />
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
                        {(sensors !=null) && (sensors.datas !=null) && sensors.datas.map((sensor,i) => {
                            if (filter!=="ALL" && sensor.status!==filter) return;
                            return <SensorItem EditInfoSensor={EditInfoSensor} id={sensor._id} value={sensor.value} name={sensor.name} status={Vietnamese_is_so_beautiful[sensor.status]} key={i}/>;
                        })}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default SensorMap;
