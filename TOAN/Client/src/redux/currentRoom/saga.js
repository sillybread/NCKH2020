import { all, call, fork, takeEvery, put } from 'redux-saga/effects';
import {
    GET_CURR_ROOM_INFO,
} from './constants';
import {
    getCurrentRoomInfoSuccess,
    getCurrentRoomInfoFailed
} from './actions';
import {requestApi} from 'helpers/api';

function aGet(token, url, params){
    return call(requestApi, {
        method: 'get',
        headers: {
            'x-access-token': token,
        },
        url,
        params
    });
}

function* getCurrentRoomInfo({payload: {room_id, token}}){
    try{
        const res = yield aGet(token, 'api/room', {room_id});
        if (res.status==='success'){
            yield put(getCurrentRoomInfoSuccess({ info: res.result.room}));
        } else {
            yield put(getCurrentRoomInfoFailed(res.result));
        }
    } catch (error){}
}

function * watchGetCurrentRoomInfo(){
    yield takeEvery(GET_CURR_ROOM_INFO, getCurrentRoomInfo);
}


function* CurrentRoomSaga(){
    yield all([
        fork(watchGetCurrentRoomInfo),
    ])
}

export default CurrentRoomSaga;