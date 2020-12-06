import { all } from 'redux-saga/effects';
import {
    GET_ROOM_LIST,
    GET_ROOM_LIST_SUCCESS,
    GET_ROOM_LIST_FAILED,
    SET_DEFAULT_ROOM
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