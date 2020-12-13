import {
    GET_AREA_INFO,
    GET_AREA_INFO_SUCCESS,
    GET_AREA_INFO_FAILED,
    
    ADD_AREA,
    ADD_AREA_SUCCESS,
    ADD_AREA_FAILED,
    
    ADD_MONITOR,
    ADD_MONITOR_SUCCESS,
    ADD_MONITOR_FAILED,
    
    UPDATE_AREA,
    UPDATE_AREA_SUCCESS,
    UPDATE_AREA_FAILED,
    
    UPDATE_MONITOR,
    UPDATE_MONITOR_SUCCESS,
    UPDATE_MONITOR_FAILED,
    
    DELETE_AREA,
    DELETE_AREA_SUCCESS,
    DELETE_AREA_FAILED,
    
    DELETE_MONITOR,
    DELETE_MONITOR_SUCCESS,
    DELETE_MONITOR_FAILED,
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