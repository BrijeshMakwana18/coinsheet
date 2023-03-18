/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import Routes from './src/routes';
import {Provider} from 'react-redux';
import {store} from './src/store';
export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
