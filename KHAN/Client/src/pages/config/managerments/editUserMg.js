import React from 'react';
import { Modal ,ModalHeader,CardBody, ModalFooter, Card, Button, Label} from 'reactstrap';
import { AvForm, AvGroup} from 'availity-reactstrap-validation';
import Select from 'react-select';
import AvField from 'availity-reactstrap-validation/lib/AvField';

const EditRoleUser=(props)=>{
    const state = 
        {
            Name: 'Sửa quyền quản trị',
            color: 'btn btn-primary mr-4 mb-3  mb-sm-0',
            icon: ' uil-user-check mr-1',
            title: 'Lưu thay đổi',
        }

    return (
        <Modal isOpen={props.isOpen} toggle={props.toggleOpen}>
    <AvForm>
    <ModalHeader >
        {state.Name}
    </ModalHeader>
    <Card className='shadow-none'>
        <CardBody>
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
                            value: props.role,
                            label: (props.role ==='chỉ xem')?'Chỉ xem':"Chỉnh sửa"
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
                
            </AvGroup>       
        </CardBody>
    </Card>
    <ModalFooter>
        <Button color={state.color}  type="submit">
            <i className={state.icon}> </i>
            {state.title}
        </Button>
    </ModalFooter>
    </AvForm>
</Modal>
    );
};
export default EditRoleUser;