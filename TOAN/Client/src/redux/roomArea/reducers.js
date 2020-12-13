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

const INIT_STATE = {
    loading: false
};

const AreaInfo = (state = INIT_STATE, action) =>{
    switch (action.type) {
        case GET_AREA_INFO:
            return {
                ...state,
                loading: true
            }
        case GET_AREA_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                errorGetAreaInfo: false,
                area: action.payload
            }
        case GET_AREA_INFO_FAILED:
            return {
                ...state,
                loading: false,
                errorGetAreaInfo: action.payload
            }
        
        default:
            return {...state}
    }
}
export default AreaInfo;