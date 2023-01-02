import {actionTypes} from './actionTypes';

export const handleSignup = data => ({
  type: actionTypes.USER_SIGNUP,
  payload: data,
});
