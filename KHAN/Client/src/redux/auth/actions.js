// @flow
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAILED,
} from './constants';

export const loginUser = (username, password) => ({
    type: LOGIN_USER,
    payload: { username, password },
});

export const loginUserSuccess = (user) => ({
    type: LOGIN_USER_SUCCESS,
    payload: user,
});

export const loginUserFailed = (error) => ({
    type: LOGIN_USER_FAILED,
    payload: error,
});

export const registerUser = (username, email, password) => ({
    type: REGISTER_USER,
    payload: { username, email, password },
});

export const registerUserSuccess = (user) => ({
    type: REGISTER_USER_SUCCESS,
    payload: user,
});

export const registerUserFailed = (error) => ({
    type: REGISTER_USER_FAILED,
    payload: error,
});

export const logoutUser = (history) => ({
    type: LOGOUT_USER,
    payload: { history },
});

export const forgetPassword = (email,username) => ({
    type: FORGET_PASSWORD,
    payload: {email,username },
});

export const forgetPasswordSuccess = (passwordResetStatus) => ({
    type: FORGET_PASSWORD_SUCCESS,
    payload: passwordResetStatus,
});

export const forgetPasswordFailed = (error) => ({
    type: FORGET_PASSWORD_FAILED,
    payload: error,
});
