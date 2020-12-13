import React, { useEffect } from 'react';
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
    Row,
    Col,
} from 'reactstrap';

import 'react-perfect-scrollbar/dist/css/styles.css';

import AddUser from './addUser';
import EditRoleUser from './editUserMg';
import ConfirmDialog from 'components/ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import { AddAccess } from 'redux/actions';


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
        <EditRoleUser name={props.name} image={props.image} role={props.role} isOpen={modalEdit} toggleOpen={()=>{setModalEdit(!modalEdit)}}></EditRoleUser>
        <ConfirmDialog 
            title="Xác nhận xóa bỏ tài khoản"
            content={<UserDetail name={props.name} image={props.image} role={props.role} />} 
            color='danger' 
            isOpen={modalDelete} 
            toggle={()=>{setModalDelete(!modalDelete)}} 
            confirm={()=>{}}>
        </ConfirmDialog>
        </>
    );
}
const UserDetail = ({ image, name, role}) => {
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


const Member = ({accepted ,image, name, role, className }) => {
    return (
    
        <Media className="mt-1 border-top pt-3">
            <img src={image} className={`avatar rounded mr-3 ${className}`} alt={name} />
            <Media body>
                <h6 className="mt-1 mb-0 font-size-15">{name}</h6>
                <h6 className="text-muted font-weight-normal mt-1 mb-3">{role}{(!accepted)&& ' - Đã gửi lời mời'}</h6>
            </Media>
            <GetTool name={name} role={role} image={image}></GetTool>
        </Media>
  
    );
};

const Members = () => {
    const [modalnew,setmodalnew] = React.useState(false);
    const accesses = useSelector(state => state.RoomAccess.accesses);
    const auth = useSelector(state => state.Auth);
    const currentRoomInfo = useSelector(state => state.RoomList.currentRoomInfo);
    const dispatch = useDispatch();

    const getRoleName = {
       Owner: 'chủ kho lạnh',
       Manager: 'chỉnh sửa',
       Viewer: 'chỉ xem'
    }
    const submitAdd = (selectedUsers,role) =>{
        selectedUsers.map(user =>{
            dispatch(AddAccess(auth.user,currentRoomInfo._id,user.id,role));
        })
    }

    return (
        <>
        <Card className='shadow-none'>
            <CardHeader className='bg-transparent text-right'>
                <Button className="mt-4"  color="primary"
                    onClick={()=>{setmodalnew(!modalnew)}}
                >
                    <i className='uil uil-user-plus mr-1'></i>
                    Thêm người mới
                </Button>
            </CardHeader>
            <CardBody > 
                {
                    (accesses)&& accesses.map(ac =>(
                        <Member accepted={ac.accepted} image={ac.user.avatar} name={ac.user.fullname}  role={getRoleName[ac.role]} />
                    ))
                }     
            </CardBody>
            
        </Card>
        <AddUser 
            isOpen={modalnew} 
            toggleOpen={()=>{setmodalnew(!modalnew)}} 
            submitAdd={submitAdd}
        ></AddUser>     
        </>
    );
};

const Management = () => {
    return (
        <React.Fragment>
            <Row className="page-title align-items-center">
            <Col xs={12}>
                    <h4 className="mb-1 mt-0">Quản lý quyền truy cập</h4>
            </ Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Card className="mb-5">
                        <CardBody>
                            <Members />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
};

export default Management;
