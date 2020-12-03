import { combineReducers } from 'redux';
import Layout from './layout/reducers';
import Auth from './auth/reducers';
import AppMenu from './appMenu/reducers';
import AreaInfo from './areaInfo/reducers';
import CurrentRoom from './currentRoom/reducers';
import RoomData from './roomData/reducers';
import RoomList from './roomList/reducers';
import Notification from './notification/reducers';

export default combineReducers({
    Auth,
    AppMenu,
    Layout,
    AreaInfo,
    CurrentRoom,
    RoomData,
    RoomList,
    Notification
});
