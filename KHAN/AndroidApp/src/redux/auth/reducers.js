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
} from "./constants";

//import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
  user: null,
  loading: false,
};

const Auth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        errorLogin: null,
      };
    case LOGIN_USER_FAILED:
      return { ...state, errorLogin: action.payload, loading: false };
    case REGISTER_USER:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        errorRegister: null,
      };
    case REGISTER_USER_FAILED:
      return { ...state, errorRegister: action.payload, loading: false };
    case LOGOUT_USER:
      return { ...state, user: null };
    case FORGET_PASSWORD:
      return { ...state, loading: true };
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        passwordResetStatus: action.payload,
        loading: false,
        errorFogot: null,
      };
    case FORGET_PASSWORD_FAILED:
      return { ...state, errorFogot: action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default Auth;
