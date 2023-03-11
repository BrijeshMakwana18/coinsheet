import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Dimensions,
  useCallback,
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

const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1FA';

const {width, height} = Dimensions.get('window');

const CIRCLE_LENGTH = 450; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const Statistics = props => {
  const needs = useSharedValue(0);
  const wants = useSharedValue(0);
  const investments = useSharedValue(0);
  const savings = useSharedValue(0);
  const {dashboardData} = props.AppReducer;
  const totalIncome = dashboardData.totalIncome;
  const needsPercent = dashboardData.stat.needs.total / totalIncome;
  const wantsPercent = dashboardData.stat.wants.total / totalIncome;
  const investmentsPercent = dashboardData.stat.investments.total / totalIncome;
  const savingsPercent = dashboardData.stat.savings.total / totalIncome;
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - needs.value),
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(needs.value * 100)}`;
  });

  useEffect(() => {
    needs.value = withTiming(needsPercent, {
      duration: 2000,
    });
    wants.value = withTiming(wantsPercent, {
      duration: 2000,
    });
    investments.value = withTiming(investmentsPercent, {
      duration: 2000,
    });
    savings.value = withTiming(savingsPercent, {
      duration: 2000,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Svg width={'100%'} style={styles.svgContainer}>
            <Circle
              cx={width / 4.2}
              cy={height / 6}
              r={R}
              stroke={BACKGROUND_STROKE_COLOR}
              strokeWidth={25}
            />
            <AnimatedCircle
              cx={width / 4.2}
              cy={height / 6}
              r={R}
              stroke={STROKE_COLOR}
              strokeWidth={15}
              strokeDasharray={CIRCLE_LENGTH}
              animatedProps={animatedProps}
              strokeLinecap={'round'}
            />
          </Svg>
          <Text style={styles.percent}>{`${(needsPercent * 100).toFixed(
            2,
          )}%`}</Text>
          <Text
            style={
              styles.itemTitle
            }>{`Needs \n${dashboardData.stat.needs.total}`}</Text>
        </View>
        <View style={styles.item}></View>
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          {/* <Svg width={'50%'} style={styles.svgContainer}>
            <Circle
              cx={width / 4}
              cy={height / 8}
              r={R}
              stroke={BACKGROUND_STROKE_COLOR}
              strokeWidth={25}
            />
            <AnimatedCircle
              cx={width / 4}
              cy={height / 4}
              r={R}
              stroke={STROKE_COLOR}
              strokeWidth={15}
              strokeDasharray={CIRCLE_LENGTH}
              animatedProps={animatedProps}
              strokeLinecap={'round'}
            />
          </Svg>
          <Text style={styles.itemTitle}>{`Needs\n${(
            needsPercent * 100
          ).toFixed(2)}%`}</Text> */}
        </View>
        <View style={styles.item}></View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {LoginReducer: state.LoginReducer, AppReducer: state.AppReducer};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
