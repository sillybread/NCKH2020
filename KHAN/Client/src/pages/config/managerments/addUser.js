import React from 'react';
import { Modal ,ModalHeader,CardBody, ModalFooter, Card, Button, Label, Media} from 'reactstrap';
import { AvForm, AvGroup} from 'availity-reactstrap-validation';
import Select from 'react-select';
import Loader from 'components/Loader';



const AddUser=(props)=>{
    const [loading,setLoading] = React.useState(false);
    const state = 
        {
            value: 'Mời',
            Name: 'Thêm quyền quản trị',
            color: 'btn btn-primary mr-4 mb-3  mb-sm-0',
            icon: ' uil-user-plus mr-1',
            title: 'Gửi lời mời',
        }
    const getUserOption = (users =[])=>{
        return users.map(user=>{
            return  { value: user.username, 
                    label:
                    <Media className='pt-1'>
                        <img src={user.avatar} className='avatar rounded mr-1' alt=""/>                        
                        <Media body>
                            <h6 className="mt-1 mb-0 font-size-15">{user.fullname}</h6>
                            <h6 className="text-muted font-weight-normal mt-1">{user.username}</h6>
                        </Media>
                    </Media> 
                }
            }
        );
    }
    const users=[
        {
            "fullname": "Trần Vi Khan",
            "status": "offline",
            "avatar": "http://vikhan.herokuapp.com/api/user/avatar/f7191836-5839-41ed-8e9f-13ea5bfa9710.png",
            "_id": "5fc05b70d2b6a82f10235ded",
            "username": "vikhan",
            "email": "tranvikhan@gmail.com"
          },
          {
            "fullname": "Trần Vi Khan",
            "status": "offline",
            "avatar": "https://vikhan.herokuapp.com/api/user/avatar/default.jpg",
            "_id": "5fc0632b646b8700176fef52",
            "username": "quoctoan",
            "email": "toan@gmail.com"
          },
          {
            "fullname": "quoctoan2",
            "status": "offline",
            "avatar": "http://vikhan.herokuapp.com/api/user/avatar/default.jpg",
            "_id": "5fc3aab515e83800254ce2c9",
            "username": "quoctoan2",
            "email": "toa2n@gmail.com"
          },
          {
            "fullname": "hello",
            "status": "offline",
            "avatar": "http://vikhan.herokuapp.com/api/user/avatar/default.jpg",
            "_id": "5fc3ab5a15e83800254ce2ca",
            "username": "hello",
            "email": "hello@gmsf.con"
          },
          {
            "fullname": "vikhan2",
            "status": "offline",
            "avatar": "http://localhost:8080/api/user/avatar/default.jpg",
            "_id": "5fc402310dd11536182ec3a7",
            "username": "vikhan2",
            "email": "tranvikhan2@gmail.com"
          },
          {
            "fullname": "khansaudoi",
            "status": "offline",
            "avatar": "http://localhost:8080/api/user/avatar/default.jpg",
            "_id": "5fc4093d0dd11536182ec3a8",
            "username": "khansaudoi",
            "email": "tranvikhan3@gmail.com"
          }
    ]


    return (
        <Modal isOpen={props.isOpen} toggle={props.toggleOpen}>
            {loading && <Loader />}
            <AvForm>
            <ModalHeader >
                {state.Name}
            </ModalHeader>
            <Card className='shadow-none'>
                <CardBody>
                    
                    <AvGroup>
                        <Label for="username">Người dùng</Label>
                        <Select
                            isMulti={true}
                            options={
                                getUserOption(users)
                            }
                            className="react-select"
                            classNamePrefix="react-select">
                        </Select>
                    </AvGroup>
                    <AvGroup>
                        <Label for="role">Quyền</Label>
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
                        
                    </AvGroup>       
                </CardBody>
            </Card>
            <ModalFooter>
                <Button color={state.color} onClick={()=>{}} type="submit">
                    <i className={state.icon}> </i>
                    {state.title}
                </Button>
            </ModalFooter>
            </AvForm>
        </Modal>
        
    );
};
export default AddUser;