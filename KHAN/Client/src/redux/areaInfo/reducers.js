import {
    GET_AREA_INFO,
    GET_AREA_INFO_SUCCESS,
    GET_AREA_INFO_FAILED,
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