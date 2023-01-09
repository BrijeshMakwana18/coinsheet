import {store} from '../store';

const BaseURL = `http://${store.getState().AppReducer.endpoint.ip}:${
  store.getState().AppReducer.endpoint.port
}/`;

export function USER_SIGNUP() {
  return `${BaseURL}api/v1/register`;
}
export function USER_LOGIN() {
  return `${BaseURL}api/v1/login`;
}
export function ADD_TRANSACTION() {
  return `${BaseURL}api/v1/transaction`;
}
export function FETCH_DASHBOARD() {
  return `${BaseURL}api/v1/dashboard`;
}

export function TRANSACTIONS_LIST() {
  return `${BaseURL}api/v1/transactions/list`;
}

export function FETCH_STAT() {
  return `${BaseURL}api/v1/stat`;
}

export function FETCH_INVESTMETNS() {
  return `${BaseURL}api/v1/investments`;
}
