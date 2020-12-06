import React from 'react';
import { Step, Steps, Wizard } from 'react-albus';

import { CardBody, Col, Progress, Card, Button, Row, CustomInput,Modal,ModalHeader,ModalBody, Label, Alert } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import AvRadioGroup from 'availity-reactstrap-validation/lib/AvRadioGroup';
import AvRadio from 'availity-reactstrap-validation/lib/AvRadio';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import Loader from 'components/Loader';


export default function AddApi(props) {
    const [errorLogin,setErrorLogin] = React.useState(null);
    const [errorStation,setErrorStation] = React.useState('API này đã được sử dụng');
    const [username,setUsername] = React.useState('tester@kholanhctu');
    const [password,setPassword] = React.useState('tester@123');
    const [stations,setStations] = React.useState([]);
    const [loading,setLoading] = React.useState(false);

    
    return(
        <Modal isOpen={props.isOpen} toggle={props.toggleOpen}>
            <ModalHeader>Kích hoạt API mới</ModalHeader>
            <ModalBody>
            <Card className="shadow-none">
            <CardBody>
            <Wizard
                render={({ step, steps }) => (
                    <React.Fragment>
                        <Progress
                            animated
                            striped
                            color="primary"
                            value={((steps.indexOf(step) + 1) / steps.length) * 100}
                            className="mb-3 progress-sm"
                        />
                        <Steps>
                            <Step
                                id="apiUser"
                                render={({ next }) => (
                                    <>
                                    {loading && <Loader />}
                                    {errorLogin && (
                                        <Alert color="danger" isOpen={errorLogin ? true : false}>
                                            <div>{errorLogin}</div>
                                        </Alert>
                                    )}
                                    <AvForm
                                        onValidSubmit={(event, values) => {

                                            //Get stations and next
                                            if(values.username==='tester@kholanhctu' && values.password=== 'tester@123'){
                                                setStations([
                                                    {
                                                        "station_id": 8,
                                                        "station_name": "Kho lạnh CTU_01"
                                                    },
                                                    {
                                                        "station_id": 9,
                                                        "station_name": "Kho lạnh CTU_02"
                                                    }
                                                ]);
                                                setErrorLogin(null);
                                                next();
                                            }else{
                                                setErrorLogin('Sai thông tin tài khoản API');
                                            }
                                            
                                        }}>
                                        <AvField
                                            name="username"
                                            value={username}
                                            label="Tên đăng nhập Api"
                                            type="text"
                                            validate={{
                                                required: {
                                                    value: true,
                                                    errorMessage: 'Vui lòng điền tên đăng nhập Api',
                                                },
                                            }}
                                        />
                                        <AvField
                                            name="password"
                                            value={password}
                                            label="Mật khẩu đăng nhập Api"
                                            type="password"
                                            validate={{
                                                required: {
                                                    value: true,
                                                    errorMessage: 'Vui lòng điền mật khẩu đăng nhập Api',
                                                },
                                            }}
                                        />

                                        <ul className="list-inline wizard mb-0">
                                            <li className="next list-inline-item float-right">
                                                <Button color="primary" type="submit">
                                                    Tiếp theo
                                                </Button>
                                            </li>
                                        </ul>
                                    </AvForm>
                                    </>
                                )}
                            />
                            <Step
                                id="chooseStation"
                                render={({ previous }) => (
                                    <AvForm
                                    onValidSubmit={(event, values) => {
                                        setLoading(true);
                                        //props.submit();

                                    }}>
                                    {loading && <Loader />}
                                    {errorStation && (
                                        <Alert color="danger" isOpen={errorStation ? true : false}>
                                            <div>{errorStation}</div>
                                        </Alert>
                                    )}
                                    <AvGroup>
                                        <Label for="station_select">Chọn Station:</Label>
                                        <AvRadioGroup 
                                            name="station_select"  
                                            required
                                            validate={{
                                                required: {
                                                    value: true,
                                                    errorMessage: 'Vui lòng chọn Station',
                                                },
                                            }}
                                        >
                                        {
                                            stations.map(station=>(
                                                <AvRadio className='mt-3 mb-3' customInput label={station.station_name} value={station.station_id} />
                                            ))
                                        }                                     

                                        </AvRadioGroup>
                                    </AvGroup>
                                    <ul className="list-inline wizard mt-2 mb-0">
                                        <li className="previous list-inline-item">
                                            <Button onClick={previous} color="secondary">
                                                
                                                Trở lại  
                                            </Button>
                                        </li>
                                        <li className="next list-inline-item float-right">
                                            <Button color="primary" type="submit">
                                                Hoàn tất
                                            </Button>
                                        </li>
                                    </ul>
                                </AvForm>
                                )}
                            />
                        </Steps>
                    </React.Fragment>
                )}
            />
            </CardBody>
            </Card>
            </ModalBody>
        </Modal>
    );
}
