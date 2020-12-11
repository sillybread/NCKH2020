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

export const getRoomList = () => ({
    type: GET_ROOM_LIST,
    payload: {}
})

export const getRoomListSuccess = (accesses) => ({
    type: GET_ROOM_LIST_SUCCESS,
    payload: {accesses}
})

export const getRoomListFailed = (error) => ({
    type: GET_ROOM_LIST_FAILED,
    payload: {error}
})



export const setCurrentRoom = (room_id) => ({
    type: SET_CURR_ROOM,
    payload: {room_id}
})
export const setCurrentRoomSuccess = (room) => ({
    type: SET_CURR_ROOM_SUCCESS,
    payload: {room}
})
export const setCurrentRoomFailed  = (error) => ({
    type: SET_CURR_ROOM_FAILED,
    payload: {error}
})


export const createRoom = (room) => ({
    type: CREATE_ROOM,
    payload: {room}
})
export const createRoomSuccess = (room) => ({
    type: CREATE_ROOM_SUCCESS,
    payload: {room}
})
export const createRoomFailed = (error) => ({
    type: CREATE_ROOM_FAILED,
    payload: {error}
})


export const updateRoom = (room_id,room_info) => ({
    type: UPDATE_ROOM,
    payload: {room_id,room_info}
})
export const updateRoomSuccess = (room) => ({
    type: UPDATE_ROOM_SUCCESS,
    payload: {room}
})
export const updateRoomFailed = (error) => ({
    type: UPDATE_ROOM_FAILED,
    payload: {error}
})


export const deleteRoom = (room_id) => ({
    type: DELETE_ROOM,
    payload: {room_id}
})
export const deleteRoomSuccess = (room_id) => ({
    type: DELETE_ROOM_SUCCESS,
    payload: {room_id}
})
export const deleteRoomFailed = (error) => ({
    type: DELETE_ROOM_FAILED,
    payload: {error}
})

