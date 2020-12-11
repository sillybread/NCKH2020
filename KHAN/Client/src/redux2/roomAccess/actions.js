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
} from './constants';

export const getUserAccess = () => ({
    type: GET_USER_ACCESS,
    payload: {
        room_id,
        token
    }
})
export const getUserAccessSuccess = (accesses) => ({
    type: GET_USER_ACCESS_SUCCESS,
    payload: {accesses}
})

export const getUserAccessFailed = (error) => ({
    type: GET_USER_ACCESS_FAILED,
    payload: error
})


export const AddAccess = (user_id,role) => ({
    type: ADD_ACCESS,
    payload: {
        user_id,
        role
    }
})
export const AddAccessSuccess = (access) => ({
    type: ADD_ACCESS_SUCCESS,
    payload: {access}
})

export const AddAccessFailed = (error) => ({
    type: ADD_ACCESS_FAILED,
    payload: error
})


export const updateAccess = (access_id,role) => ({
    type: UPDATE_ACCESS,
    payload: {
        access_id,
        role
    }
})
export const updateAccessSuccess = (access) => ({
    type: UPDATE_ACCESS_SUCCESS,
    payload: {access}
})

export const updateAccessFailed = (error) => ({
    type: UPDATE_ACCESS_FAILED,
    payload: error
})


export const replyAccess = (access_id,accepted) => ({
    type: REPLY_ACCESS,
    payload: {
        access_id,
        accepted
    }
})
export const replyAccessSuccess = (access) => ({
    type: REPLY_ACCESS_SUCCESS,
    payload: {access}
})

export const replyAccessFailed = (error) => ({
    type: REPLY_ACCESS_FAILED,
    payload: error
})

export const deleteAccess = (access_id) => ({
    type: DELETE_ACCESS,
    payload: {
        access_id
    }
})
export const deleteAccessSuccess = (result) => ({
    type: DELETE_ACCESS_SUCCESS,
    payload: {result}
})

export const deleteAccessFailed = (error) => ({
    type: DELETE_ACCESS_FAILED,
    payload: error
})