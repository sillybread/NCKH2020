// @flow
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';

import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, FORGET_PASSWORD } from './constants';

import {
    loginUserSuccess,
    loginUserFailed,
    registerUserSuccess,
    registerUserFailed,
    forgetPasswordSuccess,
    forgetPasswordFailed,
} from './actions';

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login({ payload: { username, password } }) {

    const options = {
        body: JSON.stringify({ username, password }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    try {
        const response = yield call(fetchJSON, 'https://vikhan.herokuapp.com/api/auth/signin', options);
        if (!response.messageError) {
           
            yield put(loginUserSuccess(response));
        } else {
          
            yield put(loginUserFailed(response.messageError)); //message
        }
    } catch (error) {
     
        yield put(loginUserFailed(error)); //message
    }
}

/**
 * Register the user
 */
function* register({ payload: { username, email, password } }) {
    const options = {
        body: JSON.stringify({ username, email, password }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const response = yield call(fetchJSON, 'http://vikhan.herokuapp.com/api/auth/signup', options);
        if (!response.messageError) {
            yield put(registerUserSuccess(null));
        } else {
            yield put(registerUserFailed(response.messageError));
        }
    } catch (error) {
        yield put(registerUserFailed('Erro'));
    }
}

/**
 * forget password
 */
function* forgetPassword({ payload: { username ,email} }) {
    const options = {
        body: JSON.stringify({username,email }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const response = yield call(fetchJSON, '/users/password-reset', options);
        yield put(forgetPasswordSuccess(response.message));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error;
        }
        yield put(forgetPasswordFailed(message));
    }
}

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, login);
}
export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, register);
}

export function* watchForgetPassword() {
    yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

function* authSaga() {
    yield all([fork(watchLoginUser), fork(watchRegisterUser), fork(watchForgetPassword)]);
}

export default authSaga;
