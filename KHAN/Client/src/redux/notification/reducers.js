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
} from './constants';

const INIT_STATE = {
    code: 0
}
const Notification = (state = INIT_STATE, action) => {
    switch (action.type){
        case GET_NOTIFICATION_LIST:
            return {
                ...state,
                code: 1
            }
        case GET_NOTIFICATION_LIST_SUCCESS:
            return {
                ...state,
                code: 2,
                list: action.payload
            }
        case GET_NOTIFICATION_LIST_FAILED:
            return {
                ...state,
                code: 3
            }
        case DELETE_NOTIFICATION:
            return {
                ...state,
                code: 4
            }
        case DELETE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                code: 5
            }
        case DELETE_NOTIFICATION_FAILED:
            return {
                ...state,
                code: 6
            }
        case DELETE_ALL_NOTIFICATION:
            return {
                ...state,
                code: 7
            }
        case DELETE_ALL_NOTIFICATION_SUCCESS:
            return {
                ...state,
                code: 8
            }
        case DELETE_ALL_NOTIFICATION_FAILED:
            return {
                ...state,
                code: 9
            }
        default:
            return {
                ...state,
                code: 10
            }
    }
}
export default Notification;