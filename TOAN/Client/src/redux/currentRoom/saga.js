import { all, call, fork, takeEvery, put } from 'redux-saga/effects';

import {
    GET_CURR_ROOM,
    GET_CURR_ROOM_SUCCESS,
    GET_CURR_ROOM_FAILED,
} from './constants';

import {
    getCurrentRoom as getCurrentRoomAction,
    getCurrentRoomSuccess as getCurrentRoomSuccessAction,
    getCurrentRoomFailed as getCurrentRoomFailedAction
} from './actions';

function* getCurrentRoom(){
    try{
        yield ()=>{}
    } catch (error){}
}

function* getCurrentRoomSuccess(){
    try{
        yield ()=>{}
    } catch (error){}
}
function* getCurrentRoomFailed(){
    try{
        yield ()=>{}
    } catch (error){}
}

function * watchGetCurrentRoom(){
    yield takeEvery(GET_CURR_ROOM, getCurrentRoom);
}

function * watchGetCurrentRoomSuccess(){
    yield takeEvery(GET_CURR_ROOM_SUCCESS, getCurrentRoomSuccess);
}

function * watchGetCurrentRoomFailed(){
    yield takeEvery(GET_CURR_ROOM_FAILED, getCurrentRoomFailed);
}


function* CurrentRoomSaga(){
    yield all([
        fork(watchGetCurrentRoom),
        fork(watchGetCurrentRoomSuccess),
        fork(watchGetCurrentRoomFailed)
    ])
}

export default CurrentRoomSaga;