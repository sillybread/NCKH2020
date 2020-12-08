import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Container,UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { Menu, X, Search, Settings, User, HelpCircle, Lock, LogOut,ChevronDown,Plus } from 'react-feather';
import { showRightSidebar, getCurrentRoomInfo,setDefaultRoom, createRoom, getCurrentRoomArea, getCurrentRoomAccess, getCurrentRoomActivate, getCurrentRoomSensorMap, getCurrentRoomSensorList, getNotificationList} from '../redux/actions';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import LanguageDropdown from './LanguageDropdown';

import logo from '../assets/images/logo.png';
import profilePic from '../assets/images/users/avatar-7.jpg';
import NewWareHouse from './newWareHouse';
import {useDispatch, useSelector} from 'react-redux';
import { getRoomCookieDefault, setRoomCookieDefault } from 'helpers/roomUtils';


const ProfileMenus = [
    {
        label: 'My Account',
        icon: User,
        redirectTo: '/',
    },
    {
        label: 'Settings',
        icon: Settings,
        redirectTo: '/',
    },
    {
        label: 'Support',
        icon: HelpCircle,
        redirectTo: '/',
    },
    {
        label: 'Lock Screen',
        icon: Lock,
        redirectTo: '/',
    },
    {
        label: 'Logout',
        icon: LogOut,
        redirectTo: '/account/logout',
        hasDivider: true,
    },
];

const Topbar = (props) =>{
    const [newWareHouseModal, setNewWareHouseModal] = useState(false);
    const dispatch = useDispatch();

    const auth = useSelector(state => state.Auth);;
    const createRoomSuccess = useSelector(state => state.RoomList.createRoomSuccess)
    const loading = useSelector(state => state.RoomList.loading)
    const error = useSelector(state => state.RoomList.error);

    const toggleModal = () => {
        setNewWareHouseModal(!newWareHouseModal)
    };

    useEffect(()=>{
        const defaultRoom = props.defaultRoom;
        const token = auth.user.accessToken;
        if(defaultRoom !=null && defaultRoom.room._id != 'xxx'){
            dispatch(getCurrentRoomInfo(defaultRoom.room._id,token));
            dispatch(getCurrentRoomArea(defaultRoom.room._id,token));
            dispatch(getCurrentRoomAccess(defaultRoom.room._id,token));
            dispatch(getCurrentRoomActivate(defaultRoom.room._id,token));
            dispatch(getCurrentRoomSensorMap(defaultRoom.room._id,token));
            dispatch(getCurrentRoomSensorList(defaultRoom.room._id,token));
        }
        setRoomCookieDefault(props.defaultRoom);
    },[props.defaultRoom])
    const setCurrentRoom = (obj)=>{
        dispatch(setDefaultRoom(obj));
    }
    const submitNewRoom = (room) =>{
        dispatch(createRoom(auth.user, room));
    }
    useEffect(()=>{
        dispatch(getNotificationList(auth.user.accessToken));
    },[])
    useEffect(()=>{
        if(createRoomSuccess==true){
            setNewWareHouseModal(false);
        }
    },[createRoomSuccess])


    return (
        <React.Fragment>
            <div className="navbar navbar-expand flex-column flex-md-row navbar-custom">
                <Container fluid>
                    {/* logo */}
                    <Link to="/" className="navbar-brand mr-0 mr-md-2 logo">
                        <span className="logo-lg">
                            <img src={logo} alt="" height="40" />
                        </span>
                        <span className="logo-sm">
                            <img src={logo} alt="" height="40" />
                        </span>
                    </Link>


                    {/* menu*/}
                    <ul className="navbar-nav bd-navbar-nav list-unstyled menu-left mb-0">
                        <li className="">
                            <button
                                className="button-menu-mobile open-left disable-btn mr-0"
                                onClick={props.openLeftMenuCallBack}>
                                <Menu className="menu-icon" />
                                <X className="close-icon" />
                            </button>
                        </li>
                    </ul>

                    <UncontrolledButtonDropdown>
                        <DropdownToggle color="default" className="dropdown-toggle text-dark font-weight-bold mt-2" >
                            {props.defaultRoom && props.defaultRoom.room.name}
                            <i className="icon ml-1"><ChevronDown /></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                            {(props.myRoom.length>0)?<DropdownItem header>Kho của tôi</DropdownItem>:<></>}
                            {
                                props.myRoom && props.myRoom.map((obj)=>(
                                    <DropdownItem onClick={()=>{setCurrentRoom(obj)}}>
                                        <span>{obj.room.name}</span>
                                    </DropdownItem>
                                ))
                            }

                            {(props.sharedRoom && props.sharedRoom.length>0)? <DropdownItem header>Kho được chia sẻ</DropdownItem>:<></>}

                            {
                                props.sharedRoom && props.sharedRoom.map((obj)=>(
                                    <DropdownItem onClick={()=>{setCurrentRoom(obj)}}>
                                        <span>{obj.room.name}</span>
                                    </DropdownItem>
                                ))
                            }
                            <DropdownItem divider />
                            <DropdownItem className="text-success" onClick={toggleModal} >
                                    <i className="icon ml-1"><Plus /></i>
                                    Tạo kho lạnh mới
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                    <NewWareHouse
                        error={error}
                        isOpen={newWareHouseModal}
                        toggleOpen={toggleModal}
                        submit={(value)=>{submitNewRoom(value)}}
                        loading={loading}
                    />
                    <ul className="navbar-nav flex-row ml-auto d-flex list-unstyled topnav-menu float-right mb-0">
                        <li className="d-none d-sm-block">
                            <div className="app-search">
                                <form>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Tìm kiếm ..." />
                                        <Search />
                                    </div>
                                </form>
                            </div>
                        </li>

                        <LanguageDropdown tag="li" />
                        <NotificationDropdown />

                        {/* <li className="notification-list">
                            <button
                                className="btn btn-link nav-link right-bar-toggle"
                                onClick={this.handleRightSideBar}>
                                <Settings />
                            </button>
                        </li> */}

                        <ProfileDropdown
                            profilePic={profilePic}
                            menuItems={ProfileMenus}
                            username={'Shreyu N'}
                            description="Administrator"
                        />
                    </ul>
                </Container>
            </div>
        </React.Fragment>
    );
}

Topbar.defaultProps = {
    myRoom: [],
    sharedRoom: [],
    defaultRoom: {
        role:'Owner',
        room: {
            _id: undefined,
            name: "Đang tải dữ liệu..."
        }
    }
}

const mapStateToProps = (state) =>{
    const {myRoom, sharedRoom, defaultRoom} = state.RoomList;
    return {myRoom, sharedRoom, defaultRoom};
}

export default connect(mapStateToProps, { showRightSidebar })(Topbar);