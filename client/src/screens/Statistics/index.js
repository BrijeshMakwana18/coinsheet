import React, {useEffect} from 'react';
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
  const {dashboardData} = props.AppReducer;
  let monthlyStats = dashboardData.monthlyStats;
  let totalIncome = dashboardData.totalIncome;

  useEffect(() => {
    // strokeOffset.value = 0;
  }, []);

  return (
    <View style={styles.container} onClick={() => alert('aa', monthlyStats)}>
      <></>
    </View>
  );
};

const mapStateToProps = state => {
  return {LoginReducer: state.LoginReducer, AppReducer: state.AppReducer};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
