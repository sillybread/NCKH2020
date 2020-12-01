import React from 'react';
import {
    CardHeader,
    Card,
    CardBody,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Media,
    Button,
} from 'reactstrap';

import 'react-perfect-scrollbar/dist/css/styles.css';
import classNames from 'classnames';

import avatarImg1 from 'assets/images/users/avatar-1.jpg';
import avatarImg4 from 'assets/images/users/avatar-4.jpg';
import avatarImg7 from 'assets/images/users/avatar-7.jpg';
import avatarImg9 from 'assets/images/users/avatar-9.jpg';
import ConfirmDialog from 'components/ConfirmDialog';
import { get } from 'sortablejs';


const apis= [
    {
        "api": {
            "username": "tester@kholanhctu",
            "password": "tester@123"
        },
        "_id": "5fc06f5fa91004001721b0a7",
        "station_id": 8,
        "station_name": "Kho lạnh CTU_01"
    },
    {
        "api": {
            "username": "tester@kholanhctu",
            "password": "tester@123"
        },
        "_id": "5fc06f5fa91004011721b0a7",
        "station_id": 9,
        "station_name": "Kho lạnh CTU_01"
    }

]

const GetTool = (props)=>{
    const [modalEdit,setModalEdit] = React.useState(false);
    const [modalDelete,setModalDelete] =React.useState(false);

    return (
        <>
        <UncontrolledDropdown className="align-self-center float-right">
            <DropdownToggle tag="button" className="btn btn-link p-0 dropdown-toggle text-muted">
                <i className="uil uil-ellipsis-v"></i>
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem
                    onClick={
                        ()=>{setModalEdit(!modalEdit)}
                    }
                    disabled={props.role==='chủ kho lạnh'}
                >
                    <i className="uil uil-edit-alt mr-2"></i>Sửa quyền
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem className="text-danger"
                    disabled={props.role==='chủ kho lạnh'}
                    onClick={
                        ()=>{setModalDelete(!modalDelete)}
                    }
                >
                    <i className="uil uil-trash mr-2"></i>Xóa quyền
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
        <ConfirmDialog 
            title="Xác nhận xóa bỏ tài khoản"
            content={<APIDetail name={props.name} image={props.image} role={props.role} />} 
            color='danger' 
            isOpen={modalDelete} 
            toggle={()=>{setModalDelete(!modalDelete)}} 
            confirm={()=>{}}>
        </ConfirmDialog>
        </>
    );
}
const APIDetail = ({ image, name, role}) => {
    return (
    
        <Media className="mt-1 pt-3">
            <img src={image} className={'avatar rounded mr-3'} alt={name} />
            <Media body>
                <h6 className="mt-1 mb-0 font-size-15">{name}</h6>
                <h6 className="text-muted font-weight-normal mt-1 mb-3">{role}</h6>
            </Media>
        </Media>
  
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
                    <i className='uil uil-file-medical'></i>
                    Thêm API mới
                </Button>
            </CardHeader>
            <CardBody >
                {apis.map(api=>(<API api={api} />)
                )}   
            </CardBody>
            
        </Card> 
        </>
    );
};


const API = (props) => {
    return <React.Fragment>
        <Card className="border mb-3">
            <CardBody className="p-3">
                <UncontrolledDropdown className="float-right" direction="left">
                    <DropdownToggle tag="a" className="dropdown-toggle p-0 arrow-none cursor-pointer">
                        <i className="uil uil-ellipsis-v font-size-14"></i>
                    </DropdownToggle>

                    <DropdownMenu>
                        <DropdownItem><i className="uil uil-edit-alt mr-2"></i>Edit</DropdownItem>
                        <DropdownItem className="text-danger"><i className="uil uil-trash mr-2"></i>Delete</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>

                <h6 className="mt-0 mb-2 font-size-15">
                    <p href="/" className="text-body">{props.api.station_name}</p>
                </h6>

                <p className="mb-0 mt-4">
                    <span className="text-nowrap align-middle font-size-13">
                        <i className="uil uil-processor text-muted mr-1"></i>
                        18
                    </span>
                    <small className="float-right text-muted">khan</small>
                </p>
            </CardBody>
        </Card>
    </React.Fragment>
}


export default ApiService;
