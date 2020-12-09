import { getRoomCookieDefault } from 'helpers/roomUtils';
import {
    GET_ROOM_LIST,
    GET_ROOM_LIST_SUCCESS,
    GET_ROOM_LIST_FAILED,
    SET_DEFAULT_ROOM,
    CREATE_ROOM,
    CREATE_ROOM_SUCCESS,
    CREATE_ROOM_FAILED,
    UPDATE_ROOM,
    UPDATE_ROOM_SUCCESS,
    UPDATE_ROOM_FAILED,
    DELETE_ROOM,
    DELETE_ROOM_SUCCESS,
    DELETE_ROOM_FAILED
} from './constants';

const INIT_STATE = {
    loading: false,
    createRoomSuccess : false,
    defaultRoom: getRoomCookieDefault()

}

const RoomList = (state = INIT_STATE, action) =>{
    switch (action.type) {
        case GET_ROOM_LIST:
            return {
                ...state,
                loading: true
            }
        case GET_ROOM_LIST_SUCCESS:
            const rooms = action.payload;
            const myRoom = rooms.filter((e)=>(e.role==="Owner"));
            const sharedRoom = rooms.filter((e)=>(e.role!="Owner"));
            let newDefaultRoom = getRoomCookieDefault();
            if(newDefaultRoom == null || state.defaultRoom == null){
                newDefaultRoom = {
                    role:'User',
                    room: {
                        _id: "xxx",
                        name: "Chưa có kho lạnh nào"
                    }
                };
                if (sharedRoom.length>0 ){
                    newDefaultRoom = sharedRoom[0];  
                }
                if (myRoom.length>0){
                    newDefaultRoom = myRoom[0];
                }
                return {
                    ...state,
                    loading: false,
                    errorGetRoomList: false,
                    myRoom,
                    sharedRoom,
                    defaultRoom: newDefaultRoom
                }
            }else{
                return {
                    ...state,
                    loading: false,
                    errorGetRoomList: false,
                    myRoom,
                    sharedRoom
                }
            }
           
        case GET_ROOM_LIST_FAILED:
            return {
                ...state,
                loading: false,
                errorGetRoomList: action.payload
            }
        case SET_DEFAULT_ROOM:
            return {
                ...state,
                defaultRoom: action.payload
            }
        case CREATE_ROOM:
            return {
                ...state,
                loading: true,
                createRoomSuccess: false,
                error:null
            }
        case CREATE_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                createRoomSuccess: true,
                error: null
            }
        case CREATE_ROOM_FAILED:
            return {
                ...state,
                loading: false,
                createRoomSuccess: false,
                error: action.payload
            }
        case UPDATE_ROOM:
            return {
                ...state,
                loading: true,
                updateRoomSuccess: false,
                error:null
            }
        case UPDATE_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                updateRoomSuccess: true,
                error: null
            }
        case UPDATE_ROOM_FAILED:
            return {
                ...state,
                loading: false,
                updateRoomSuccess: false,
                error: action.payload
            }
        case DELETE_ROOM:
            return {
                ...state,
                loading: true,
                deleteRoomSuccess: false,
                error:null
            }
        case DELETE_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                deleteRoomSuccess: true,
                error: null
            }
        case DELETE_ROOM_FAILED:
            return {
                ...state,
                loading: false,
                deleteRoomSuccess: false,
                error: action.payload
            }
            
        default:
            return {...state}
    }
}
export default RoomList;