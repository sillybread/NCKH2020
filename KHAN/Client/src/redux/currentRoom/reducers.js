import {
    GET_CURR_ROOM_INFO,
    GET_CURR_ROOM_INFO_SUCCESS,
    GET_CURR_ROOM_INFO_FAILED,
} from './constants';

const INIT_STATE = {
    loading: false
};

const CurrentRoom = (state = INIT_STATE, action) =>{
    switch (action.type) {
        case GET_CURR_ROOM_INFO:
            return {
                ...state,
                loading: true
            }
        case GET_CURR_ROOM_INFO_SUCCESS:
            return {
                ...state,
                info: action.payload
            }
        case GET_CURR_ROOM_INFO_FAILED:
            return {
                ...state,
                loading: false,
                errorGetCurrentRoom: action.payload
            }
        default:
            return {...state}
    }
}
export default CurrentRoom;