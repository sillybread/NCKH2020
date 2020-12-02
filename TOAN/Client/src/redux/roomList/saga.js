import { all, call, fork, takeEvery, put } from 'redux-saga/effects';
import { requestApi } from 'helpers/api';
import {
    GET_ROOM_LIST,
    GET_ROOM_LIST_SUCCESS,
    GET_ROOM_LIST_FAILED,
} from './constants';

import {
    getRoomList as getRoomListAction,
    getRoomListSuccess as getRoomListSuccessAction,
    getRoomListFailed as getRoomListFailedAction
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
            yield put(getRoomListSuccessAction(response.result.accesses));
        } else {
            yield put(getRoomListFailedAction(response.result));
        }
    } catch (error){}
}

function* getRoomListSuccess(){
    try{
        yield ()=>{}
    } catch (error){}
}
function* getRoomListFailed(){
    try{
        yield ()=>{}
    } catch (error){}
}

function * watchGetRoomList(){
    yield takeEvery(GET_ROOM_LIST, getRoomList);
}

function * watchGetRoomListSuccess(){
    yield takeEvery(GET_ROOM_LIST_SUCCESS, getRoomListSuccess);
}

function * watchGetRoomListFailed(){
    yield takeEvery(GET_ROOM_LIST_FAILED, getRoomListFailed);
}


function* RoomListSaga(){
    yield all([
        fork(watchGetRoomList),
        fork(watchGetRoomListSuccess),
        fork(watchGetRoomListFailed)
    ])
}

export default RoomListSaga;