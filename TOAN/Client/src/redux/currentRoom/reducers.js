import {
    GET_CURR_ROOM,
    GET_CURR_ROOM_SUCCESS,
    GET_CURR_ROOM_FAILED,
} from './constants';

const INIT_STATE = {
    loading: false
};

const CurrentRoom = (state = INIT_STATE, action) =>{
    switch (action.type) {
        case GET_CURR_ROOM:
            return {
                ...state,
                loading: true
            }
        case GET_CURR_ROOM_SUCCESS:
            const {
                info,
                access,
                sensorMap,
                area,
                activate,
                sensorList
            } = action.payload
            return {
                ...state,
                loading: false,
                errorGetRoomList: false,
                info,
                access,
                sensorMap,
                area,
                activate,
                sensorList
            }
        case GET_CURR_ROOM_FAILED:
            return {
                ...state,
                loading: false,
                errorGetRoomList: action.payload
            }
        default:
            return {...state}
    }
}
export default CurrentRoom;