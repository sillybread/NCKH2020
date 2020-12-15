import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { isMobileOnly } from "react-device-detect";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import * as FeatherIcon from "react-feather";

import AppMenu from "./AppMenu";
import { useDispatch } from "react-redux";
import {
  getNotificationList,
  getRoomList,
  getAreaDataSuccess,
  getCubeDataSuccess,
  getCurrentDataSuccess,
  getSensorData,
  pushNotification,
  updateNotification,
} from "redux/actions";
import { showNotification } from "helpers/webNotification";
/* import MySocket from 'socket.controller'; */
import { useToasts } from "react-toast-notifications";
const { BASE_URL } = require("constants/apiConfig");

var io = require("socket.io-client");
/**
 * User Widget
 */
const UserProfile = (props) => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const webSocket = React.useRef(null);

  React.useEffect(() => {
    if (props.user && props.user.accessToken) {
      dispatch(getRoomList(props.user));
      dispatch(getNotificationList(props.user));
    } else {
      console.log("Disconnect");
      webSocket.current.disconnect();
      webSocket.current = null;
    }
    return () => {
      console.log("Disconnect");
      webSocket.current.disconnect();
      webSocket.current = null;
    };
  }, [props.user]);

  const checkDispatch = (room_id, action) => {
    if (props.currentRoomInfo && props.currentRoomInfo._id === room_id) {
      dispatch(action);
    }
  };

  React.useEffect(() => {
    if (props.user.accessToken && props.currentRoomInfo) {
      if (webSocket.current) webSocket.current.disconnect();
      webSocket.current = io.connect(BASE_URL);
      console.log("Connect");
      const socket = webSocket.current;
      console.log(
        "Socket io Client",
        "run socket client",
        props.currentRoomInfo._id
      );

      socket.on("connect", function () {
        console.log("Socket io Client", "connect");
        socket.emit("login", props.user.accessToken);
      });

      socket.on("data_cube_room", function (data) {
        checkDispatch(data.room, getCubeDataSuccess(data));
        console.log("Socket io Client Cube", data);
      });

      socket.on("data_room", function (data) {
        checkDispatch(data.room, getCurrentDataSuccess(data));
        checkDispatch(data.room, getSensorData(props.user, data.room));
        console.log("Socket io Client Curent Data", data);
      });
      socket.on("log", function (data) {
        console.log("Socket io Client Log", data);
      });

      socket.on("data_area", function (data) {
        checkDispatch(data.room, getAreaDataSuccess(data));
        console.log("Socket io Client Area", data);
      });

      socket.on("notification", function (data) {
        if (data.message == "add") {
          dispatch(pushNotification(data.data));

          if (Notification.permission == "granted") {
            showNotification("Quản lý nhiệt độ kho lạnh", data.data.content);
          } else {
            addToast(data.data.content, {
              appearance: "warning",
              autoDismiss: true,
            });
          }
        }
        if (data.message == "update") {
          dispatch(updateNotification(data.data._id, data.data));
        }
        //console.log('Socket io Client Notification',data);
      });

      socket.on("access", function (data) {
        console.log("Socket io Client", data);
        if (data.message == "add") {
          socket.emit("join-room", "room" + data.data.access.room);
          if (Notification.permission == "granted") {
            showNotification("Quản lý nhiệt độ kho lạnh", data.data.content);
          } else {
            addToast(data.data.content, {
              appearance: "warning",
              autoDismiss: true,
            });
          }
        }
        if (data.message == "edit") {
          //do something
        }
        if (
          data.message == "delete" &&
          data.data.access.user == props.user.user._id
        ) {
          socket.emit("leave-room", "room" + data.data.access.room);
        }
      });
      /*
    
    
        socket.on('area', function(data){
            if(data.message == 'add'){
                console.log('Socket io Client',data);  
            }
            if(data.message == 'edit'){
                console.log('Socket io Client',data);  
            }
            if(data.message == 'delete'){
                console.log('Socket io Client',data);  
            }
            if(data.message == 'add-monitor'){
                console.log('Socket io Client',data);  
            }
            if(data.message == 'edit-monitor'){
                console.log('Socket io Client',data);  
            }
            if(data.message == 'switch-monitor'){
                console.log('Socket io Client',data);  
            }
            if(data.message == 'delete-monitor'){
                console.log('Socket io Client',data);  
            }
        })
    
    
        socket.on('activate', function(data){
            if(data.message == 'add'){
                console.log('Socket io Client',data); 
            }
            if(data.message == 'delete'){
                console.log('Socket io Client',data);  
            }
        }); */

      socket.on("room", function (data) {
        /*    if(data.message == 'delete'){
                let defaultRoom = getRoomCookieDefault();
                if(defaultRoom)
                    if(defaultRoom.room._id === data.data.room._id){
                        setRoomCookieDefault(null);
                    }
                dispatch(getRoomList(user));
                socket.emit('leave-room', 'room'+data.data.room._id); 
            }
            if(data.message == 'edit'){
                console.log('Socket io Client',data);
                let defaultRoom = getRoomCookieDefault();
                dispatch(getRoomList(user));
                if(defaultRoom.room._id === data.data._id){
                    setRoomCookieDefault({...defaultRoom,room:{
                        _id:    data.data._id,
                        name:   data.data.name
                    }});
                    dispatch(setDefaultRoom(getRoomCookieDefault()));
                    dispatch(getcurrenr.room(data.data._id,user.accessToken));
                }
            } */
      });

      /*  socket.on('structure', function(data){
            if(data.message == 'add'){
                console.log('Socket io Client',data); 
            }
            if(data.message == 'update'){
                console.log('Socket io Client',data);  
            }
        });
     */

      socket.on("disconnect", function () {});
    }

    return () => {
      if (webSocket.current) webSocket.current.disconnect();
    };
  }, [props.user.accessToken, props.currentRoomInfo]);

  return (
    <React.Fragment>
      <div className="media user-profile mt-2 mb-2">
        <img
          src={props.user.user.avatar}
          className="avatar-sm rounded-circle mr-2"
          alt={props.user.user.username}
        />
        <img
          src={props.user.user.avatar}
          className="avatar-xs rounded-circle mr-2"
          alt={props.user.user.username}
        />

        <div className="media-body">
          <h6 className="pro-user-name mt-0 mb-0">
            {props.user.user.fullname}
          </h6>
          <span className="pro-user-desc">{props.user.user.username}</span>
        </div>

        <UncontrolledDropdown className="align-self-center profile-dropdown-menu">
          <DropdownToggle
            data-toggle="dropdown"
            tag="button"
            className="btn btn-link p-0 dropdown-toggle mr-0"
          >
            <FeatherIcon.ChevronDown />
          </DropdownToggle>
          <DropdownMenu
            right
            className="topbar-dropdown-menu profile-dropdown-items"
          >
            <Link to="/account/info" className="dropdown-item notify-item">
              <FeatherIcon.User className="icon-dual icon-xs mr-2" />
              <span>Tài khoản</span>
            </Link>
            <Link to="/account/lock" className="dropdown-item notify-item">
              <FeatherIcon.Lock className="icon-dual icon-xs mr-2" />
              <span>Khóa màn hình</span>
            </Link>
            <DropdownItem divider />
            <Link to="/account/logout" className="dropdown-item notify-item">
              <FeatherIcon.LogOut className="icon-dual icon-xs mr-2" />
              <span>Đăng xuất</span>
            </Link>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </React.Fragment>
  );
};

/**
 * Sidenav
 */
const SideNav = () => {
  return (
    <div className="sidebar-content">
      <div id="sidebar-menu">
        <AppMenu />
      </div>
    </div>
  );
};

class LeftSidebar extends Component {
  menuNodeRef;

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleOtherClick = this.handleOtherClick.bind(this);
  }

  /**
   * Bind event
   */
  componentDidMount = () => {
    document.addEventListener("mousedown", this.handleOtherClick, false);
  };

  /**
   * Bind event
   */
  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.handleOtherClick, false);
  };

  /**
   * Handle the click anywhere in doc
   */
  handleOtherClick = (e) => {
    if (this.menuNodeRef.contains(e.target)) return;
    // else hide the menubar
    if (document.body && isMobileOnly) {
      document.body.classList.remove("sidebar-enable");
    }
  };

  /**
   * Handle click
   * @param {*} e
   * @param {*} item
   */
  handleClick(e) {
    console.log(e);
  }

  render() {
    const isCondensed = this.props.isCondensed || false;
    return (
      <React.Fragment>
        <div
          className="left-side-menu"
          ref={(node) => (this.menuNodeRef = node)}
        >
          <UserProfile {...this.props} />
          {!isCondensed && (
            <PerfectScrollbar>
              <SideNav />
            </PerfectScrollbar>
          )}
          {isCondensed && <SideNav />}
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  const { user, loading, error } = state.Auth;
  const { currentRoomInfo } = state.RoomList;
  return { user, loading, error, currentRoomInfo };
};
export default connect(mapStateToProps, {})(LeftSidebar);
