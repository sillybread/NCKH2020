import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import AvInput from 'availity-reactstrap-validation/lib/AvInput';
import React from 'react';
import Select from 'react-select';
import { Col, Modal, ModalHeader, ModalBody, ModalFooter, Row, Label, InputGroupAddon, Media} from 'reactstrap';
import sensorimg from 'assets/icons/Devices/CPU1.svg'
import sensor3img from 'assets/icons/Devices/CPU3.svg'


//import {Wizard, Steps,Step} from 'react-albus';
const sensors = [
    {
      "name": "Cảm biến nhiệt độ 101",
      "isUsed": true,
      "_id": "5fc06f5fa91004001721b0a8",
      "data_id": 3078047,
      "datatype_id": "101"
    },
    {
      "name": "Cảm biến nhiệt độ 102",
      "isUsed": false,
      "_id": "5fc06f5fa91004001721b0a9",
      "data_id": 3078048,
      "datatype_id": "102"
    },
    {
      "name": "Cảm biến nhiệt độ 103",
      "isUsed": false,
      "_id": "5fc06f5fa91004001721b0aa",
      "data_id": 3078049,
      "datatype_id": "103"
    },
    {
      "name": "Cảm biến nhiệt độ 104",
      "isUsed": false,
      "_id": "5fc06f5fa91004001721b0ab",
      "data_id": 3078050,
      "datatype_id": "104"
    },
    {
      "name": "Cảm biến nhiệt độ 105",
      "isUsed": false,
      "_id": "5fc06f5fa91004001721b0ac",
      "data_id": 3078051,
      "datatype_id": "105"
    },
    {
      "name": "Cảm biến nhiệt độ 106",
      "isUsed": false,
      "_id": "5fc06f5fa91004001721b0ad",
      "data_id": 3078052,
      "datatype_id": "106"
    },
    {
      "name": "Cảm biến nhiệt độ 107",
      "isUsed": false,
      "_id": "5fc06f5fa91004001721b0ae",
      "data_id": 3078053,
      "datatype_id": "107"
    },
    {
      "name": "Cảm biến nhiệt độ 112",
      "isUsed": false,
      "_id": "5fc06f5fa91004001721b0af",
      "data_id": 3078054,
      "datatype_id": "112"
    },
    {
      "name": "Cảm biến nhiệt độ 108",
      "isUsed": false,
      "_id": "5fc06f5fa91004001721b0b0",
      "data_id": 3078055,
      "datatype_id": "108"
    },
    {
      "name": "Cảm biến nhiệt độ 109",
      "isUsed": false,
      "_id": "5fc06f5fa91004001721b0b1",
      "data_id": 3078056,
      "datatype_id": "109"
    },
    {
      "name": "Cảm biến nhiệt độ 110",
      "isUsed": false,
      "_id": "5fc06f5fa91004001721b0b2",
      "data_id": 3078057,
      "datatype_id": "110"
    },
    {
      "name": "Cảm biến nhiệt độ 111",
      "isUsed": false,
      "_id": "5fc06f5fa91004001721b0b3",
      "data_id": 3078058,
      "datatype_id": "111"
    },
    {
      "name": "Cảm biến nhiệt độ 114",
      "isUsed": false,
      "_id": "5fc06f5fa91004001721b0b4",
      "data_id": 3078059,
      "datatype_id": "114"
    },
    {
      "name": "Cảm biến nhiệt độ 113",
      "isUsed": false,
      "_id": "5fc06f5fa91004001721b0b5",
      "data_id": 3078060,
      "datatype_id": "113"
    },
    {
      "name": "Cảm biến nhiệt độ 115",
      "isUsed": false,
      "_id": "5fc06f5fa91004001721b0b6",
      "data_id": 3078061,
      "datatype_id": "115"
    },
    {
      "name": "Cảm biến nhiệt độ 118",
      "isUsed": false,
      "_id": "5fc06f5fa91004001721b0b7",
      "data_id": 3078062,
      "datatype_id": "118"
    },
    {
      "name": "Cảm biến nhiệt độ 117",
      "isUsed": false,
      "_id": "5fc06f5fa91004001721b0b8",
      "data_id": 3078063,
      "datatype_id": "117"
    },
    {
      "name": "Cảm biến nhiệt độ 116",
      "isUsed": false,
      "_id": "5fc06f5fa91004001721b0b9",
      "data_id": 3078064,
      "datatype_id": "116"
    }
  ]


const ConfigSensor = (props) => {



    const geSensorsOption = (sensors =[])=>{
        return sensors.map(sensor=>{
            return  { value: sensor._id, 
                    label:
                    <Media className='pt-1'>
                        <img src={(!sensor.isUsed)?sensorimg:sensor3img} className='avatar rounded mr-2' alt=""/>                        
                        <Media body>
                            <h6 className='mt-1 mb-0 font-size-15' >{sensor.name}</h6>
                            <h6 className="text-muted font-weight-normal mt-1">{sensor.datatype_id}</h6>
                        </Media>
                    </Media> 
                }
            }
        );
    }
    
        return (
        <Modal isOpen={props.config.show} toggle={props.toggle}>
        <AvForm>
        <ModalHeader>Thông tin vị trí</ModalHeader>
        <ModalBody className="px-3">
            <Row>
            <Col>
                <Label for="vitri">Tọa độ</Label>
                <AvGroup id='vitri'>
                    <div className="input-group">
                        <div class="input-group-prepend text-danger"><span class="input-group-text text-danger font-weight-bold">X</span></div>
                        <AvInput name="x" disabled value={(props.config.x ==0)?'0':props.config.x}/>
                    </div>
                </AvGroup>
                <AvGroup>
                    <div className="input-group">
                        <div class="input-group-prepend text-danger"><span class="input-group-text text-success font-weight-bold">Y</span></div>
                        <AvInput name="y" disabled value={(props.config.y ==0)?'0':props.config.y} />
                    </div>
                </AvGroup>
                <AvGroup>
                    <div className="input-group">
                        <div class="input-group-prepend text-danger"><span class="input-group-text text-primary font-weight-bold">Z</span></div>
                        <AvInput name="z" disabled value={(props.config.z ==0)?'0':props.config.z}/>
                    </div>
                </AvGroup>
                
            </Col>
          
            <Col>
            <Label for="khoangchach">Khoảng cách đến trục</Label>
                <AvGroup id='khoangchach'>
                    <div className="input-group">
                       
                        <AvInput disabled name="dx" value={(props.config.x ==0)?'0':props.config.x*10} />
                        <InputGroupAddon addonType="append" >
                            cm
                        </InputGroupAddon>
                    </div>
                </AvGroup>
                <AvGroup>
                    <div className="input-group">
                        <AvInput disabled name="dy" value={(props.config.y ==0)?'0':props.config.y*10} />
                        <InputGroupAddon addonType="append" >
                            cm
                        </InputGroupAddon>
                    </div>
                </AvGroup>
                <AvGroup>
                    <div className="input-group">
        
                        <AvInput disabled name="dz" value={(props.config.z ==0)?'0':props.config.z*10} />
                        <InputGroupAddon addonType="append" >
                            cm
                        </InputGroupAddon>
                    </div>
                </AvGroup>

            </Col>
            </Row>
            <Row>
            <Col>
            <Label for="choncambien">Chọn cảm biến</Label>
            <Select
                height={100}
                id='choncambien'
                className="react-select"
                classNamePrefix="react-select"
                options = {geSensorsOption(sensors)}
                styles={{
                control: base => ({
                    ...base,
                    height: 70,
                    minHeight: 70
                }),
                valueContainer: (provided, state) => ({
                    ...provided,
                    height: '70px',
                    padding: '5px 5px'
                    })
                  }}
                >
            </Select>  
            </Col>
            </Row>
        </ModalBody>
        <ModalFooter className="text-right">
    
            <button disabled type="button" className ='btn btn-danger'>
                <i className ='uil uil-trash-alt mr-1'> </i>
                Gỡ cảm biên
            </button>
            <button disabled type="button" className ='btn btn-warning' >
                <i className ='uil uil-wrench mr-1' > </i>
                Đổi cảm biến
            </button>
            <button disabled type="button" className ='btn btn-success' >
                <i className ='uil uil-plus mr-1 mr-1' > </i>
                Thêm cảm biến
            </button>
   
        </ModalFooter>
        </AvForm>
        </Modal>
    );
};



export default ConfigSensor;