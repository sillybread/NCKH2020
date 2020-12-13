import {
    GET_SENSORS,
    GET_SENSORS_SUCCESS,
    GET_SENSORS_FAILED,

    GET_SENSORS_NOT_USED,
    GET_SENSORS_NOT_USED_SUCCESS,
    GET_SENSORS_NOT_USED_FAILED,
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

            
        case ADD_SENSOR:
            return {
                ...state,
                loading: true,
                action_name: ADD_SENSOR
            }
        case ADD_SENSOR_SUCCESS:
            return {
                ...state,
                loading: false,
                sensorMap: action.payload.structure,
                action_name: ADD_SENSOR_SUCCESS
            }
        case ADD_SENSOR_FAILED:
            return {
                ...state,
                loading: false,
                action_name: ADD_SENSOR_FAILED
            }
        default:
            return {...state}
    }
}
export default CurrentRoom;