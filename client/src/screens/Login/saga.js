import {put, takeLatest} from 'redux-saga/effects';
import {HTTP_METHODS} from '../../services/api-constants';
import {USER_LOGIN} from '../../services/api-endpoints';
import {request} from '../../services/services';
import {actionTypes} from './actionTypes';
function* userLogin(action) {
  const params = {
    email: action.payload.email,
    password: action.payload.password,
  };
  console.log(params);
  try {
    const {response} = yield request(USER_LOGIN(), HTTP_METHODS.POST, params);
    console.log('Success', response);
    if (response.data.responseType) {
      yield put({
        type: actionTypes.SET_USER_LOGIN,
        payload: response.data.user,
      });
    }
    action.payload.onSuccess(response.data);
  } catch (error) {
    console.log('Error', error.data);
  }
}
export function* userLoginWatcher() {
  yield takeLatest(actionTypes.USER_LOGIN, userLogin);
}
