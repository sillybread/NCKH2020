import { all } from 'redux-saga/effects';
import {
    GET_AREA_INFO,
    GET_AREA_INFO_SUCCESS,
    GET_AREA_INFO_FAILED,
} from './constants';

export const getAreaInfo = (areaInfo) => ({
    type: GET_AREA_INFO,
    payload: areaInfo
})

export const getAreaInfoSuccess = (data) => ({
    type: GET_AREA_INFO_SUCCESS,
    payload: data
})

export const getAreaInfoFailed = (error) => ({
    type: GET_AREA_INFO_FAILED,
    payload: error
})