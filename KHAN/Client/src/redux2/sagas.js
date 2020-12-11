// @flow
import { all } from 'redux-saga/effects';

import authSaga           from './auth/saga';
import layoutSaga         from './layout/saga';
import appMenuSaga        from './appMenu/saga';
/* import roomDataSaga       from './roomData/saga'; */
import roomListSaga       from './roomList/saga';
/* import notificationSaga   from './notification/saga';
import roomAccessSaga     from './roomAccess/saga';
import roomActivateSaga   from './roomActivate/saga';
import roomAreaSaga       from './roomArea/saga';
import roomSensorSaga     from './roomSensor/saga';
import roomStructrureSaga from './roomStructrure/saga'; */

export default function* rootSaga(getState) {
    yield all([
        authSaga(),          
        layoutSaga(),       
        appMenuSaga(),        
      /*   roomDataSaga(),  */      
        roomListSaga(),       
        /* notificationSaga(),   
        roomAccessSaga(),     
        roomActivateSaga(),   
        roomAreaSaga(),       
        roomSensorSaga(),     
        roomStructrureSaga(),  */
    ]);
}
