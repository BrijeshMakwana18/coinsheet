/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import Routes from './src/routes';
// import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {store} from './src/store';
export default function App() {
  // useEffect(async () => {
  //   SplashScreen.hide();
  // });
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
