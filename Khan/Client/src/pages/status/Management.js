import React from 'react';
import {
    Row,
    Col,
    Card,
    CardBody,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Media,
    Button,
} from 'reactstrap';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import 'react-perfect-scrollbar/dist/css/styles.css';
import ChatList from '../../components/ChatList';

import avatarImg1 from '../../assets/images/users/avatar-1.jpg';
import avatarImg4 from '../../assets/images/users/avatar-4.jpg';
import avatarImg7 from '../../assets/images/users/avatar-7.jpg';
import avatarImg9 from '../../assets/images/users/avatar-9.jpg';

const Member = ({ image, name, description, className }) => {
    return (
        <Media className="mt-1 border-top pt-3">
            <img src={image} className={`avatar rounded mr-3 ${className}`} alt={name} />
            <Media body>
                <h6 className="mt-1 mb-0 font-size-15">{name}</h6>
                <h6 className="text-muted font-weight-normal mt-1 mb-3">{description}</h6>
            </Media>
            <UncontrolledDropdown className="align-self-center float-right">
                <DropdownToggle tag="button" className="btn btn-link p-0 dropdown-toggle text-muted">
                    <i className="uil uil-ellipsis-v"></i>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                        <i className="uil uil-edit-alt mr-2"></i>Edit
                    </DropdownItem>
                    <DropdownItem>
                        <i className="uil uil-exit mr-2"></i>Remove
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem className="text-danger">
                        <i className="uil uil-trash mr-2"></i>Delete
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </Media>
    );
};

const Members = () => {
    return (
        <Card>
            <CardBody className="pt-2">
                <Button className="float-right mt-2" size={'sm'} color="primary">
                    Add
                </Button>
                <h6 className="header-title mb-4">Manager Members</h6>

                <Member image={avatarImg7} name="Shreyu N" description="Amin" />
                <Member image={avatarImg9} name="Greeva Y" description="Manager" />
                <Member image={avatarImg4} name="Nik G" description="Manager" />
                <Member image={avatarImg1} name="Hardik G" description="IT" />
            </CardBody>
        </Card>
    );
};

const Chat = () => {
    const chatMessages = [
        { id: 1, userPic: avatarImg4, userName: 'Geneva', text: 'Hello!', postedOn: '10:00' },
        {
            id: 2,
            userPic: avatarImg1,
            userName: 'Hardik G',
            text: 'Hi, How are you? What about our next meeting?',
            postedOn: '10:01',
        },
        { id: 3, userPic: avatarImg4, userName: 'Geneva', text: 'Yeah everything is fine', postedOn: '10:02' },
        { id: 4, userPic: avatarImg1, userName: 'Hardik G', text: "Wow that's great!", postedOn: '10:03' },
        { id: 5, userPic: avatarImg7, userName: 'Shreyu', text: 'Cool!', postedOn: '10:03' },
    ];

    return <ChatList messages={chatMessages} height="400px"></ChatList>;
};
const SetTemperatureNoti = () => {
    return (
        <Card>
            <CardBody>
                <Button className="float-right mt-2" size={'sm'} color="danger">
                    Save
                </Button>
                <h6 className="header-title mb-4">Set Warning Temperature</h6>
                <Range defaultValue={[20, 50]} />
            </CardBody>
        </Card>
    );
};
const Management = () => {
    return (
        <React.Fragment>
            <h5 className="mb-4">Management</h5>

            <Row>
                <Col xl={6}>
                    <Chat />
                </Col>
                <Col xl={6}>
                    <SetTemperatureNoti />
                    <Members />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Management;
