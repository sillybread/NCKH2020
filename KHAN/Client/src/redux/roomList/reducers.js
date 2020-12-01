import {
    GET_ROOM_LIST,
    GET_ROOM_LIST_SUCCESS,
    GET_ROOM_LIST_FAILED,
} from './constants';

const RoomList = (state = {}, action) =>{
    switch (action.type) {
        case GET_ROOM_LIST:
            return {
                ...state,
                loading: true
            }
        case GET_ROOM_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                errorGetRoomList: false,
                myRoom: action.payload.myRoom,
                sharedRoom: action.payload.sharedRoom
            }
        case GET_ROOM_LIST_FAILED:
            return {
                ...state,
                loading: false,
                errorGetRoomList: action.payload
            }
    }
}
export default RoomList;