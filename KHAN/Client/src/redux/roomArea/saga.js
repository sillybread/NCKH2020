import { all, call, fork, takeEvery, put } from 'redux-saga/effects';

import {
    GET_AREA_INFO,
    GET_AREA_INFO_SUCCESS,
    GET_AREA_INFO_FAILED,
} from './constants';

import {
    getAreaInfo as getAreaInfoAction,
    getAreaInfoSuccess as getAreaInfoSuccessAction,
    getAreaInfoFailed as getAreaInfoFailedAction
} from './actions';

function* getAreaInfo(){
    try{
        yield ()=>{}
    } catch (error){}
}

function* getAreaInfoSuccess(){
    try{
        yield ()=>{}
    } catch (error){}
}
function* getAreaInfoFailed(){
    try{
        yield ()=>{}
    } catch (error){}
}

function * watchGetAreaInfo(){
    yield takeEvery(GET_AREA_INFO, getAreaInfo);
}

function * watchGetAreaInfoSuccess(){
    yield takeEvery(GET_AREA_INFO_SUCCESS, getAreaInfoSuccess);
}

function * watchGetAreaInfoFailed(){
    yield takeEvery(GET_AREA_INFO_FAILED, getAreaInfoFailed);
}


function* AreaInfoSaga(){
    yield all([
        fork(watchGetAreaInfo),
        fork(watchGetAreaInfoSuccess),
        fork(watchGetAreaInfoFailed)
    ])
}

export default AreaInfoSaga;