import { all } from 'redux-saga/effects';
import {
    GET_ROOM_LIST,
    GET_ROOM_LIST_SUCCESS,
    GET_ROOM_LIST_FAILED,
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