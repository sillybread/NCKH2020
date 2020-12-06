import { all, call, fork, takeEvery, put } from 'redux-saga/effects';
import { requestApi } from 'helpers/api';
import {
    CREATE_ROOM,
    CREATE_ROOM_SUCCESS,
    GET_ROOM_LIST
} from './constants';

import {
    getRoomListSuccess,
    getRoomListFailed,
    createRoomSuccess,
    createRoomFailed
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


function * watchGetRoomList(){
    yield takeEvery(GET_ROOM_LIST, getRoomList);
}
function * watchCreateRoom(){
    yield takeEvery(CREATE_ROOM, newRoom);
}
function * watchCreateRoomSuccess(){
    yield takeEvery(CREATE_ROOM_SUCCESS, getRoomList);
}

function* RoomListSaga(){
    yield all([
        fork(watchGetRoomList),fork(watchCreateRoom),fork(watchCreateRoomSuccess)
    ])
}

export default RoomListSaga;