import { getRoomCookieDefault } from 'helpers/roomUtils';
import {
    GET_ROOM_LIST,
    GET_ROOM_LIST_SUCCESS,
    GET_ROOM_LIST_FAILED,

    SET_CURR_ROOM,
    SET_CURR_ROOM_SUCCESS,
    SET_CURR_ROOM_FAILED,


    CREATE_ROOM,
    CREATE_ROOM_SUCCESS,
    CREATE_ROOM_FAILED,

    UPDATE_ROOM,
    UPDATE_ROOM_SUCCESS,
    UPDATE_ROOM_FAILED,

    DELETE_ROOM,
    DELETE_ROOM_SUCCESS,
    DELETE_ROOM_FAILED,
} from './constants';


const INIT_STATE = {
    loading: false,
    error:null,
    myRoom:[],
    sharedRoom:[],
    currentRoom: getRoomCookieDefault(),
}

const RoomList = (state = INIT_STATE, action) =>{
    switch (action.type) {
        case GET_ROOM_LIST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case GET_ROOM_LIST_SUCCESS:
            const rooms = action.payload.accesses;
            const newMyRoom = rooms.filter((e)=>(e.role==="Owner"));
            const newSharedRoom = rooms.filter((e)=>(e.role!="Owner"));
            return {
                ...state,
                loading:false,
                error:null,
                myRoom: newMyRoom,
                sharedRoom: newSharedRoom,
            }
        
        case GET_ROOM_LIST_FAILED:
            return {
                ...state,
                loading: false,
                myRoom:[],
                sharedRoom:[],
                error:action.payload.error,
                currentRoom:null,
            }

        case SET_CURR_ROOM:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case SET_CURR_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                currentRoom: action.payload.room
            }
        case SET_CURR_ROOM_FAILED:
            return {
                ...state,
                ...state,
                loading: false,
                error: action.payload.error,
                currentRoom: null,
            }

        case CREATE_ROOM:
            return {
                ...state,
                loading: true,
                error:null
            }
        case CREATE_ROOM_SUCCESS:
            let room = {
                "role": "Owner",
                "room": {
                "_id": action.payload.room._id,
                "name": action.payload.name,
                }
            }
            let newListMyRoom = [...state.myRoom].push(room);
            return {
                ...state,
                loading: false,
                error: null,
                myRoom: newListMyRoom
            }
        case CREATE_ROOM_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }


        case UPDATE_ROOM:
            return {
                ...state,
                loading: true,
                error:null
            }
        case UPDATE_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
                
            }
        case UPDATE_ROOM_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }

        case DELETE_ROOM:
            return {
                ...state,
                loading: true,
                error:null
            }
        case DELETE_ROOM_SUCCESS:
            let tempShareRoom = [...state.sharedRoom].filter(r => (r.room._id !== action.payload.room_id));
            let tempMyRoom = [...state.myRoom].filter(r => (r.room._id !== action.payload.room_id));
            return {
                ...state,
                loading: false,
                sharedRoom: tempShareRoom,
                myRoom: tempMyRoom,
                error: null,
            }
        case DELETE_ROOM_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
            
        default:
            return {...state}
    }
}
export default RoomList;