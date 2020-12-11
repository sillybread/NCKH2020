import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Layout from './layout/reducers';
import AppMenu from './appMenu/reducers';
/* import RoomData from './roomData/reducers'; */
import RoomList from './roomList/reducers';
/* import Notification from './notification/reducers';
import RoomAccess from './roomAccess/reducers';
import RoomActivate from './roomActivate/reducers';
import RoomArea from './roomArea/reducers';
import RoomSensor from './roomSensor/reducers';
import RoomStructrure from './roomStructrure/reducers'; */

export default combineReducers({
    Auth,
    AppMenu,
    Layout,
  /*   RoomData, */
    RoomList,
   /*  Notification,
    RoomAccess,
    RoomActivate,
    RoomArea,
    RoomSensor,
    RoomStructrure */
});
