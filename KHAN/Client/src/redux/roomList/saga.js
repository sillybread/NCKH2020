import { all, call, fork, takeEvery, put } from 'redux-saga/effects';
import { requestApi } from 'helpers/api';
import {
    GET_ROOM_LIST
} from './constants';

import {
    getRoomListSuccess,
    getRoomListFailed
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


function * watchGetRoomList(){
    yield takeEvery(GET_ROOM_LIST, getRoomList);
}


function* RoomListSaga(){
    yield all([
        fork(watchGetRoomList),
    ])
}

export default RoomListSaga;