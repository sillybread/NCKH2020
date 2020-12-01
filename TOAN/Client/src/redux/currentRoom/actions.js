import { all } from 'redux-saga/effects';
import {
    GET_CURR_ROOM,
    GET_CURR_ROOM_SUCCESS,
    GET_CURR_ROOM_FAILED,
} from './constants';

export const getCurrentRoom = (currentRoom) => ({
    type: GET_CURR_ROOM,
    payload: currentRoom
})

export const getCurrentRoomSuccess = (data) => ({
    type: GET_CURR_ROOM_SUCCESS,
    payload: data
})

export const getCurrentRoomFailed = (error) => ({
    type: GET_CURR_ROOM_FAILED,
    payload: error
})