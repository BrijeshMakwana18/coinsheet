import {actionTypes} from './actionTypes';

export const handleLogin = data => ({
  type: actionTypes.USER_LOGIN,
  payload: data,
});
export const logout = () => ({
  type: actionTypes.LOGOUT,
});
