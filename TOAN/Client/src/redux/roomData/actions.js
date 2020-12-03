import {
    GET_ROOM_DATA,
    GET_ROOM_DATA_SUCCESS,
    GET_ROOM_DATA_FAILED,
} from './constants';

export const getRoomData = (roomData) => ({
    type: GET_ROOM_DATA,
    payload: roomData
})

export const getRoomDataSuccess = (data) => ({
    type: GET_ROOM_DATA_SUCCESS,
    payload: data
})

export const getRoomDataFailed = (error) => ({
    type: GET_ROOM_DATA_FAILED,
    payload: error
})