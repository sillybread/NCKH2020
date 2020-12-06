// @flow
import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import appMenuSaga from './appMenu/saga';
import areaInfoSaga from './areaInfo/saga'
import currentRoomSaga from './currentRoom/saga'
import roomDataSaga from './roomData/saga'
import roomListSaga from './roomList/saga'
import notificationListSaga from './notification/saga'

export default function* rootSaga(getState) {
    yield all([
        authSaga(),
        layoutSaga(),
        appMenuSaga(),
        areaInfoSaga(),
        currentRoomSaga(),
        roomDataSaga(),
        roomListSaga(),
        notificationListSaga()
    ]);
}
