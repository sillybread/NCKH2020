import {
    GET_NOTIFICATION_LIST,
    GET_NOTIFICATION_LIST_SUCCESS,
    GET_NOTIFICATION_LIST_FAILED,
    DELETE_NOTIFICATION,
    DELETE_NOTIFICATION_SUCCESS,
    DELETE_NOTIFICATION_FAILED,
    DELETE_ALL_NOTIFICATION,
    DELETE_ALL_NOTIFICATION_SUCCESS,
    DELETE_ALL_NOTIFICATION_FAILED,
    UPDATE_NOTIFICATION
} from './constants';

const INIT_STATE = {
}
const Notification = (state = INIT_STATE, action) => {
    switch (action.type){
        case GET_NOTIFICATION_LIST:
            return {
                ...state,
            }
        case GET_NOTIFICATION_LIST_SUCCESS:
            return {
                ...state,
                list: action.payload.result
            }
        case GET_NOTIFICATION_LIST_FAILED:
            return {
                ...state,
            }
        case DELETE_NOTIFICATION:
            return {
                ...state,
            }
        case DELETE_NOTIFICATION_SUCCESS:
            return {
                ...state,
            }
        case DELETE_NOTIFICATION_FAILED:
            return {
                ...state,
            }
        case DELETE_ALL_NOTIFICATION:
            return {
                ...state,
            }
        case DELETE_ALL_NOTIFICATION_SUCCESS:
            return {
                ...state,
            }
        case DELETE_ALL_NOTIFICATION_FAILED:
            return {
                ...state,
            }
        case UPDATE_NOTIFICATION:
            const newState = {...state}
            const list = newState.list;
            if (!list) return newState;
            const targetIndex = list.findIndex(e => (e._id === action.payload.id));
            if (targetIndex!=-1){
                newState.list[targetIndex] = {
                    ...newState.list[targetIndex],
                    ...action.payload.data
                }
            } else {
                //Not found
            }
            return newState;
        default:
            return {
                ...state,
            }
    }
}
export default Notification;