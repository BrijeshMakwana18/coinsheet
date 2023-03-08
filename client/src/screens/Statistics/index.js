import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import {StatSkeleton} from '../../components';
import {colors, strings, perfectSize, fonts} from '../../theme';
import styles from './styles';
import Svg, {Circle} from 'react-native-svg';
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const Statistics = props => {
  useEffect(() => {
    // strokeOffset.value = 0;
  }, []);

  return (
    <View style={styles.container}>
      <></>
    </View>
  );
};

const mapStateToProps = state => {
  return {LoginReducer: state.LoginReducer, AppReducer: state.AppReducer};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
