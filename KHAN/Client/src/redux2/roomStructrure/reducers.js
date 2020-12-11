import {
    GET_CURR_ROOM_SENSOR_MAP,
    GET_CURR_ROOM_SENSOR_MAP_SUCCESS,
    GET_CURR_ROOM_SENSOR_MAP_FAILED,

    ADD_SENSOR,
    ADD_SENSOR_SUCCESS,
    ADD_SENSOR_FAILED,

    UPDATE_SENSOR,
    UPDATE_SENSOR_SUCCESS,
    UPDATE_SENSOR_FAILED,

    DELETE_SENSOR,
    DELETE_SENSOR_SUCCESS,
    DELETE_SENSOR_FAILED,
} from './constants';

const INIT_STATE = {};

const RoomStructrure = (state = INIT_STATE, action) =>{
    switch (action.type) {
        default:
            return {...state}
    }
}
export default RoomStructrure;