import React from 'react';
//import { Step, Steps, Wizard } from 'react-albus';
import { CardBody, Col, Card, Button, Row, CustomInput, Label } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import dinhhuong from 'assets/images/dinhhuong.svg'
import AvRadio from 'availity-reactstrap-validation/lib/AvRadio';
import AvRadioGroup from 'availity-reactstrap-validation/lib/AvRadioGroup';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import ConfirmDialog from 'components/ConfirmDialog';

const WareHouseConfig=(props)=>{
    const [name,setName] = React.useState('Kho lạnh ..');
    const [description,setDescription] = React.useState('');
    const [size,setSize] = React.useState({x:500,y:200,z:200});
    const [sensorDensity,setSensorDensity] = React.useState(10);
    const [door,setDoor] = React.useState({show:false,direction: "B"});
    const [modalDelete,setModalDelete]= React.useState(false);


    return (
        <React.Fragment>
            <Row className="page-title align-items-center">
            <Col xs={12}>
                    <h4 className="mb-1 mt-0">Thông tin cấu hình kho lạnh</h4>
            </ Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Card className="mb-5">
                        <CardBody>
                        <AvForm className="p-2">
                            <Row>
                                <Col md={6}>
                                    <AvField
                                        name="name"
                                        value={name}
                                        label="Tên kho lạnh"
                                        type="text"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Vui lòng điền tên kho lạnh',
                                            },
                                        }}
                                    />

                                    <AvField name="description" label="Mô tả" type="text" value={description} />
                                    
                                    <AvGroup>
                                        <Label for="direction">Chọn vị trí cửa:</Label>
                                        <Row>
                                            <Col sm={4}>
                                                <AvRadioGroup
                                                    name="direction" 
                                                    value={door.direction} 
                                                    required 
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
                                    <AvField disabled name="x" label="Chiều dài (hướng X)" type="number" min={10} step={10} required value={size.x}/>
                                    <AvField disabled name="y" label="Chiều rộng (hướng Y)" type="number" min={10} step={10} required value={size.y} />
                                    <AvField disabled name="z" label="Chiều cao (hướng Z)" type="number" min={10} step={10} required value={size.z} />
                                    <AvField disabled name="sensorDensity" label="Khoảng cách cảm biến" type="number" min={10} step={10} value={sensorDensity} required />
                                    <p className="text-warning">Đơn vị đo: cm</p>
                                    <ul className="list-inline wizard mt-5 mb-0">
                                        <li className="next list-inline-item float-right">
                                            <Button  className="mr-3" color='outline-danger' onClick={()=>{setModalDelete(!modalDelete)}}>
                                                <i className="uil uil-exclamation-triangle mr-1"></i>
                                                Xóa kho
                                            </Button>
                                            <Button  color="outline-primary" type="submit">
                                                <i className="uil uil-check mr-1"></i>
                                                Lưu thay đổi
                                            </Button>
                                        </li>
                                    </ul>   
                                </Col>
                            </Row>
                            <ConfirmDialog 
                                title="Xác nhận xóa toàn bộ kho lạnh"
                                content={'Kho lạnh CTU'} 
                                color='danger' 
                                isOpen={modalDelete} 
                                toggle={()=>{setModalDelete(!modalDelete)}} 
                                confirm={()=>{}}>
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