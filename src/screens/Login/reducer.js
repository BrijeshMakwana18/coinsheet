import {actionTypes} from './actionTypes';

const initialState = {
  user: {},
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_LOGIN:
      console.log(action);
      return {...state, user: action.payload};
    case actionTypes.LOGOUT:
      console.log(action);
      return {...state, user: {}};
    default:
      return state;
  }
};

export default LoginReducer;
