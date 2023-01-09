import {actionTypes} from './actionTypes';
export const fetchDashboard = data => ({
  type: actionTypes.FETCH_DASHBOARD,
  payload: data,
});
export const fetchInvestments = data => ({
  type: actionTypes.FETCH_INVESTMENTS,
  payload: data,
});
export const fetchTransactions = data => ({
  type: actionTypes.FETCH_TRANSACTIONS,
  payload: data,
});
export const setDashboardData = data => ({
  type: actionTypes.SET_DASHBOARD_DATA,
  payload: data,
});
export const setEndpointData = data => ({
  type: actionTypes.SET_ENDPOINT,
  payload: data,
});
