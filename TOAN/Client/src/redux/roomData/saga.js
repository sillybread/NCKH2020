import { all, call, fork, takeEvery, put } from 'redux-saga/effects';

import {
    GET_ROOM_DATA,
    GET_ROOM_DATA_SUCCESS,
    GET_ROOM_DATA_FAILED,
} from './constants';

import {
    getRoomData as getRoomDataAction,
    getRoomDataSuccess as getRoomDataSuccessAction,
    getRoomDataFailed as getRoomDataFailedAction
} from './actions';

function* getRoomData(){
    try{
        yield ()=>{}
    } catch (error){}
}


function * watchGetRoomData(){
    yield takeEvery(GET_ROOM_DATA, getRoomData);
}

function* RoomDataSaga(){
    yield all([
        fork(watchGetRoomData),
    ])
}

export default RoomDataSaga;