import { getRoomCookieDefault } from 'helpers/roomUtils';
import {
    GET_ROOM_LIST,
    GET_ROOM_LIST_SUCCESS,
    GET_ROOM_LIST_FAILED,
    SET_DEFAULT_ROOM
} from './constants';

const INIT_STATE = {
}

const RoomList = (state = INIT_STATE, action) =>{
    switch (action.type) {
        case GET_ROOM_LIST:
            return {
                ...state,
            }
        case GET_ROOM_LIST_SUCCESS:
            const rooms = action.payload;
            const myRoom = rooms.filter((e)=>(e.role==="Owner"));
            const sharedRoom = rooms.filter((e)=>(e.role!="Owner"));
            let defaultRoom = {
                role:'User',
                room: {
                    _id: "xxx",
                    name: "Chưa có kho lạnh nào"
                }
            };
            if (sharedRoom.length>0 ){
                defaultRoom = sharedRoom[0];
                //defaultRoom = (getRoomCookieDefault() !=null)?getRoomCookieDefault():sharedRoom[0];
            }
            if (myRoom.length>0){
                defaultRoom = myRoom[0];
               // defaultRoom = (getRoomCookieDefault() !=null)?getRoomCookieDefault(): myRoom[0];
            }
            return {
                ...state,
                myRoom,
                sharedRoom,
                defaultRoom
            }
        case GET_ROOM_LIST_FAILED:
            return {
                ...state,
                errorGetRoomList: action.payload
            }
        case SET_DEFAULT_ROOM:
            return {
                ...state,
                defaultRoom: action.payload
            }
        default:
            return {...state}
    }
}
export default RoomList;