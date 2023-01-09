/* eslint-disable no-shadow */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {store} from '../store';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import {connect} from 'react-redux';
function Routes(props) {
  return (
    <NavigationContainer>
      {Object.keys(props.LoginReducer.user).length != 0 ? (
        <HomeStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}

const mapStateToProps = state => {
  return {LoginReducer: state.LoginReducer};
};

export default connect(mapStateToProps)(Routes);
