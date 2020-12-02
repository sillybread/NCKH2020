import {
    GET_ROOM_LIST,
    GET_ROOM_LIST_SUCCESS,
    GET_ROOM_LIST_FAILED,
} from './constants';

const INIT_STATE = {
    loading: false,
}

const RoomList = (state = INIT_STATE, action) =>{
    switch (action.type) {
        case GET_ROOM_LIST:
            return {
                ...state,
                loading: true
            }
        case GET_ROOM_LIST_SUCCESS:
            console.log(GET_ROOM_LIST_SUCCESS);
            const rooms = action.payload;
            const myRoom = rooms.filter((e)=>(e.role==="Owner"));
            const sharedRoom = rooms.filter((e)=>(e.role!="Owner"));
            let defaultRoom = {
                role:'Owner',
                room: {
                    _id: "xxx",
                    name: "Chưa có kho lạnh nào"
                }
            };
            if (sharedRoom.length>0){
                defaultRoom = sharedRoom[0];
            }
            if (myRoom.length>0){
                defaultRoom = myRoom[0];
            }
            //console.log(myRoom, sharedRoom, defaultRoom);
            return {
                ...state,
                loading: false,
                errorGetRoomList: false,
                myRoom,
                sharedRoom,
                defaultRoom
            }
        case GET_ROOM_LIST_FAILED:
            return {
                ...state,
                loading: false,
                errorGetRoomList: action.payload
            }
        default:
            return {...state}
    }
}
export default RoomList;