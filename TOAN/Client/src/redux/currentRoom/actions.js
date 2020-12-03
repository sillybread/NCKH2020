import {
    GET_CURR_ROOM_INFO,
    GET_CURR_ROOM_INFO_SUCCESS,
    GET_CURR_ROOM_INFO_FAILED,
} from './constants';

export const getCurrentRoomInfo = (room_id, token) => ({
    type: GET_CURR_ROOM_INFO,
    payload: {
        room_id,
        token
    }
})

export const getCurrentRoomInfoSuccess = (data) => ({
    type: GET_CURR_ROOM_INFO_SUCCESS,
    payload: data
})

export const getCurrentRoomInfoFailed = (error) => ({
    type: GET_CURR_ROOM_INFO_FAILED,
    payload: error
})