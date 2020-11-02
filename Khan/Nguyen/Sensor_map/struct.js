import React from 'react';
//import { Step, Steps, Wizard } from 'react-albus';
import { Wizard } from 'react-albus';
import { CardBody, Col, Progress, Card, Button, Row, CustomInput, FormGroup } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
//export default function Struct() {
import dh from '../../assets/images/dh.svg';
const Struct=()=>{
    const selectList = [
        {
            value: 'them',
            color: 'btn btn-link mr-4 mb-3  mb-sm-0',
            icon: 'uil-bag-alt mr-1',
            title: 'Thêm',
        },
        {
            value: 'sua',
            color: 'btn btn-primary mr-4 mb-3  mb-sm-0',
            icon: 'uil-bag-alt mr-1',
            title: 'Sửa',
        },
    ];
    const selectedIndex = 0;
    return (
        <AvForm>
            <Card className="mt-3">
                <CardBody>
                    <h2 className="mt-0 mb-4"> Cài đặt kho mới </h2>

                    <FormGroup row>
                        <Col md={6}>
                            {
                                //tên kho
                            }

                            <AvField
                                name="name"
                                label="Tên kho lạnh"
                                type="text"
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: 'Vui lòng điền tên kho lạnh',
                                    },
                                }}
                            />
                            <AvField name="description" label="Mô tả" type="text" />
                            {
                                //vị trí cửa
                            }

                            <div>
                                <h2 className="mt-0">
                                    <i className="mdi mdi-check-all"></i>
                                </h2>
                                <h5 className="mt-0">Chọn vị trí của cửa</h5>
                                <div>
                                    <CustomInput
                                        type="switch"
                                        id="exampleCustomSwitch"
                                        name="customSwitch"
                                        label="Hiện vị trí cửa kho"
                                    />
                                </div>
                                <div class="table-responsive-sm">
                                    <table class="table text-center">
                                        <thead>
                                            <tr className="text-center">
                                                <th>
                                                    <h> </h>
                                                </th>
                                                <th>
                                                    <button class="btn btn-primary inline-block ">B</button>
                                                </th>
                                                <th>
                                                    <h> </h>
                                                </th>
                                            </tr>
                                        </thead>
                                        <thead className="text-center">
                                            <tr className="text-center">
                                                <th>
                                                    <button class="btn btn-primary inline-block">C</button>
                                                </th>
                                                <th>
                                                    <img src={dh} alt="" height="200" />
                                                </th>
                                                <th>
                                                    <button class="btn btn-primary inline-block">D</button>
                                                </th>
                                            </tr>
                                        </thead>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <h> </h>
                                                </th>
                                                <th>
                                                    <button class="btn btn-primary">A</button>
                                                </th>
                                                <th>
                                                    <h> </h>
                                                </th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </Col>
                        {
                            //x y z
                        }
                        <Col md={6}>
                            <AvField name="x" label="Dài (X)" type="number" min={0} required />
                            <AvField name="y" label="Rộng (Y)" type="number" min={0} required />
                            <AvField name="z" label="Cao (Z)" type="number" min={0} required />
                            <AvField name="z" label="Khoảng cách" type="number" min={0} required />
                            <p className="text-danger">Đơn vị cm</p>
                        </Col>
                    </FormGroup>

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
export default Struct;