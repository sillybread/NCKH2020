import AvField from 'availity-reactstrap-validation/lib/AvField';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import AvInput from 'availity-reactstrap-validation/lib/AvInput';
import TChart from 'components/3DChart/3DChart';
import React from 'react';
import { ChevronDown } from 'react-feather';
import Flatpickr from 'react-flatpickr'
import 'rc-slider/assets/index.css';
import Slider  from 'rc-slider';

import { Button, Card, CardBody, CardHeader, Col, CustomInput, DropdownItem, DropdownMenu, DropdownToggle, Label, Row, UncontrolledButtonDropdown } from 'reactstrap';
import NewArea from './newArea';


const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);


const AreaConfig = (props)=>{
    const [data,setData]= React.useState(null);
    const [config,setConfig] = React.useState(
        {
        "size": {
            "x": 53,
            "y": 22,
            "z": 25,
            "tilesize": 5
        },
        "door": {
            "show": true,
            "direction": "C"//"4 hướng là 4 cạnh của hình chữ nhật có thể đánh dấu A B C D"
        },
        "axis-labels": {
            "axis-x": {
            "show": true,
            "list": [0,13,26,53]
            },
            "axis-y": {
            "show": true,
            "list": [22,10]
            },
            "axis-z": {
            "show": true,
            "list": [23,12,18]
            }
        }
        }
    );
    const [slice,setSlice] = React.useState(
        {
            origin: {
                x:10,
                y:10,
                z:10,
            },
            destination: {
                x:20,
                y:20,
                z:20
            }
        }
    );
    const [newModal,setNewModal] = React.useState(false);
    const toggleNewModal = ()=>{
        setNewModal(!newModal);
    }

    return (
        <React.Fragment>
            <NewArea isOpen={newModal} toggleOpen={toggleNewModal}>

            </NewArea>
            <Row className="page-title align-items-center">
            <Col xs={12}>
                    <h4 className="mb-1 mt-0">Quản lý khu vực giám sát nhiệt độ</h4>
            </ Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Card className="mb-5">
                        <CardBody>
                        <Row>
                            <Col md={6}>
                                <TChart  config={config} data={data} slice={slice}/>
                            </Col>
                            <Col md={6}>
                                <Card className='shadow-none p-0'>
                                    <CardHeader className='text-right bg-transparent p-0'>
                                        <UncontrolledButtonDropdown>
                                            <DropdownToggle color="default" className="dropdown-toggle text-dark font-weight-bold " >
                                                {'Khu vực cá tra'}
                                                <i className="icon ml-1"><ChevronDown /></i>
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                <DropdownItem >
                                                    <span>{'Khu vực cá'}</span>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem className="text-success" 
                                                    onClick={toggleNewModal}
                                                    >
                                                    <i className="uil uil-plus mr-1"></i>
                                                        Tạo khu vực mới
                                                </DropdownItem>     
                                            </DropdownMenu>
                                        </UncontrolledButtonDropdown>  
                                    </CardHeader>
                                    <CardBody className='p-0'>
                                        <AvForm>
                                            <AvField
                                                name="name"
                                                label="Tên khu vực"
                                                type="text"
                                                validate={{
                                                    required: {
                                                        value: true,
                                                        errorMessage: 'Vui lòng điền tên kho lạnh',
                                                    },
                                                }}
                                            />
                                            <Row>
                                            <Col>
                                                <Label for="min">Tọa độ nhỏ nhất</Label>
                                                <AvGroup id='min'>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend text-danger"><span className="input-group-text text-danger font-weight-bold">X<small className='mt-1'>max</small></span></div>
                                                        <AvInput name="x0"  type='number' min={0} max={50} value={5}/>
                                                    </div>
                                                </AvGroup>
                                                <AvGroup>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend text-danger"><span className="input-group-text text-success font-weight-bold">Y<small className='mt-1'>max</small></span></div>
                                                        <AvInput name="y0"  type='number' min={0} max={50} value={6} />
                                                    </div>
                                                </AvGroup>
                                                <AvGroup>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend text-danger"><span className="input-group-text text-primary font-weight-bold">Z<small className='mt-1'>max</small></span></div>
                                                        <AvInput name="z0"  type='number' min={0} max={50} value={7}/>
                                                    </div>
                                                </AvGroup>
                                                <AvGroup>
                                                    <Label for="monitorNoti">Bật thông báo ứng dụng</Label>
                                                    <CustomInput
                                                        type="switch"
                                                        id="configmonitorNoti"
                                                        name="monitorOn"
                                                        onChange={()=>{}}
                                                    />                                           
                                                </AvGroup>
                                            </Col>
                                        
                                            <Col>
                                            <Label for="max">Tọa độ lớn nhất</Label>
                                                <AvGroup id='max'>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend text-danger"><span className="input-group-text text-danger font-weight-bold">X<small className='mt-1'>min</small></span></div>
                                                        <AvInput name="x1"  type='number' min={0} max={50} value={15}/>
                                                    </div>
                                                </AvGroup>
                                                <AvGroup>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend text-danger"><span className="input-group-text text-success font-weight-bold">Y<small className='mt-1'>min</small></span></div>
                                                        <AvInput name="y1"  type='number' min={0} max={50} value={16} />
                                                    </div>
                                                </AvGroup>
                                                <AvGroup>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend text-danger"><span className="input-group-text text-primary font-weight-bold">Z<small className='mt-1'>min</small></span></div>
                                                        <AvInput name="z1"  type='number' min={0} max={50} value={17}/>
                                                    </div>
                                                </AvGroup>
                                                <AvGroup>
                                                    <Label for="emailNoti">Bật thông báo email</Label>
                                                    <CustomInput
                                                        type="switch"
                                                        id="confignotiEmail"
                                                        name="emailOn"
                                                        onChange={()=>{}}
                                                        checked={true}
                                                    />                                           
                                                </AvGroup>
                                            </Col>
                                            </Row>
                                            <div className='text-right'>
                                                <Button  type='submit' disabled color='outline-primary'>
                                                    <i className="uil uil-check mr-1"></i>
                                                    Lưu thay đổi
                                                </Button>
                                            </div>
                                        </AvForm>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row> 
                        </CardBody>
                    </Card>
                </Col>
            </Row>


       {/*  --------------------------------------------------------------- */}


            <Row>
                <Col xs={12}>
                    <Card className="mb-5">
                        <CardBody>
                        <Row className='mt-4'>
                            <Col sm={7}>
                                <h5>Danh sách thời gian và nhiệt độ giám sát</h5>
                            </Col>
                            <Col sm={5} className='text-right mb-4'>
                                <Button color='secondary' size='sm'>
                                    <i className="uil uil-plus mr-1"></i>
                                    Thêm khung thời gian
                                </Button>
                            </Col>
                        </Row>
                        <Monitor></Monitor>
                        <Monitor></Monitor>
                        <Monitor></Monitor>
                        </CardBody>
                    </Card>
                </Col>
            </Row>



        </React.Fragment>

        

    );
}


const Monitor = (props) => {
    return (
        <Card className="border mb-3 ">
        <CardBody>
            <Row>
            <Col className='my-1' md={4}  xl={2}>
                <div className="input-group">
                    <div className="input-group-prepend text-danger"><span className="input-group-text">Giám sát</span></div>
                    <div className='form-control'>
                        <CustomInput     
                            type="switch"
                            name="sad"
                            id='laksln'
                            onChange={()=>{}}
                        />   
                    </div>              
                </div>
            </Col>
            <Col className='my-1'md={8} xl={3} >
                <div className="input-group">
                    <div className="input-group-prepend text-danger"><span className="input-group-text">Thời gian</span></div>
                        <Flatpickr value={new Date()}  options={{enableTime: true, noCalendar: true, dateFormat: "H:i",  time_24hr: true}}
                            onChange={date => { console.log(date) }}
                            className='form-control'
                        />
                        <Flatpickr value={new Date()}  options={{enableTime: true, noCalendar: true, dateFormat: "H:i",  time_24hr: true}}
                            onChange={date => { console.log(date) }}
                            className='form-control'
                        />
                </div>
            </Col>
            <Col className='my-1' md={12}  xl={6}>
                <div className="input-group">
                    <div className="input-group-prepend text-danger"><span className="input-group-text">Nhiệt độ</span></div>
                    <div className='form-control pt-2 col-8'>
                        <Range className='mt-1' defaultValue={[-180,-101]} min={-250} max={200} tipFormatter={value=>(value/10+' °C')}/>
                    </div>
                    <input className='form-control col-2' type='number' value={-12}/>
                    <input className='form-control col-2' type='number' value={-1}/>         
                </div>
            </Col>
            <Col className='my-1 text-right' md={12}  xl={1}>
                <Button className=" p-0 cursor-pointer mt-2" color='outline-success'
                    >
                        <i className="uil uil-check mx-1"></i>
                </Button>
                <Button className=" p-0 cursor-pointer mt-2 ml-1" color='outline-danger'
                >
                    <i className="uil uil-trash mx-1"></i>
                </Button>
            </Col>
            
        </Row>
        </CardBody>
    </Card>
    );
}

export default AreaConfig;