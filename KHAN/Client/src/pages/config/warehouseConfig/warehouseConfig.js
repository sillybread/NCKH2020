import React, { useEffect } from 'react';
//import { Step, Steps, Wizard } from 'react-albus';
import { CardBody, Col, Card, Button, Row, CustomInput, Label } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import dinhhuong from 'assets/images/dinhhuong.svg'
import AvRadio from 'availity-reactstrap-validation/lib/AvRadio';
import AvRadioGroup from 'availity-reactstrap-validation/lib/AvRadioGroup';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import ConfirmDialog from 'components/ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoom, updateRoom } from 'redux/actions';
import Loader from 'components/Loader';

const WareHouseConfig=(props)=>{
    const [name,setName] = React.useState('');
    const [description,setDescription] = React.useState('');
    const [size,setSize] = React.useState({x:0,y:0,z:0});
    const [sensorDensity,setSensorDensity] = React.useState(10);
    const [door,setDoor] = React.useState({show:false,direction: "B"});
    const [modalDelete,setModalDelete]= React.useState(false);
    const currentRoom = useSelector(state => state.CurrentRoom);
    const [edited,setEdited] = React.useState(false);
    const [isEmptySensor,setEmptySensor] = React.useState(false);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.Auth);
    const loading = useSelector(state=> state.RoomList.loading);



    useEffect(()=>{
        if(currentRoom && currentRoom.sensorMap)
            setEmptySensor(currentRoom.sensorMap.length ==0); 
    },[currentRoom.sensorMap])

    useEffect(()=>{
        if(currentRoom && currentRoom.info){
            setName(currentRoom.info.name);
            setDescription(currentRoom.info.description);
            setSize(currentRoom.info.size);
            setSensorDensity(currentRoom.info.sensorDensity);
            setDoor(currentRoom.info.door);
            setEdited(false);
        }
    },[currentRoom.info])
    useEffect(()=>{
        if(currentRoom && currentRoom.info){
            setEdited(currentRoom.info.name != name ||
                 currentRoom.info.description != description ||
                  currentRoom.info.door.show != door.show  ||
                  currentRoom.info.door.direction != door.direction  ||
                   currentRoom.info.size.x != size.x ||
                   currentRoom.info.size.y != size.y ||
                   currentRoom.info.size.z != size.z ||
                   currentRoom.info.sensorDensity != sensorDensity);
        }       
    },[currentRoom.info,name,description,door,size,sensorDensity])

    return (
        <React.Fragment>
             
            <Row className="page-title align-items-center">
            {loading && <Loader />}
            <Col xs={12}>
                    <h4 className="mb-1 mt-0">Thông tin cấu hình kho lạnh</h4>
            </ Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Card className="mb-5">
                        <CardBody>
                       
                        <AvForm className="p-2"
                            onSubmit={()=>{
                                setEdited(false);
                                dispatch(updateRoom(auth.user,currentRoom.info._id,{name,description,size,sensorDensity,door}));
                            }
                        }
                        >
                            <Row>
                                <Col md={6}>
                                    <AvField
                                        name="name"
                                        value={name}
                                        onChange={(prevValue,nextValue) =>{setName(nextValue)}}
                                        label="Tên kho lạnh"
                                        type="text"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Vui lòng điền tên kho lạnh',
                                            },
                                        }}
                                    />

                                    <AvField 
                                        name="description" 
                                        label="Mô tả" type="text" 
                                        value={description} 
                                        onChange={(prevValue,nextValue) =>{setDescription(nextValue)}}
                                    />
                                    
                                    <AvGroup>
                                        <Label for="direction">Chọn vị trí cửa:</Label>
                                        <Row>
                                            <Col sm={4}>
                                                <AvRadioGroup
                                                    name="direction" 
                                                    value={door.direction} 
                                                    required 
                                                    onChange={(prevValue,nextValue) =>{
                                                        setDoor({
                                                            direction: nextValue,
                                                            show: door.show
                                                        })
                                                    }}
                                                >
                                                <AvRadio className='mt-3 mb-3' customInput label="Hướng A" value="A" />
                                                <AvRadio className='mt-3 mb-3' customInput label="Hướng B" value="B" />
                                                <AvRadio className='mt-3 mb-3' customInput label="Hướng C" value="C" />
                                                <AvRadio className='mt-3 mb-3' customInput label="Hướng D" value="D" />
                                                </AvRadioGroup>
                                            </Col>
                                            <Col sm={8}>
                                                <img src={dinhhuong} className='w-100' alt=""/>
                                            </Col>
                                        </Row>
                                    </AvGroup>
                                    
                                    <AvGroup>
                                        <Label for="show_btn">Hiển thị cửa</Label>
                                        <CustomInput
                                        type="switch"
                                        id="show_btn"
                                        name="show_door"
                                        checked={door.show}
                                        onChange={()=>{
                                            setDoor({
                                                direction: door.direction,
                                                show: !door.show
                                            })
                                        }}
                                        />                                           
                                        
                                    </AvGroup>
                                    
                                </Col>
                                <Col md={6}>
                                    <AvField 
                                        disabled={!isEmptySensor} 
                                        onChange={(prevValue,nextValue) =>{setSize(
                                            {
                                                ...size, x: nextValue
                                            }
                                        )}} 
                                        name="x" label="Chiều dài (hướng X)" 
                                        type="number" 
                                        min={10} 
                                        step={10} 
                                        required 
                                        value={size.x}
                                    />
                                    <AvField 
                                        disabled={!isEmptySensor} 
                                        onChange={(prevValue,nextValue) =>{setSize(
                                            {
                                                ...size, y: nextValue
                                            }
                                        )}} 
                                        name='y'
                                        label="Chiều rộng (hướng Y)" 
                                        type="number" 
                                        min={10} 
                                        step={10} 
                                        required 
                                        value={size.y} 
                                    />
                                    <AvField 
                                        disabled={!isEmptySensor} 
                                        onChange={(prevValue,nextValue) =>{setSize(
                                            {
                                                ...size, z: nextValue
                                            }
                                        )}} 
                                        label="Chiều cao (hướng Z)" 
                                        type="number" 
                                        name='z'
                                        min={10} 
                                        step={10} 
                                        required 
                                        value={size.z} 
                                    />
                                    <AvField 
                                        disabled={!isEmptySensor} 
                                        onChange={(prevValue,nextValue) =>{setSensorDensity(nextValue)}} 
                                        name="sensorDensity" 
                                        label="Khoảng cách cảm biến" 
                                        type="number" 
                                        min={10} 
                                        step={10} 
                                        value={sensorDensity} 
                                        required 
                                    />
                                    <p className="text-warning">Đơn vị đo: cm</p>
                                    <ul className="list-inline wizard mt-5 mb-0">
                                        <li className="next list-inline-item float-right">
                                            <Button  className="mr-3" color='outline-danger' onClick={()=>{setModalDelete(!modalDelete)}}>
                                                <i className="uil uil-exclamation-triangle mr-1"></i>
                                                Xóa kho
                                            </Button>
                                        <Button disabled={!edited} color="outline-primary" type="submit">
                                                <i className="uil uil-check mr-1"></i>
                                                Lưu thay đổi
                                            </Button>
                                        </li>
                                    </ul>   
                                </Col>
                            </Row>
                            <ConfirmDialog 
                                title="Xác nhận xóa toàn bộ kho lạnh"
                                content={(currentRoom && currentRoom.info && currentRoom.info.name)&& currentRoom.info.name} 
                                color='danger' 
                                isOpen={modalDelete} 
                                toggle={()=>{setModalDelete(!modalDelete)}} 
                                confirm={()=>{
                                    dispatch(deleteRoom(auth.user,currentRoom.info._id));
                                    setModalDelete(!modalDelete);
                                }}>
                            </ConfirmDialog>
                        </AvForm>
                            
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
};
export default WareHouseConfig;