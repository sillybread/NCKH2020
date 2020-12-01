import {
    GET_ROOM_DATA,
    GET_ROOM_DATA_SUCCESS,
    GET_ROOM_DATA_FAILED,
} from './constants';

const INIT_STATE = {
    loading: false,
};

const RoomData = (state = INIT_STATE, action) =>{
    switch (action.type) {
        case GET_ROOM_DATA:
            return {
                ...state,
                loading: true
            }
        case GET_ROOM_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                errorGetRoomData: false,
                areaData: action.payload.areaData,
                currentData: action.payload.currentData,
                sensorData: action.payload.sensorData
            }
        case GET_ROOM_DATA_FAILED:
            return {
                ...state,
                loading: false,
                errorGetRoomData: action.payload
            }
        default:
            return {...state}
    }
}
export default RoomData;