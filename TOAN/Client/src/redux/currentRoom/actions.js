import {
    GET_CURR_ROOM_INFO,
    GET_CURR_ROOM_INFO_SUCCESS,
    GET_CURR_ROOM_INFO_FAILED,
    GET_CURR_ROOM_AREA,
    GET_CURR_ROOM_AREA_SUCCESS,
    GET_CURR_ROOM_AREA_FAILED,
    GET_CURR_ROOM_ACCESS,
    GET_CURR_ROOM_ACCESS_SUCCESS,
    GET_CURR_ROOM_ACCESS_FAILED,
    GET_CURR_ROOM_ACTIVATE,
    GET_CURR_ROOM_ACTIVATE_SUCCESS,
    GET_CURR_ROOM_ACTIVATE_FAILED,
    GET_CURR_ROOM_SENSOR_MAP,
    GET_CURR_ROOM_SENSOR_MAP_SUCCESS,
    GET_CURR_ROOM_SENSOR_MAP_FAILED,
    GET_CURR_ROOM_SENSOR_LIST,
    GET_CURR_ROOM_SENSOR_LIST_SUCCESS,
    GET_CURR_ROOM_SENSOR_LIST_FAILED,
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

export const getCurrentRoomArea = (room_id, token) => ({
    type: GET_CURR_ROOM_AREA,
    payload: {
        room_id,
        token
    }
})

export const getCurrentRoomAreaSuccess = (data) => ({
    type: GET_CURR_ROOM_AREA_SUCCESS,
    payload: data
})

export const getCurrentRoomAreaFailed = (error) => ({
    type: GET_CURR_ROOM_AREA_FAILED,
    payload: error
})

export const getCurrentRoomAccess = (room_id, token) => ({
    type: GET_CURR_ROOM_ACCESS,
    payload: {
        room_id,
        token
    }
})

export const getCurrentRoomAccessSuccess = (data) => ({
    type: GET_CURR_ROOM_ACCESS_SUCCESS,
    payload: data
})

export const getCurrentRoomAccessFailed = (error) => ({
    type: GET_CURR_ROOM_ACCESS_FAILED,
    payload: error
})
export const getCurrentRoomActivate = (room_id, token) => ({
    type: GET_CURR_ROOM_ACTIVATE,
    payload: {
        room_id,
        token
    }
})

export const getCurrentRoomActivateSuccess = (data) => ({
    type: GET_CURR_ROOM_ACTIVATE_SUCCESS,
    payload: data
})

export const getCurrentRoomActivateFailed = (error) => ({
    type: GET_CURR_ROOM_ACTIVATE_FAILED,
    payload: error
})
export const getCurrentRoomSensorMap = (room_id, token) => ({
    type: GET_CURR_ROOM_SENSOR_MAP,
    payload: {
        room_id,
        token
    }
})

export const getCurrentRoomSensorMapSuccess = (data) => ({
    type: GET_CURR_ROOM_SENSOR_MAP_SUCCESS,
    payload: data
})

export const getCurrentRoomSensorMapFailed = (error) => ({
    type: GET_CURR_ROOM_SENSOR_MAP_FAILED,
    payload: error
})
export const getCurrentRoomSensorList = (room_id, token) => ({
    type: GET_CURR_ROOM_SENSOR_LIST,
    payload: {
        room_id,
        token
    }
})

export const getCurrentRoomSensorListSuccess = (data) => ({
    type: GET_CURR_ROOM_SENSOR_LIST_SUCCESS,
    payload: data
})

export const getCurrentRoomSensorListFailed = (error) => ({
    type: GET_CURR_ROOM_SENSOR_LIST_FAILED,
    payload: error
})
