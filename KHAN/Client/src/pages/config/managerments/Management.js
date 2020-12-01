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

import avatarImg1 from 'assets/images/users/avatar-1.jpg';
import avatarImg4 from 'assets/images/users/avatar-4.jpg';
import avatarImg7 from 'assets/images/users/avatar-7.jpg';
import avatarImg9 from 'assets/images/users/avatar-9.jpg';
import AddUser from './addUser';
import EditRoleUser from './editUserMg';
import ConfirmDialog from 'components/ConfirmDialog';
import { get } from 'sortablejs';


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


const Member = ({ image, name, role, className }) => {
    return (
    
        <Media className="mt-1 border-top pt-3">
            <img src={image} className={`avatar rounded mr-3 ${className}`} alt={name} />
            <Media body>
                <h6 className="mt-1 mb-0 font-size-15">{name}</h6>
                <h6 className="text-muted font-weight-normal mt-1 mb-3">{role}</h6>
            </Media>
            <GetTool name={name} role={role} image={image}></GetTool>
        </Media>
  
    );
};

const Members = () => {
    const [modalnew,setmodalnew] = React.useState(false);
    

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
                <Member image={avatarImg7} name="Shreyu N"  role="chủ kho lạnh" />
                <Member image={avatarImg9} name="Greeva Y" role="chỉnh sửa" />
                <Member image={avatarImg4} name="Nik G" role="chỉnh sửa" />
                <Member image={avatarImg1} name="Hardik G" role="chỉ xem" />
            </CardBody>
            
        </Card>
        <AddUser isOpen={modalnew} toggleOpen={()=>{setmodalnew(!modalnew)}}></AddUser>     
        </>
    );
};

const Management = () => {
    return <Members />;
};

export default Management;
