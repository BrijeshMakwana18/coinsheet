import {all} from 'redux-saga/effects';
import {userLoginWatcher} from '../screens/Login/saga';
import {userSignupWatcher} from '../screens/Signup/saga';
import {addExpenseWatcher} from '../screens/AddTransaction/AddExpense/saga';
import {addIncomeWatcher} from '../screens/AddTransaction/AddIncome/saga';
import {
  fetchDashboardWatcher,
  fetchTransactionsWatcher,
} from '../screens/Home/saga';
// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([
    userLoginWatcher(),
    userSignupWatcher(),
    addExpenseWatcher(),
    addIncomeWatcher(),
    fetchDashboardWatcher(),
    fetchTransactionsWatcher(),
  ]);
}
