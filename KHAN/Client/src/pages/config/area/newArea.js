import React from 'react';
import { Modal ,ModalHeader,CardBody, ModalFooter, Card, Button, Label, Media, CustomInput, Col, Row} from 'reactstrap';
import { AvForm, AvGroup} from 'availity-reactstrap-validation';
import Select from 'react-select';
import Loader from 'components/Loader';
import AvInput from 'availity-reactstrap-validation/lib/AvInput';
import AvField from 'availity-reactstrap-validation/lib/AvField';



const NewArea=(props)=>{
    const [loading,setLoading] = React.useState(false);
    return (
        <Modal isOpen={props.isOpen} toggle={props.toggleOpen}>
            {loading && <Loader />}
            <AvForm>
            <ModalHeader >
                Thêm khu vực mới
            </ModalHeader>
            <Card className='shadow-none'>
                <CardBody>
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
                            id="monitorNoti"
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
                            id="emailNoti"
                            name="emailOn"
                            onChange={()=>{}}
                            checked={true}
                        />                                           
                    </AvGroup>
                </Col>
                </Row>                        
                </CardBody>
            </Card>
            <ModalFooter>
                <Button  type='submit' disabled color='primary'>
                    Thêm
                </Button>
                <Button  type='button' disabled color='secondary'>
                    Hủy
                </Button>
            </ModalFooter>
            </AvForm>
        </Modal>
        
    );
};
export default NewArea;