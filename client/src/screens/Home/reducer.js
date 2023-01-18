import {actionTypes} from './actionTypes';
const initialState = {
  userDetails: {},
  dashboardData: {},
  investments: {},
  isInvestmentsLoading: true,
  transactions: [],
  endpoint: {
    ip: 'localhost',
    port: '8080',
  },
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_DATA:
      return {...state, userDetails: action.payload};
    case actionTypes.SET_DASHBOARD_DATA:
      return {...state, dashboardData: action.payload};
    case actionTypes.LOADING_INVESTMENTS:
      return {...state, isInvestmentsLoading: action.payload};
    case actionTypes.SET_INVESTMENTS_DATA:
      return {
        ...state,
        investments: action.payload,
      };
    case actionTypes.SET_ENDPOINT:
      return {
        ...state,
        endpoint: action.payload.data,
      };
    case actionTypes.SET_TRANSACTIONS_DATA:
      return {
        ...state,
        transactions: action.payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
