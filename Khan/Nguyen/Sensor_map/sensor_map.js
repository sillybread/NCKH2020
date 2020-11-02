import React from 'react';
import Select from 'react-select';
import { Col,Card,CardBody,FormGroup} from 'reactstrap';
//import {Wizard, Steps,Step} from 'react-albus';



const Sensormap = () => {
    const selectList=[
        {
            value:"them",
            color: "btn btn-primary mr-4 mb-3  mb-sm-0",
            icon: "uil-plus mr-1",
            title:"Thêm"
        },
        {
            value: "sua",
            color: "btn btn-warning mr-4 mb-3  mb-sm-0",
            icon: "uil-wrench mr-1",
            title: "Sửa"
        },
        {
            value: "xoa",
            color: "btn btn-danger mr-4 mb-3  mb-sm-0",
            icon: "uil-trash-alt mr-1",
            title: "Xóa"
        }
    ]
    const selectedIndex = 1;
        return (
        <Card className="mt-3">
            <CardBody>
                <h2 className="mt-0 mb-4"> Thông tin cảm biến </h2>
                <FormGroup row>
                    <Col md={6}>
                        <h5 className="font-weight-bold mt-0 mb-4">
                            Tên:
                            <span className="font-weight-normal">{' Cảm biến 1'}</span>
                        </h5>
                        <h5 className="font-weight-bold mt-0 mb-4">Vị trí ô:</h5>
                        <h6 className=" text-danger sub-header">
                            X:
                            <span className="font-weight-normal text-dark">{' 1'}</span>
                        </h6>
                        <h6 className="sub-header text-success">
                            Y:
                            <span className="font-weight-normal text-dark">{' 1'}</span>
                        </h6>
                        <h6 className="sub-header text-primary">
                            Z:
                            <span className="font-weight-normal text-dark">{' 1'}</span>
                        </h6>
                    </Col>
                    <Col md={6}>
                        <h5 className="font-weight-bold mt-0 mb-4">
                            Mã:
                            <span className="font-weight-normal">{' ss001'}</span>
                        </h5>
                        <h5 className="font-weight-bold mt-0 mb-4">Khoản cách với góc tọa độ:</h5>
                        <h6 className=" text-danger sub-header">
                            X:
                            <span className="font-weight-normal text-dark">{' 10'}cm</span>
                        </h6>
                        <h6 className="sub-header text-success">
                            Y:
                            <span className="font-weight-normal text-dark">{' 10'}cm</span>
                        </h6>
                        <h6 className="sub-header text-primary">
                            Z:
                            <span className="font-weight-normal text-dark">{' 10'}cm</span>
                        </h6>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    < Col sm ={6} xl = {4} >
                            <Select  
                                className = "react-select bg-white mb-1"  
                                classNamePrefix = "react-select"
                                defaultValue = {
                                    {
                                        value: 'them',
                                        label: 'Thêm'
                                    }
                                }
                                options = {
                                        [{
                                                value: 'them',
                                                label: 'Thêm'
                                            },
                                            {
                                                value: 'sua',
                                                label: 'Sửa'
                                            },
                                            {
                                                value: 'xoa',
                                                label: 'Xóa'
                                            },
                                            
                                        ]
                                    } > 
                            </Select> 
                        </Col>
                        < Col sm = { 6 } xl = {8} >
                            < Select
                                className = "react-select bg-white mb-1"
                                classNamePrefix = "react-select"
                                defaultValue = {
                                        {
                                            value: '',
                                            label: 'Chọn cảm biến'
                                        }}
                                options = {
                                        [{
                                                value: 'ss0001',
                                                label: 'ss0001'
                                            },
                                            {
                                                value: 'ss0002',
                                                label: 'ss0002'
                                            },
                                            {
                                                value: 'ss0003',
                                                label: 'ss0003'
                                            },
                                        ]
                                    } >
                            </Select>  
                        </Col>
                </FormGroup>
                <div>
                    < ul className = "list-inline wizard mb-0" >
                        <li className = "next list-inline-item float-right" >
                            < button type = "button" className = {selectList[selectedIndex].color}  >
                                < i className = {selectList[selectedIndex].icon} > </i>
                                {selectList[selectedIndex].title}
                            </button>
                        </li> 
                    </ul>
                </div>
            </CardBody>
        </Card>
    );
};



export default Sensormap;