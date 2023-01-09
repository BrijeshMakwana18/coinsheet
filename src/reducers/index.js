import {combineReducers} from 'redux';
import LoginReducer from '../screens/Login/reducer';
import AppReducer from '../screens/Home/reducer';
const reducer = combineReducers({
  LoginReducer,
  AppReducer
});

export default reducer;
