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
    UPDATE_NOTIFICATION,
    PUSH_NOTIFICATION
} from './constants';

export const getNotificationList = (token) => ({
    type: GET_NOTIFICATION_LIST,
    payload: {
        token
    },
});
export const getNotificationListSuccess = (result) => ({
    type: GET_NOTIFICATION_LIST_SUCCESS,
    payload: {
        result
    },
});
export const getNotificationListFailed = (result) => ({
    type: GET_NOTIFICATION_LIST_FAILED,
    payload: {
        result
    },
});

export const deleteNotification = (token, notification_id) => ({
    type: DELETE_NOTIFICATION,
    payload: {
        token,
        notification_id
    },
});
export const deleteNotificationSuccess = (result) => ({
    type: DELETE_NOTIFICATION_SUCCESS,
    payload: {
        notification_id: result
    },
});
export const deleteNotificationFailed = (result) => ({
    type: DELETE_NOTIFICATION_FAILED,
    payload: {
        result
    },
});

export const deleteAllNotification = (token) => ({
    type: DELETE_ALL_NOTIFICATION,
    payload: {
        token
    },
});
export const deleteAllNotificationSuccess = (result) => ({
    type: DELETE_ALL_NOTIFICATION_SUCCESS,
    payload: {
        result
    },
});
export const deleteAllNotificationFailed = (result) => ({
    type: DELETE_ALL_NOTIFICATION_FAILED,
    payload: {
        result
    },
});
export const updateNotification = (id, data) => ({
    type: UPDATE_NOTIFICATION,
    payload: {
        id,
        data
    }
});
export const pushNotification = (notification) => ({
    type: PUSH_NOTIFICATION,
    payload: {
        notification
    },
});