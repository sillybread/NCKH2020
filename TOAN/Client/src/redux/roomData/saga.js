import { all, call, fork, takeEvery, put } from 'redux-saga/effects';

import {
    GET_AREA_DATA,
    GET_CURRENT_DATA,
    GET_SENSOR_DATA,
} from './constants';

import {
    getAreaDataSuccess,
    getAreaDataFailed,
    getCurrentDataSuccess,
    getCurrentDataFailed,
    getSensorDataSuccess,
    getSensorDataFailed,
} from './actions';

import {requestApi} from 'helpers/api'

function* getAreaData({payload: {token, room_id}}){
    try{
        const res = yield call(requestApi,{
            method: 'get',
            headers: {
                'x-access-token': token
            },
            url: 'api/room/data/area',
            params: {
                room_id
            }
        });
        if (res.status === "success"){
            yield put(getAreaDataSuccess(res.result.areas))
        } else {
            yield put(getAreaDataFailed(res.result))
        }
    } catch (error){}
}

function* getCurrentData({payload:{token, room_id}}){
    try{
        const res = yield call(requestApi,{
            method: 'get',
            headers: {
                'x-access-token': token
            },
            url: 'api/room/data/current',
            params: {
                room_id
            }
        });
        if (res.status === "success"){
            yield put(getCurrentDataSuccess(res.result.data))
        } else {
            yield put(getCurrentDataFailed(res.result))
        }
    } catch (error){}
}
function* getSensorData({payload: {token, room_id}}){
    try{
        const res = yield call(requestApi,{
            method: 'get',
            headers: {
                'x-access-token': token
            },
            url: 'api/room/data/sensor',
            params: {
                room_id
            }
        });
        if (res.status === "success"){
            yield put(getSensorDataSuccess(res.result.data))
        } else {
            yield put(getSensorDataFailed(res.result))
        }
    } catch (error){}
}

function * watchGetAreaData(){
    yield takeEvery(GET_AREA_DATA, getAreaData);
}

function * watchGetCurrentData(){
    yield takeEvery(GET_CURRENT_DATA, getCurrentData);
}

function * watchGetSensorData(){
    yield takeEvery(GET_SENSOR_DATA, getSensorData);
}

function* RoomDataSaga(){
    yield all([
        fork(watchGetAreaData),
        fork(watchGetCurrentData),
        fork(watchGetSensorData),
    ])
}

export default RoomDataSaga;