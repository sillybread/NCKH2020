import { all, call, fork, takeEvery, put } from 'redux-saga/effects';

import {
    GET_CURR_ROOM_INFO,
    GET_CURR_ROOM_AREA,
    GET_CURR_ROOM_ACCESS,
    GET_CURR_ROOM_ACTIVATE,
    GET_CURR_ROOM_SENSOR_MAP,
    GET_CURR_ROOM_SENSOR_LIST,
    ADD_SENSOR,
} from './constants';

import {
    getCurrentRoomInfoSuccess,
    getCurrentRoomInfoFailed,
    getCurrentRoomAreaSuccess,
    getCurrentRoomAreaFailed,
    getCurrentRoomAccessSuccess,
    getCurrentRoomAccessFailed,
    getCurrentRoomActivateSuccess,
    getCurrentRoomActivateFailed,
    getCurrentRoomSensorMapSuccess,
    getCurrentRoomSensorMapFailed,
    getCurrentRoomSensorListSuccess,
    getCurrentRoomSensorListFailed,
} from './actions';

import {requestApi} from 'helpers/api';
import { getAreaData, getCurrentData, getCurrentDataFailed, getSensorData } from 'redux/roomData/actions';

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

function * getCurrentRoomArea({payload: {room_id, token}}){
    try{
        const res = yield aGet(token, 'api/room/area/all', {room_id});
        if (res.status==='success'){
            yield put(getCurrentRoomAreaSuccess(res.result.areas));
        } else {
            yield put(getCurrentRoomAreaFailed(res.result));
        }
    } catch (error){}
}
function * getCurrentRoomAccess({payload: {room_id, token}}){
    try{
        const res = yield aGet(token, 'api/room/access', {room_id});
        if (res.status==='success'){
            yield put(getCurrentRoomAccessSuccess(res.result.accesses));
        } else {
            yield put(getCurrentRoomAccessFailed(res.result));
        }
    } catch (error){}
}
function * getCurrentRoomActivate({payload: {room_id, token}}){
    try{
        const res = yield aGet(token, 'api/room/activate/all', {room_id});
        if (res.status==='success'){
            yield put(getCurrentRoomActivateSuccess(res.result.activates));
        } else {
            yield put(getCurrentRoomActivateFailed(res.result));
        }
    } catch (error){}
}
function * getCurrentRoomSensorMap({payload: {room_id, token}}){
    try{
        const res = yield aGet(token, 'api/room/structure', {room_id});
        if (res.status==='success'){
            yield put(getCurrentRoomSensorMapSuccess(res.result.structure));
        } else {
            yield put(getCurrentRoomSensorMapFailed(res.result));
        }
    } catch (error){}
}
function * getCurrentRoomSensorList({payload: {room_id, token}}){
    try{
        const res = yield aGet(token, 'api/room/sensor/all', {room_id});
        if (res.status==='success'){
            yield put(getCurrentRoomSensorListSuccess(res.result.sensors));
        } else {
            yield put(getCurrentRoomSensorListFailed(res.result));
        }
    } catch (error){}
}

function * addSensor({payload: {sensor_id, location}}){
   /*  try{
        const res = yield aGet(token, 'api/room/structure', {room_id});
        if (res.status==='success'){
            yield put(getCurrentRoomSensorMapSuccess(res.result.structure));
        } else {
            yield put(getCurrentRoomSensorMapFailed(res.result));
        }
    } catch (error){} */
}






function * watchGetCurrentRoomInfo(){
    yield takeEvery(GET_CURR_ROOM_INFO, getCurrentRoomInfo);
}

function * watchGetCurrentRoomArea(){
    yield takeEvery(GET_CURR_ROOM_AREA, getCurrentRoomArea);
}

function * watchGetCurrentRoomAccess(){
    yield takeEvery(GET_CURR_ROOM_ACCESS, getCurrentRoomAccess);
}

function * watchGetCurrentRoomActivate(){
    yield takeEvery(GET_CURR_ROOM_ACTIVATE, getCurrentRoomActivate);
}

function * watchGetCurrentRoomSensorMap(){
    yield takeEvery(GET_CURR_ROOM_SENSOR_MAP, getCurrentRoomSensorMap);
}

function * watchGetCurrentRoomSensorList(){
    yield takeEvery(GET_CURR_ROOM_SENSOR_LIST, getCurrentRoomSensorList);
}

function * watchAddSensor(){
    yield takeEvery(ADD_SENSOR, addSensor);
}


function* CurrentRoomSaga(){
    yield all([
        fork(watchGetCurrentRoomInfo),
        fork(watchGetCurrentRoomArea),
        fork(watchGetCurrentRoomAccess),
        fork(watchGetCurrentRoomActivate),
        fork(watchGetCurrentRoomSensorMap),
        fork(watchGetCurrentRoomSensorList),
        fork(watchAddSensor),
    ])
}

export default CurrentRoomSaga;