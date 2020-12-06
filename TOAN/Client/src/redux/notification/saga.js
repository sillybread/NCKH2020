import { all, call, fork, takeEvery, put } from 'redux-saga/effects';
import {requestApi} from 'helpers/api';
import {
    GET_NOTIFICATION_LIST,
    DELETE_NOTIFICATION,
    DELETE_ALL_NOTIFICATION,
    UPDATE_NOTIFICATION
} from './constants';

import {
    getNotificationListSuccess,
    getNotificationListFailed,
    deleteNotificationSuccess,
    deleteNotificationFailed,
    deleteAllNotificationSuccess,
    deleteAllNotificationFailed,
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
        put(getNotificationListSuccess(res.result.notifications));
    } else {
        put(getNotificationListFailed(res.result));
    }
}

function * deleteNotification({payload: token, notification_id}){
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
        put(deleteNotificationSuccess(res.result));
    } else {
        put(deleteNotificationFailed(res.result));
    }
}

function * deleteAllNotification({payload: token}){
    const res = yield requestApi({
        method: 'delete',
        headers: {
            'x-access-token': token
        },
        url: 'api/notification/all'
    })
    if (res.status === 'success'){
        put(deleteAllNotificationSuccess(res.result));
    } else {
        put(deleteAllNotificationFailed(res.result));
    }
}

function * updateNotification({payload: {id, data}}){

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
function * watchUpdateNotification(){
    yield takeEvery(UPDATE_NOTIFICATION, updateNotification)
}

function * Notification(){
    yield all([
        fork(watchGetNotification),
        fork(watchDeleteNotification),
        fork(watchDeleteAllNotification),
        fork(watchUpdateNotification),
    ])
}

export default Notification;