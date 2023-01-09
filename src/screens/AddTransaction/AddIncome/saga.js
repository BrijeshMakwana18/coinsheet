import {put, takeLatest} from 'redux-saga/effects';
import {HTTP_METHODS} from '../../../services/api-constants';
import {ADD_TRANSACTION} from '../../../services/api-endpoints';
import {request} from '../../../services/services';
import {actionTypes} from './actionTypes';
function* addIncome(action) {
  const params = action.payload.income;
  const token = action.payload.token;
  try {
    const {response} = yield request(
      ADD_TRANSACTION(),
      HTTP_METHODS.POST,
      params,
      true,
      token,
    );
    action.payload.onSuccess(response.data);
  } catch (error) {
    action.payload.onError(error.data);
  }
}
export function* addIncomeWatcher() {
  yield takeLatest(actionTypes.ADD_INCOME, addIncome);
}
