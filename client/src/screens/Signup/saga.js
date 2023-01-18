import {put, call, takeLatest} from 'redux-saga/effects';
import {USER_SIGNUP} from '../../services/api-endpoints';
import {request} from '../../services/services';
import {HTTP_METHODS} from '../../services/api-constants';
import {actionTypes} from './actionTypes';
import {actionTypes as loginActionTypes} from '../Login/actionTypes';
function* userSignup(action) {
  const params = {
    username: action.payload?.username,
    email: action.payload?.email,
    password: action.payload?.password,
  };
  try {
    const {response} = yield request(USER_SIGNUP(), HTTP_METHODS.POST, params);
    if (response.data.responseType) {
      yield put({
        type: loginActionTypes.SET_USER_LOGIN,
        payload: response.data.user,
      });
    }
    action.payload?.onSuccess(response.data);
  } catch (error) {
    console.log('Signup error', error.response);
    action.payload?.onError(error);
  }
}
export function* userSignupWatcher() {
  yield takeLatest(actionTypes.USER_SIGNUP, userSignup);
}
