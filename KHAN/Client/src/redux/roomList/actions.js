import { all } from 'redux-saga/effects';
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

export const getRoomList = (user) => ({
    type: GET_ROOM_LIST,
    payload: user
})

export const getRoomListSuccess = (data) => ({
    type: GET_ROOM_LIST_SUCCESS,
    payload: data
})

export const getRoomListFailed = (error) => ({
    type: GET_ROOM_LIST_FAILED,
    payload: error
})
export const setDefaultRoom = (room) => ({
    type: SET_DEFAULT_ROOM,
    payload: room
})

export const createRoom = (user,room) => ({
    type: CREATE_ROOM,
    payload: {user,room}
})
export const createRoomSuccess = (user) => ({
    type: CREATE_ROOM_SUCCESS,
    payload: user
})
export const createRoomFailed = (err) => ({
    type: CREATE_ROOM_FAILED,
    payload: err
})

export const updateRoom = (user,room_id,room_info) => ({
    type: UPDATE_ROOM,
    payload: {user,room_id,room_info}
})
export const updateRoomSuccess = (room_info) => ({
    type: UPDATE_ROOM_SUCCESS,
    payload: room_info
})
export const updateRoomFailed = (err) => ({
    type: UPDATE_ROOM_FAILED,
    payload: err
})

export const deleteRoom = (user,room_id) => ({
    type: DELETE_ROOM,
    payload: {user,room_id}
})
export const deleteRoomSuccess = (room_id) => ({
    type: DELETE_ROOM_SUCCESS,
    payload: {room_id}
})
export const deleteRoomFailed = (err) => ({
    type: DELETE_ROOM_FAILED,
    payload: {err}
})

