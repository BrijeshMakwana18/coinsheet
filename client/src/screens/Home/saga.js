import {put, takeLatest} from 'redux-saga/effects';
import {HTTP_METHODS} from '../../services/api-constants';
import {
  FETCH_DASHBOARD,
  FETCH_INVESTMETNS,
  TRANSACTIONS_LIST,
} from '../../services/api-endpoints';
import {request} from '../../services/services';
import {actionTypes} from './actionTypes';
import {decryptV1} from '../../configs/index';
function* fetchDashboard(action) {
  try {
    const {response} = yield request(
      FETCH_DASHBOARD(),
      HTTP_METHODS.POST,
      action.payload.params,
      true,
    );
    if (response.data.responseType) {
      yield put({
        type: actionTypes.SET_DASHBOARD_DATA,
        payload: response.data,
      });
    }
    if (action.payload.onSuccess) {
      action?.payload?.onSuccess(response.data);
    }
  } catch (error) {
    if (action.payload.onError) {
      let data =
        error.message === 'Network Error'
          ? 'Please set valid endpoint'
          : error.response.data;
      action?.payload?.onError(data);
    }
  }
}
export function* fetchDashboardWatcher() {
  yield takeLatest(actionTypes.FETCH_DASHBOARD, fetchDashboard);
}

function* fetchInvestments(action) {
  yield put({
    type: actionTypes.LOADING_INVESTMENTS,
    payload: true,
  });
  try {
    const {response} = yield request(
      FETCH_INVESTMETNS(),
      HTTP_METHODS.POST,
      action.payload.params,
      true,
    );
    if (response.data) {
      yield put({
        type: actionTypes.SET_INVESTMENTS_DATA,
        payload: response.data,
      });
      yield put({
        type: actionTypes.LOADING_INVESTMENTS,
        payload: false,
      });
    }
    if (action.payload.onSuccess) {
      action?.payload?.onSuccess(response.data);
    }
  } catch (error) {
    yield put({
      type: actionTypes.LOADING_INVESTMENTS,
      payload: false,
    });
    if (action.payload.onError) {
      action?.payload?.onError(error.response.data);
    }
  }
}
export function* fetchInvestmentsWatcher() {
  yield takeLatest(actionTypes.FETCH_INVESTMENTS, fetchInvestments);
}

function* fetchTransactions(action) {
  try {
    const {response} = yield request(
      TRANSACTIONS_LIST(),
      HTTP_METHODS.POST,
      action.payload.params,
      true,
    );
    if (response.data && Array.isArray(response.data.transactions)) {
      let transactions = {
        all: [],
        investment: [],
        tax: [],
        shopping: [],
        food: [],
        groceries: [],
        entertainment: [],
        medical: [],
        recharge: [],
        fuel: [],
        travel: [],
        loan: [],
        other: [],
      };
      for (let i = 0; i < response.data.transactions.length; i++) {
        let temp = response.data.transactions[i];
        temp['notes'] = decryptV1(temp.notes);
        transactions.all.push(temp);
        switch (response.data.transactions[i].transactionCat) {
          case 'investment':
            transactions.investment.push(temp);
            break;
          case 'tax':
            transactions.tax.push(temp);
            break;
          case 'shopping':
            transactions.shopping.push(temp);
            break;
          case 'food':
            transactions.food.push(temp);
            break;
          case 'groceries':
            transactions.groceries.push(temp);
            break;
          case 'entertainment':
            transactions.entertainment.push(temp);
            break;
          case 'medical':
            transactions.medical.push(temp);
            break;
          case 'recharge':
            transactions.recharge.push(temp);
            break;
          case 'fuel':
            transactions.fuel.push(temp);
            break;
          case 'travel':
            transactions.travel.push(temp);
            break;
          case 'loan':
            transactions.loan.push(temp);
            break;
          case 'other':
            transactions.other.push(temp);
            break;
        }
      }
      console.log('Transactions', transactions);
      yield put({
        type: actionTypes.SET_TRANSACTIONS_DATA,
        payload: transactions,
      });
    }
    if (action.payload.onSuccess) {
      action?.payload?.onSuccess(response.data);
    }
  } catch (error) {
    if (action.payload.onError) {
      action?.payload?.onError(error.response.data);
    }
  }
}
export function* fetchTransactionsWatcher() {
  yield takeLatest(actionTypes.FETCH_TRANSACTIONS, fetchTransactions);
}
