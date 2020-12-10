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
                myRoom:[],
                sharedRoom:[],
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
                action_name: CREATE_ROOM,
                error:null
            }
        case CREATE_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                action_name: CREATE_ROOM_SUCCESS,
                error: null
            }
        case CREATE_ROOM_FAILED:
            return {
                ...state,
                loading: false,
                action_name: CREATE_ROOM_FAILED,
                error: action.payload
            }
        case UPDATE_ROOM:
            return {
                ...state,
                loading: true,
                action_name: UPDATE_ROOM,
                error:null
            }
        case UPDATE_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                action_name: UPDATE_ROOM_SUCCESS,
                error: null
            }
        case UPDATE_ROOM_FAILED:
            return {
                ...state,
                loading: false,
                action_name: DELETE_ROOM_FAILED,
                error: action.payload
            }
        case DELETE_ROOM:
            return {
                ...state,
                loading: true,
                action_name: DELETE_ROOM,
                error:null
            }
        case DELETE_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                action_name: DELETE_ROOM_SUCCESS,
                error: null,
            }
        case DELETE_ROOM_FAILED:
            return {
                ...state,
                loading: false,
                action_name: DELETE_ROOM_FAILED,
                error: action.payload.err
            }
            
        default:
            return {...state}
    }
}
export default RoomList;