import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledTooltip } from 'reactstrap';
import { Bell } from 'react-feather';
import { useToasts } from 'react-toast-notifications'


import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import NotificationDetail from './notificatonDetail';
import {dateToString} from 'helpers/datetimeCover'
import { showNotification } from 'helpers/webNotification';

const notificationContainerStyle = {
    'maxHeight': '400px'
};


const NotificationDropdown = (props) => {
    const [dropdownOpen,setDropdownOpen] = React.useState(false);
    const [notificationDefault,setNotificationDefault] = React.useState({
        show: false,
        info:{}
    });
    const [notifications,updateNotifications]= React.useState([

        {
            "_id": "5fc792b9dbf667001781b44a",
            "user": "5fc05b70d2b6a82f10235ded",
            "ref": "Area",
            "content": "Cảnh báo nhiệt độ khu vực Khu vuc Tôm Thẻ có nhiệt độ -18.66°C",
            "type": "WARRING_HIGH_TEMPERATURE",
            "obj_id": "5fc06fa1a91004001721b0bc",
            "createdAt": "2020-12-02T13:12:25.243Z",
            "updatedAt": "2020-12-02T14:11:18.250Z",
            "__v": 0
          },
          {
            "_id": "5fc7a090afd08400177f44e2",
            "user": "5fc05b70d2b6a82f10235ded",
            "ref": "Area",
            "content": "Cảnh báo nhiệt độ khu vực Khu vuc Tôm Thẻ có nhiệt độ -18.33°C",
            "type": "WARRING_LOW_TEMPERATURE",
            "obj_id": "5fc06fa1a91004001721b0bc",
            "createdAt": "2020-12-02T14:11:28.512Z",
            "updatedAt": "2020-12-02T14:38:22.689Z",
            "__v": 0
          },
          {
            "_id": "5fc7af9af42c7b00172afd18",
            "user": "5fc05b70d2b6a82f10235ded",
            "ref": "Area",
            "content": "Cảnh báo nhiệt độ khu vực Khu vuc Tôm Thẻ có nhiệt độ -18.33°C",
            "type": "WARRING_LOW_TEMPERATURE",
            "obj_id": "5fc06fa1a91004001721b0bc",
            "createdAt": "2020-12-02T15:15:38.802Z",
            "updatedAt": "2020-12-02T15:46:29.139Z",
            "__v": 0
          },
          {
            "_id": "5fc7bf72929ee70017cab40b",
            "user": "5fc05b70d2b6a82f10235ded",
            "ref": "Access",
            "content": "Lời mời cộng tác",
            "type": "Access-Invite",
            "obj_id": "5fc06fa1a91004001721b0bc",
            "createdAt": "2020-12-02T16:23:14.284Z",
            "updatedAt": "2020-12-02T16:54:00.061Z",
            "__v": 0
          },
          {
            "_id": "5fc7cf45fbff8c0017b6b8a3",
            "user": "5fc05b70d2b6a82f10235ded",
            "ref": "Area",
            "content": "Cảnh báo nhiệt độ khu vực Khu vuc Tôm Thẻ có nhiệt độ -18.33°C",
            "type": "WARRING_LOW_TEMPERATURE",
            "obj_id": "5fc06fa1a91004001721b0bc",
            "createdAt": "2020-12-02T17:30:45.510Z",
            "updatedAt": "2020-12-02T18:01:32.080Z",
            "__v": 0
          },
          {
            "_id": "5fc7df153faa410017ce20ed",
            "user": "5fc05b70d2b6a82f10235ded",
            "ref": "Area",
            "content": "Cảnh báo nhiệt độ khu vực Khu vuc Tôm Thẻ có nhiệt độ -18.33°C",
            "type": "WARRING_LOW_TEMPERATURE",
            "obj_id": "5fc06fa1a91004001721b0bc",
            "createdAt": "2020-12-02T18:38:13.953Z",
            "updatedAt": "2020-12-02T19:08:59.591Z",
            "__v": 0
          },
          {
            "_id": "5fc7eee2b6cf310017541039",
            "user": "5fc05b70d2b6a82f10235ded",
            "ref": "Area",
            "content": "Cảnh báo nhiệt độ khu vực Khu vuc Tôm Thẻ có nhiệt độ -18.33°C",
            "type": "WARRING_LOW_TEMPERATURE",
            "obj_id": "5fc06fa1a91004001721b0bc",
            "createdAt": "2020-12-02T19:45:38.334Z",
            "updatedAt": "2020-12-02T20:16:23.674Z",
            "__v": 0
          },
          {
            "_id": "5fc7feb23101ca0017ca8af9",
            "user": "5fc05b70d2b6a82f10235ded",
            "ref": "System",
            "content": "Hanh dog",
            "type": "SUCCESS",
            "obj_id": "5fc06fa1a91004001721b0bc",
            "createdAt": "2020-12-02T20:53:06.229Z",
            "updatedAt": "2020-12-02T21:23:51.710Z",
            "__v": 0
          },
          {
            "_id": "5fc80e7e683aeb0017b8b292",
            "user": "5fc05b70d2b6a82f10235ded",
            "ref": "System",
            "content": "Lỗi hệ thông",
            "type": "ERRO",
            "obj_id": "5fc06fa1a91004001721b0bc",
            "createdAt": "2020-12-02T22:00:30.822Z",
            "updatedAt": "2020-12-02T22:31:16.535Z",
            "__v": 0
          },
          {
            "_id": "5fc81e549c38c80017f7ceed",
            "user": "5fc05b70d2b6a82f10235ded",
            "ref": "Area",
            "content": "Cảnh báo nhiệt độ khu vực Khu vuc Tôm Thẻ có nhiệt độ -18.33°C",
            "type": "WARRING_LOW_TEMPERATURE",
            "obj_id": "5fc06fa1a91004001721b0bc",
            "createdAt": "2020-12-02T23:08:04.957Z",
            "updatedAt": "2020-12-02T23:38:51.363Z",
            "__v": 0
          },
          {
            "_id": "5fc82e29d2689100174c6bb4",
            "user": "5fc05b70d2b6a82f10235ded",
            "ref": "Area",
            "content": "Cảnh báo nhiệt độ khu vực Khu vuc Tôm Thẻ có nhiệt độ -18.33°C",
            "type": "WARRING_LOW_TEMPERATURE",
            "obj_id": "5fc06fa1a91004001721b0bc",
            "createdAt": "2020-12-03T00:15:37.221Z",
            "updatedAt": "2020-12-03T00:46:23.103Z",
            "__v": 0
          },
          {
            "_id": "5fc83df77629d300177e65ee",
            "user": "5fc05b70d2b6a82f10235ded",
            "ref": "Area",
            "content": "Cảnh báo nhiệt độ khu vực Khu vuc Tôm Thẻ có nhiệt độ -18.33°C",
            "type": "WARRING_LOW_TEMPERATURE",
            "obj_id": "5fc06fa1a91004001721b0bc",
            "createdAt": "2020-12-03T01:23:03.545Z",
            "updatedAt": "2020-12-03T01:53:49.728Z",
            "__v": 0
          },
          {
            "_id": "5fc84dc79d112e00178c9390",
            "user": "5fc05b70d2b6a82f10235ded",
            "ref": "Area",
            "content": "Cảnh báo nhiệt độ khu vực Khu vuc Tôm Thẻ có nhiệt độ -18.33°C",
            "type": "WARRING_LOW_TEMPERATURE",
            "obj_id": "5fc06fa1a91004001721b0bc",
            "createdAt": "2020-12-03T02:30:31.928Z",
            "updatedAt": "2020-12-03T03:01:17.622Z",
            "__v": 0
          },
          {
            "_id": "5fc85d97972c630017ab7ee1",
            "user": "5fc05b70d2b6a82f10235ded",
            "ref": "Area",
            "content": "Khác độ khu vực Khu vuc Tôm Thẻ có nhiệt độ -18.33°C",
            "type": "WARRING_LOW_fgdTEMPERATURE",
            "obj_id": "5fc06fa1a91004001721b0bc",
            "createdAt": "2020-12-03T03:37:59.091Z",
            "updatedAt": "2020-12-03T04:08:44.836Z",
            "__v": 0
          },
          {
            "_id": "5fc86d65db57ae0017b4f89a",
            "user": "5fc05b70d2b6a82f10235ded",
            "ref": "Area",
            "content": "Cảnh báo nhiệt độ khu vực Khu vuc Tôm Thẻ có nhiệt độ -18.33°C",
            "type": "WARRING_LOW_TEMPERATURE",
            "obj_id": "5fc06fa1a91004001721b0bc",
            "createdAt": "2020-12-03T04:45:25.854Z",
            "updatedAt": "2020-12-03T05:16:11.386Z",
            "__v": 0
          },
          {
            "_id": "5fc87d4a5b808d00173594b7",
            "user": "5fc05b70d2b6a82f10235ded",
            "ref": "Area",
            "content": "Cảnh báo nhiệt độ khu vực Khu vuc Tôm Thẻ có nhiệt độ -18.33°C",
            "type": "WARRING_LOW_TEMPERATURE",
            "obj_id": "5fc06fa1a91004001721b0bc",
            "createdAt": "2020-12-03T05:53:14.263Z",
            "updatedAt": "2020-12-03T06:24:01.744Z",
            "__v": 0
          },
          {
            "_id": "5fc88d30c01f07001779348f",
            "user": "5fc05b70d2b6a82f10235ded",
            "ref": "Area",
            "content": "Cảnh báo nhiệt độ khu vực Khu vuc Tôm Thẻ có nhiệt độ -18.33°C",
            "type": "WARRING_LOW_TEMPERATURE",
            "obj_id": "5fc06fa1a91004001721b0bc",
            "createdAt": "2020-12-03T07:01:04.606Z",
            "updatedAt": "2020-12-03T07:31:51.442Z",
            "__v": 0
          },
          {
            "_id": "5fc89d0307fd370017be307d",
            "user": "5fc05b70d2b6a82f10235ded",
            "ref": "Area",
            "content": "Cảnh báo nhiệt độ khu vực Khu vuc Tôm Thẻ có nhiệt độ -18.33°C",
            "type": "WARRING_LOW_TEMPERATURE",
            "obj_id": "5fc06fa1a91004001721b0bc",
            "createdAt": "2020-12-03T08:08:35.309Z",
            "updatedAt": "2020-12-03T08:39:21.060Z",
            "__v": 0
          },
          {
            "_id": "5fc8acdc3dc9e80017265db3",
            "user": "5fc05b70d2b6a82f10235ded",
            "ref": "Area",
            "content": "Cảnh báo nhiệt độ khu vực Khu vuc Tôm Thẻ có nhiệt độ -18.33°C",
            "type": "WARRING_LOW_TEMPERATURE",
            "obj_id": "5fc06fa1a91004001721b0bc",
            "createdAt": "2020-12-03T09:16:12.501Z",
            "updatedAt": "2020-12-03T09:46:58.359Z",
            "__v": 0
          },
          {
            "_id": "5fc8bcb3adf3460017030764",
            "user": "5fc05b70d2b6a82f10235ded",
            "ref": "Area",
            "content": "Cảnh báo nhiệt độ khu vực Khu vuc Tôm Thẻ có nhiệt độ -18.33°C",
            "type": "WARRING_LOW_TEMPERATURE",
            "obj_id": "5fc06fa1a91004001721b0bc",
            "createdAt": "2020-12-03T10:23:47.197Z",
            "updatedAt": "2020-12-03T10:54:34.859Z",
            "__v": 0
          },
          {
            "_id": "5fc8cc844fdaf6001751f1b8",
            "user": "5fc05b70d2b6a82f10235ded",
            "ref": "Area",
            "content": "Cảnh báo nhiệt độ khu vực Khu vuc Tôm Thẻ có nhiệt độ -18.33°C",
            "type": "WARRING_LOW_TEMPERATURE",
            "obj_id": "5fc06fa1a91004001721b0bc",
            "createdAt": "2020-12-03T11:31:16.609Z",
            "updatedAt": "2020-12-03T12:02:02.229Z",
            "__v": 0
          },
          {
            "_id": "5fc8dc51fa63a60017e17171",
            "user": "5fc05b70d2b6a82f10235ded",
            "ref": "Area",
            "content": "Cảnh báo nhiệt độ khu vực Khu vuc Tôm Thẻ có nhiệt độ -18.33°C",
            "type": "WARRING_LOW_TEMPERATURE",
            "obj_id": "5fc06fa1a91004001721b0bc",
            "createdAt": "2020-12-03T12:38:41.121Z",
            "updatedAt": "2020-12-03T13:09:26.840Z",
            "__v": 0
          }
    ])



    /*:: toggleDropdown: () => void */
   const  toggleDropdown = ()=> {
        setDropdownOpen(!dropdownOpen);
    }
    const toggleNotification = ()=> {
        setNotificationDefault(
            {...notificationDefault,show: !notificationDefault.show}
        );
    }
    const ShowNotification = (item)=>{
        setNotificationDefault(
            {
                info:item,
                show: !notificationDefault.show
            }
        );
    }

    return (
        <React.Fragment>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="notification-list" tag='div' id="notiDropdown">
            <DropdownToggle
                data-toggle="dropdown"
                tag="a"
                className="nav-link dropdown-toggle" onClick={toggleDropdown} aria-expanded={dropdownOpen}>
                <Bell />
                <span className="noti-icon-badge"></span>
            </DropdownToggle>
            <DropdownMenu right className="dropdown-lg">
                <div onClick={toggleDropdown}>
                    <div className="dropdown-item noti-title border-bottom">
                        <h5 className="m-0 font-size-16">
                            <span className="float-right">
                                <Clear/>                                        
                            </span>Thông báo
                            </h5>
                    </div>
                </div>
                    <PerfectScrollbar style={notificationContainerStyle}>
                        {notifications.map((item, i) => {
                            return (<GetNotification i={i} item={item} openNotification={(value)=>ShowNotification(value)}></GetNotification>)
                        })}
                    </PerfectScrollbar>
                
            </DropdownMenu>
        </Dropdown>
        <UncontrolledTooltip placement="left" target="notiDropdown">{notifications.length} thông báo mới</UncontrolledTooltip>
        <NotificationDetail 
            isOpen={notificationDefault.show} 
            toggle={toggleNotification}
            content={notificationDefault.info}
        ></NotificationDetail>

        </React.Fragment>
    );
}

const Clear = ()=>{
    const { addToast } = useToasts();
    return(
    <Link className="text-dark" onClick={()=>{
        addToast('Đã xóa toàn bộ thông báo', {
            appearance: 'success',
            autoDismiss: true,
          });
          showNotification('Quản lý nhiệt độ kho lạnh','Đã xóa toàn bộ thông báo');
    }}>
    <small>Xóa hết</small>
    </Link>
    );
}
const GetNotification = (props)=>{
    const getIcon = () =>{
        let icon;
        let color;
        let title;
        switch(props.item.type){
            case 'WARRING_LOW_TEMPERATURE':
              icon = 'uil  uil-temperature-minus';
              color ='warning';
              title = 'Cảnh báo nhiệt độ thấp';
              break;
            case 'WARRING_HIGH_TEMPERATURE':
              icon = 'uil  uil-temperature-plus';
              color ='danger';
              title = 'Cảnh báo nhiệt độ cao';
              break;
            case 'Access-Invite':
              icon = 'uil uil-envelope-add';
              color ='success';
              title = 'Lời mời cộng tác';
              break;
            case 'SUCCESS':
              icon = 'uil uil-check';
              color ='success';
              title = 'Thành công';
              break;
            case 'ERRO':
              icon = 'uil uil-times';
              color ='danger';
              title = 'Lỗi';
              break;
  
            default:
              icon = 'uil  uil-exclamation-triangle';
              color ='warning';
              title = 'Thông báo';
            break;
        }
        return {
          icon: icon,
          color: color,
          title: title
        }
    }
    return ( 
    <Link  onClick={()=>{props.openNotification(props.item)}} className="dropdown-item notify-item" key={props.i + "-noti"}>
    <div className={`notify-icon bg-${getIcon().color}`}>
        <i className={getIcon().icon}></i>
    </div>
    <p className="notify-details">{getIcon().title}
        <small>{props.item.content}</small>
        <small className="text-muted" >{dateToString(props.item.updatedAt)}</small>
    </p>
     </Link>);
}

export default NotificationDropdown;