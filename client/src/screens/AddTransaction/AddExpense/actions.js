import {actionTypes} from './actionTypes';
export const handleAddExpense = data => ({
  type: actionTypes.ADD_EXPENSE,
  payload: data,
});
