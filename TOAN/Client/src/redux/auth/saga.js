// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { requestApi } from 'helpers/api';

import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, FORGET_PASSWORD ,LOGIN_USER_SUCCESS} from './constants';
import { BASE_URL} from 'constants/apiConfig.js';

import {
    loginUserSuccess,
    loginUserFailed,
    registerUserSuccess,
    registerUserFailed,
    forgetPasswordSuccess,
    forgetPasswordFailed,
} from './actions';

/**
 * Sets the session
 * @param {*} user
 */
const setSession = (user) => {
    let cookies = new Cookies();
    if (user) {
        cookies.set('user', JSON.stringify(user), { path: '/' });
    } else {
        cookies.remove('user', { path: '/' });
    }
};
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login({ payload: { username, password } }) {
    const options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data:{username,password},
        url : 'api/auth/signin'
    };
    try {
        const response = yield call(requestApi, options);
        if (response.status==='success') {
           
            setSession(response.result);
            yield put(loginUserSuccess(response.result));
        } else {
            setSession(null);
            yield put(loginUserFailed(response.result)); //message
        }
    } catch (error) {
        setSession(null);
        yield put(loginUserFailed(error)); //message
    }
}


function* getFistData({ payload: {accessToken} }) { 
    const options = {
        method: 'get',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token':  accessToken
        },
        url : 'api/room/access/all'
    };
    try {
        const response = yield call(requestApi, options);
        if (response.status==='success') {
            yield console.log(response.result);
        } else {
            yield console.log(response.result);
        }
    } catch (error) {
        yield console.error(error);
    } 
}


/**
 * Logout the user
 * @param {*} param0
 */
function* logout({ payload: { history } }) {
    try {
        setSession(null);
        yield call(() => {
            history.push('/account/login');
        });
    } catch (error) {}
}

/**
 * Register the user
 */
function* register({ payload: { username, email, password } }) {
    const options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data:{username,password,email},
        url : 'api/auth/signup'
    };

    try {
        const response = yield call(requestApi,options);
        if (response.status==='success') {
           
            yield put(registerUserSuccess(response.result));
        } else {
            yield put(registerUserFailed(response.result));
        }
    } catch (error) {
        yield put(registerUserFailed('Erro'));
    }
}

/**
 * forget password
 */
function* forgetPassword({ payload: {email, username } }) {
    const options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data:{email,username},
        url : 'api/user/forgotPassword'
    };
    try {
        const response = yield call(requestApi, options);
        if (response.status==='success'){
            yield put(forgetPasswordSuccess(response.result));
        } else {

            yield put(forgetPasswordFailed(response.result)); //message
        }
    } catch (error) {
        yield put(forgetPasswordFailed(error)); //message
    }
}

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, login);
}

export function* watchGetFirstData() {
    yield takeEvery(LOGIN_USER_SUCCESS, getFistData);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, register);
}

export function* watchForgetPassword() {
    yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

function* authSaga() {
    yield all([fork(watchLoginUser), fork(watchLogoutUser), fork(watchRegisterUser), fork(watchForgetPassword),fork(watchGetFirstData)]);
}

export default authSaga;
