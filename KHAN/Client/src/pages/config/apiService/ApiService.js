import React from 'react';
import {
    CardHeader,
    Card,
    CardBody,
    Media,
    Button,
} from 'reactstrap';

import 'react-perfect-scrollbar/dist/css/styles.css';
import {dateToString} from 'helpers/datetimeCover';
import ConfirmDialog from 'components/ConfirmDialog';
import AddApi from './addApi';





const apis= [
    {
        "api": {
            "username": "tester@kholanhctu",
        },
        "_id": "5fc06f5fa91004001721b0a7",
        "station_id": 8,
        "station_name": "Kho lạnh CTU_01",
        "createdAt": "2020-11-27T03:15:43.586Z"
    },
    {
        "api": {
            "username": "tester@kholanhctu",
        },
        "_id": "5fc06f5fa91004011721b0a7",
        "station_id": 9,
        "station_name": "Kho lạnh CTU_02",
        "createdAt": "2020-11-27T03:15:43.586Z"
    }

]

const APIDetail = (props) => {
    return (
        <>
            <h6 className="mt-0 mb-2 font-size-15">
            <p href="/" className="text-body">{props.api.station_name}</p>
            </h6>
            <p> 
                <span className="text-black-50">Tên đăng nhập: </span>
                {props.api.api.username}
            </p>
            <p className="mb-0 mt-4">
                <span className="text-nowrap align-middle font-size-13">
                    <i className="uil uil-rss-alt text-muted mr-1"></i>
                    {props.api.station_id}
                </span>
                <small className="float-right text-muted">
                    <i className="uil uil-calender mr-1"></i>
                    {dateToString(props.api.createdAt)}
                </small>
            </p>
        </>
    );
};


const ApiService = () => {
    const [modalnew,setmodalnew] = React.useState(false);
    

    return (
        <>
        <Card className='shadow-none'>
            <CardHeader className='bg-transparent text-right'>
                <Button className="mt-4"  color="primary"
                    onClick={()=>{setmodalnew(!modalnew)}}
                >
                    <i className='uil uil-plug mr-1'></i>
                    Kích hoạt API mới
                </Button>
            </CardHeader>
            <CardBody >
                {apis.map(api=>(<API api={api} />)
                )}   
            </CardBody>
            
        </Card> 
        <AddApi isOpen={modalnew} toggleOpen={()=>{setmodalnew(!modalnew)}} submit={(value)=>{console.log('addApi',value);setmodalnew(!modalnew);}}/>
        </>
    );
};


const API = (props) => {
    const [modalDelete,setModalDelete]= React.useState(false);

    return <React.Fragment>
        <Card className="border mb-3">
            <CardBody className="p-3">
                <Button className="float-right dropdown-toggle p-0 arrow-none cursor-pointer" color='danger'
                    onClick={()=>{setModalDelete(!modalDelete)}}
                >
                    <i className="uil uil-trash mx-1"></i>
                </Button>
                
                <h6 className="mt-0 mb-2 font-size-15">
                    <p href="/" className="text-body">{props.api.station_name}</p>
                </h6>
                <p> 
                    <span className="text-black-50">Tên đăng nhập: </span>
                    {props.api.api.username}
                </p>
                <p className="mb-0 mt-4">
                    <span className="text-nowrap align-middle font-size-13">
                        <i className="uil uil-rss-alt text-muted mr-1"></i>
                        {props.api.station_id}
                    </span>
                    <small className="float-right text-muted">
                        <i className="uil uil-calender mr-1"></i>
                        {dateToString(props.api.createdAt)}
                    </small>
                </p>
            </CardBody>
        </Card>
        <ConfirmDialog 
            title="Xác nhận xóa bỏ tài khoản API"
            content={<APIDetail api={props.api} />} 
            color='danger' 
            isOpen={modalDelete} 
            toggle={()=>{setModalDelete(!modalDelete)}} 
            confirm={()=>{}}>
        </ConfirmDialog>
    </React.Fragment>
}



export default ApiService;
