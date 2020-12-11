import {
    GET_USER_ACCESS,
    GET_USER_ACCESS_SUCCESS,

    ADD_ACCESS,
    ADD_ACCESS_SUCCESS,
    ADD_ACCESS_FAILED,

    UPDATE_ACCESS,
    UPDATE_ACCESS_SUCCESS,
    UPDATE_ACCESS_FAILED,

    REPLY_ACCESS,
    REPLY_ACCESS_SUCCESS,
    REPLY_ACCESS_FAILED,

    DELETE_ACCESS,
    DELETE_ACCESS_SUCCESS,
    DELETE_ACCESS_FAILED,
    GET_USER_ACCESS_FAILED,
} from './constants';

const INIT_STATE = {};

const CurrentRoom = (state = INIT_STATE, action) =>{
    switch (action.type) {
        case GET_USER_ACCESS :
            return {
                ...state,
                loading: true,
                error: null,
                accesses: []
            }
        case GET_USER_ACCESS_SUCCESS :
            return {
                ...state,
                loading: false,
                error: null,
                accesses: action.payload.accesses
            }
        case GET_USER_ACCESS_FAILED :
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                accesses: []
            }
        case ADD_ACCESS :
            return {
                ...state,
                loading: true,
                error: null,
            }
        case ADD_ACCESS_SUCCESS :
            return {
                ...state,
                loading: false,
                error: null,
                accesses: [...state.accesses].push(action.payload.access);
            }
        case ADD_ACCESS_FAILED :
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        default:
            return {...state}
    }
}
export default CurrentRoom;