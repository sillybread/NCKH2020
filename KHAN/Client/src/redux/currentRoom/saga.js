import { all, call, fork, takeEvery, put } from 'redux-saga/effects';
import {
    GET_CURR_ROOM_INFO,
} from './constants';
import {
    getCurrentRoomInfoSuccess,
    getCurrentRoomInfoFailed
} from './actions';
import {requestApi} from 'helpers/api';
import { getAreaData, getCurrentData, getSensorData } from 'redux/roomData/actions';

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
            yield put(getCurrentRoomInfoSuccess(res.result.room));
            yield all([
                put(getAreaData(room_id, token)),
                put(getCurrentData(room_id, token)),
                put(getSensorData(room_id,token))
            ]);
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