import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Home} from '../screens';
import {
  AddExpense,
  TransactionList,
  AllExpenseCat,
  TransactionSuccess,
  InvestmentProfitLoss,
} from '../screens';
const Stack = createStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="AddExpense"
        component={AddExpense}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="InvestmentProfitLoss"
        component={InvestmentProfitLoss}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="TransactionList"
        component={TransactionList}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="AllExpenseCat"
        component={AllExpenseCat}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="TransactionSuccess"
        component={TransactionSuccess}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
}
