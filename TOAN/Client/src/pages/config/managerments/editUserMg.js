import React from 'react';
import { Modal ,ModalHeader,CardBody, ModalFooter, Card, Button, Label, ModalBody} from 'reactstrap';
import { AvForm, AvGroup} from 'availity-reactstrap-validation';
import Select from 'react-select';
import AvField from 'availity-reactstrap-validation/lib/AvField';
import Loader from 'components/Loader';


const EditRoleUser=(props)=>{

    const state = 
        {
            Name: 'Sửa quyền quản trị',
            color: 'btn btn-primary mr-4 mb-3  mb-sm-0',
            icon: 'uil uil-user-check mr-1',
            title: 'Lưu thay đổi',
        }
    const converNametoRole = {
        'chỉ xem': 'Viewer',
        'chỉnh sửa' :'Manager'
    }

    return (
    <Modal isOpen={props.isOpen} toggle={props.toggleOpen}>
    <AvForm>
    {props.loading && <Loader />}
    <ModalHeader >
        {state.Name}
    </ModalHeader>
    <ModalBody>
            <AvGroup>
                <AvField name="user" label="Người dùng" type="text" value={props.name} disabled/>
            </AvGroup>
            <AvGroup>
                <Label for="username">Quyền</Label>
                <Select  
                    className = "react-select"  
                    classNamePrefix = "react-select"
                    defaultValue = {
                        {
                            value: converNametoRole[props.role],
                            label: (props.role ==='chỉ xem')?'chỉ xem':"chỉnh sửa"
                        }
                    }
                    options = {
                        [{
                            value: 'Viewer',
                            label: 'chỉ xem'
                        },
                        {
                            value: 'Manager',
                            label: 'chỉnh sửa'
                        },]
                    } > 
                </Select>
                
            </AvGroup>       
    </ModalBody>
    <ModalFooter className='text-right'>
        <Button color={state.color}  type="submit" >

            <i className={state.icon}> </i>
            {state.title}
        </Button>
    </ModalFooter>
    </AvForm>
</Modal>
);
};
export default EditRoleUser;