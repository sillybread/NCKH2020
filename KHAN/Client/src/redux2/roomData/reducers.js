import {
    GET_AREA_DATA,
    GET_AREA_DATA_SUCCESS,
    GET_AREA_DATA_FAILED,

    GET_CURRENT_DATA,
    GET_CURRENT_DATA_SUCCESS,
    GET_CURRENT_DATA_FAILED,

    GET_SENSOR_DATA,
    GET_SENSOR_DATA_SUCCESS,
    GET_SENSOR_DATA_FAILED,

    GET_CUBE_DATA,
    GET_CUBE_DATA_SUCCESS,
    GET_CUBE_DATA_FAILED,
} from './constants';
const INIT_STATE = {};
const RoomData = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_AREA_DATA:
            return {
                ...state,
            }
        case GET_AREA_DATA_SUCCESS:
         
            let cr = (state.areaData)?[...state.areaData]: new Array();
             cr.push(action.payload);
            if(cr.length >10){
                cr.shift()
            } 
            return {
                ...state,
                areaData: cr
            }
        case GET_AREA_DATA_FAILED:
            return {
                ...state,
                areaData:null,
                error: action.payload
            }
        case GET_CURRENT_DATA:
            return {
                ...state,
            }
        case GET_CURRENT_DATA_SUCCESS:
            return {
                ...state,
                currentData: action.payload
            }
        case GET_CURRENT_DATA_FAILED:
            return {
                ...state,
                currentData:null,
                error: action.payload
            }
        case GET_SENSOR_DATA:
            return {
                ...state,
            }
        case GET_SENSOR_DATA_SUCCESS:
            return {
                ...state,
                sensorData: action.payload
            }
        case GET_SENSOR_DATA_FAILED:
            return {
                ...state,
                sensorData: null,
                error: action.payload
            }
        case GET_CUBE_DATA:
            return {
                ...state,
            }
        case GET_CUBE_DATA_SUCCESS:
            return {
                ...state,
                cubeData: action.payload
            }
        case GET_CUBE_DATA_FAILED:
            return {
                ...state,
                cubeData: null,
                error: action.payload
            }
        default:
            return {
                ...state,
            }
    }
}
export default RoomData;