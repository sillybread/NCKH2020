import React from 'react';
//import { Step, Steps, Wizard } from 'react-albus';
import { Wizard } from 'react-albus';
import { CardBody, Col, Progress, Card, Button, Row, CustomInput, FormGroup } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
//export default function Struct() {
import dh from '../../assets/images/dh.svg';
import Select from 'react-select';
const Add=()=>{
    const selectList = [
        {
            value: 'Mời',
            Name: 'Thêm quyền quản trị',
            color: 'btn btn-primary mr-4 mb-3  mb-sm-0',
            icon: ' uil-envelope-alt mr-1',
            title: 'Mời',
        },
        {
            value: 'save',
            Name:'Sửa quyền quản trị',
            color: 'btn btn-primary mr-4 mb-3  mb-sm-0',
            icon: ' uil-cube mr-1',
            title: 'Save',
        },
    ];
    const selectedIndex = 0;
    return (
        <AvForm>
            <Card className="mt-3">
                <CardBody>
                    <h2 className="mt-0 mb-4"> {selectList[selectedIndex].Name} </h2>

                    
                        <Col md={12}>
                            
                                <div>
                                <p className="mb-1 mt-3 font-weight-bold">UserName</p>
                                <Select
                                    isMulti={true}
                                    options={[
                                        { value: 'khan', label: 'Khan' },
                                        { value: 'toan', label: 'Toàn' },
                                        { value: 'nguyen', label: 'Nguyện' },
                                    ]}
                                    className="react-select"
                                    classNamePrefix="react-select"></Select>
                                </div> 
                                <p> </p>
                            <Select  
                                className = "react-select"  
                                classNamePrefix = "react-select"
                                defaultValue = {
                                    {
                                        value: 'viewer',
                                        label: 'Chỉ xem'
                                    }
                                }
                                options = {
                                    [{
                                        value: 'viewer',
                                        label: 'Chỉ xem'
                                    },
                                    {
                                        value: 'manager',
                                        label: 'Chỉnh sửa'
                                    },]
                                } > 
                            </Select> 
                        </Col>
                
                    <p> </p>
                    <div>
                        <ul className="list-inline wizard mb-0">
                            <li className="next list-inline-item float-right">
                                <button type="button" className={selectList[selectedIndex].color}>
                                    <i className={selectList[selectedIndex].icon}> </i>
                                    {selectList[selectedIndex].title}
                                </button>
                            </li>
                        </ul>
                    </div>
                </CardBody>
            </Card>
        </AvForm>
    );
};
export default Add;