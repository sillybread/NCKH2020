import { all, call, fork, takeEvery, put } from 'redux-saga/effects';
import {requestApi} from 'helpers/api';
import {
    GET_NOTIFICATION_LIST,
    DELETE_NOTIFICATION,
    DELETE_ALL_NOTIFICATION,
} from './constants';

import {
    getNotificationListSuccess,
    getNotificationListFailed,
    deleteNotificationSuccess,
    deleteNotificationFailed,
    deleteAllNotificationSuccess,
    deleteAllNotificationFailed,
    updateNotification,
} from './actions';

function * getNotificationList({payload: {token}}){
    const res = yield requestApi({
        method: 'get',
        headers: {
            'x-access-token': token
        },
        url: 'api/notification/all'
    });
    if (res.status === 'success'){
        yield put(getNotificationListSuccess(res.result.notifications));
    } else {
        yield put(getNotificationListFailed(res.result));
    }
}

function * deleteNotification({payload: {token, notification_id}}){
    const res = yield requestApi({
        method: 'delete',
        headers: {
            'x-access-token': token
        },
        url: 'api/notification',
        params: {
            notification_id
        }
    })
    if (res.status === 'success'){
        yield put(deleteNotificationSuccess(notification_id));
    } else {
        yield put(deleteNotificationFailed(res.result));
    }
}

function * deleteAllNotification({payload: {token}}){
    const res = yield requestApi({
        method: 'delete',
        headers: {
            'x-access-token': token
        },
        url: 'api/notification/all'
    })
    if (res.status === 'success'){
       yield put(deleteAllNotificationSuccess(res.result));
    } else {
        yield  put(deleteAllNotificationFailed(res.result));
    }
}

function * watchGetNotification(){
    yield takeEvery(GET_NOTIFICATION_LIST, getNotificationList)
}
function * watchDeleteNotification(){
    yield takeEvery(DELETE_NOTIFICATION, deleteNotification)
}
function * watchDeleteAllNotification(){
    yield takeEvery(DELETE_ALL_NOTIFICATION, deleteAllNotification)
}

function * Notification(){
    yield all([
        fork(watchGetNotification),
        fork(watchDeleteNotification),
        fork(watchDeleteAllNotification),
    ])
}

export default Notification;