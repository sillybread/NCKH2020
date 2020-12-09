import React from 'react';
import { Modal ,ModalHeader,CardBody, ModalFooter, Card, Button, Label, Media} from 'reactstrap';
import { AvForm, AvGroup} from 'availity-reactstrap-validation';
import Select from 'react-select';
import Loader from 'components/Loader';
import { useSelector } from 'react-redux';
import { requestApi } from 'helpers/api';



const AddUser=(props)=>{
    const [loading,setLoading] = React.useState(false);
    const currentRoom = useSelector(state => state.CurrentRoom);
    const [users, setUsers] = React.useState([]);
    const [role, setRole] = React.useState(
        {
            value: 'Viewer',
            label: 'chỉ xem'
        }
    );
    const [selectedUsers, setSelUsers] = React.useState([]);
    const auth = useSelector(state => state.Auth)
    const CurrentRoom = useSelector(state => state.CurrentRoom)
    const state = 
        {
            value: 'Mời',
            Name: 'Thêm quyền quản trị',
            color: 'btn btn-primary mr-4 mb-3  mb-sm-0',
            icon: ' uil-user-plus mr-1',
            title: 'Gửi lời mời',
        }

    React.useEffect(()=>{
        if (props.isOpen){
            requestApi({
                method: 'GET',
                headers:{
                    'x-access-token': auth.user.accessToken
                },
                url: 'api/user/find',
                params: {
                    search_string: ""
                }
            }).then((res)=>{
                if (res.status === "success") setUsers(res.result.users)
            })
        }
    },[props.isOpen]);

    const getUserOption = (users =[])=>{
        let kt =[];
        if(currentRoom && currentRoom.access)
            kt = currentRoom.access.map(ac =>  (ac.user._id));
        return users.map(user=>{
            return  (!kt.includes(user._id)) &&{ 
                id: user._id,
                value: user.username + " " + user.fullname, 
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
                            classNamePrefix="react-select"
                            onChange={(e)=>setSelUsers(e)}>
                        </Select>
                    </AvGroup>
                    <AvGroup>
                        <Label for="role">Quyền</Label>
                        <Select  
                            className = "react-select"  
                            classNamePrefix = "react-select"
                            defaultValue = {
                                {
                                    value: 'Viewer',
                                    label: 'chỉ xem'
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
                            }
                            onChange={(e)=>setRole(e)} > 
                        </Select>
                        
                    </AvGroup>       
                </CardBody>
            </Card>
            <ModalFooter>
                <Button color={state.color} onClick={()=>{
                    ///\console.log('VietNamVoDich', selectedUsers, role);
                    selectedUsers.map(e => {
                        (CurrentRoom.info._id) && requestApi({
                            method: 'POST',
                            headers: {
                                'x-access-token': auth.user.accessToken
                            },
                            data:{
                                room_id: CurrentRoom.info._id,
                                user_id: e.id,
                                role: role.value
                            },
                            url:'api/room/access/add'
                        })
                    });
                    props.toggleOpen();
                }} type="submit">
                    <i className={state.icon}> </i>
                    {state.title}
                </Button>
            </ModalFooter>
            </AvForm>
        </Modal>
        
    );
};
export default AddUser;