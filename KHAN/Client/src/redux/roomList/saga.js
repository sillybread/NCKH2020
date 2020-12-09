import { all, call, fork, takeEvery, put } from 'redux-saga/effects';
import { requestApi } from 'helpers/api';
import {
    CREATE_ROOM,
    CREATE_ROOM_SUCCESS,
    DELETE_ROOM,
    GET_ROOM_LIST,
    UPDATE_ROOM,
} from './constants';

import {
    getRoomListSuccess,
    getRoomListFailed,
    createRoomSuccess,
    createRoomFailed,
    updateRoomFailed,
    updateRoomSuccess,
    deleteRoomSuccess,
    deleteRoomFailed
} from './actions';

function* getRoomList({payload: user}){
    try{
        const response = yield call(requestApi, {
            method: 'get',
            headers: {
                'x-access-token': user.accessToken,
            },
            url: 'api/room/access/all'
        });
        if (response.status=="success"){
            yield put(getRoomListSuccess(response.result.accesses));
        } else {
            yield put(getRoomListFailed(response.result));
        }
    } catch (error){}
}

function* newRoom({ payload: {user,room} }) {
    const options = {
        method: 'post',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': user.accessToken
         },
        data:room,
        url : 'api/room/create'
    };

    try {
        const response = yield call(requestApi,options);
        if (response.status==='success') {
            yield put(createRoomSuccess(user));
        } else {
            yield put(createRoomFailed(response.result));
        }
    } catch (error) {
        yield put(createRoomFailed(error));
    }
}

function* updateRoom({ payload: {user,room_id,room_info} }) {
    const options = {
        method: 'post',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': user.accessToken
         },
        data:{room_id: room_id,...room_info},
        url : 'api/room/edit'
    };

    try {
        const response = yield call(requestApi,options);
        if (response.status==='success') {
            yield put(updateRoomSuccess(response.result.room));
        } else {
            yield put(updateRoomFailed(response.result));
        }
    } catch (error) {
        yield put(updateRoomFailed(error));
    }
}
function* deleteRoom({ payload: {user,room_id} }) {
    const options = {
        method: 'delete',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': user.accessToken
         },
        data:{room_id},
        url : 'api/room/'
    };

    try {
        const response = yield call(requestApi,options);
        if (response.status==='success') {
            yield put(deleteRoomSuccess(response.result.room));
        } else {
            yield put(deleteRoomFailed(response.result));
        }
    } catch (error) {
        yield put(deleteRoomFailed(error));
    }
}


function * watchGetRoomList(){
    yield takeEvery(GET_ROOM_LIST, getRoomList);
}
function * watchCreateRoom(){
    yield takeEvery(CREATE_ROOM, newRoom);
}
function * watchCreateRoomSuccess(){
    yield takeEvery(CREATE_ROOM_SUCCESS, getRoomList);
}
function * watchUpdateRoom(){
    yield takeEvery(UPDATE_ROOM, updateRoom);
}
function * watchDeleteRooms(){
    yield takeEvery(DELETE_ROOM, deleteRoom);
}

function* RoomListSaga(){
    yield all([
        fork(watchGetRoomList),fork(watchCreateRoom),fork(watchCreateRoomSuccess),fork(watchUpdateRoom),fork(watchDeleteRooms)
    ])
}

export default RoomListSaga;