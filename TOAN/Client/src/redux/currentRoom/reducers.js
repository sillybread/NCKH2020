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

const INIT_STATE = {};

const CurrentRoom = (state = INIT_STATE, action) =>{
    switch (action.type) {
        case GET_CURR_ROOM_INFO:
            return {
                ...state,
            }
        case GET_CURR_ROOM_INFO_SUCCESS:
            return {
                ...state,
                info: action.payload
            }
        case GET_CURR_ROOM_INFO_FAILED:
            return {
                ...state,
                info: null,
                error: action.payload
            }
        case GET_CURR_ROOM_AREA:
            return {
                ...state,
            }
        case GET_CURR_ROOM_AREA_SUCCESS:
            return {
                ...state,
                area: action.payload
            }
        case GET_CURR_ROOM_AREA_FAILED:
            return {
                ...state,
                area: null,
                error: action.payload
            }
        case GET_CURR_ROOM_ACCESS:
            return {
                ...state,
            }
        case GET_CURR_ROOM_ACCESS_SUCCESS:
            return {
                ...state,
                access: action.payload
            }
        case GET_CURR_ROOM_ACCESS_FAILED:
            return {
                ...state,
                access: null,
                error: action.payload
            }
        case GET_CURR_ROOM_ACTIVATE:
            return {
                ...state,
            }
        case GET_CURR_ROOM_ACTIVATE_SUCCESS:
            return {
                ...state,
                activate: action.payload
            }
        case GET_CURR_ROOM_ACTIVATE_FAILED:
            return {
                ...state,
                activate: null,
                error: action.payload
            }
        case GET_CURR_ROOM_SENSOR_MAP:
            return {
                ...state,
            }
        case GET_CURR_ROOM_SENSOR_MAP_SUCCESS:
            return {
                ...state,
                sensorMap: action.payload
            }
        case GET_CURR_ROOM_SENSOR_MAP_FAILED:
            return {
                ...state,
                sensorMap: null,
                error: action.payload
            }
        case GET_CURR_ROOM_SENSOR_LIST:
            return {
                ...state,
            }
        case GET_CURR_ROOM_SENSOR_LIST_SUCCESS:
            return {
                ...state,
                sensorList: action.payload
            }
        case GET_CURR_ROOM_SENSOR_LIST_FAILED:
            return {
                ...state,
                sensorList: null,
                error: action.payload
            }
        default:
            return {...state}
    }
}
export default CurrentRoom;