import {actionTypes} from './actionTypes';
export const handleAddIncome = data => ({
  type: actionTypes.ADD_INCOME,
  payload: data,
});
