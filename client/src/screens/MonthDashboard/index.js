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

const {width, height} = Dimensions.get('window');

const CIRCLE_LENGTH = 450; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const MonthDashboard = props => {
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

  const [item, setItem] = useState();

  const AnimatedProps = type => {
    return useAnimatedProps(() => ({
      strokeDashoffset: CIRCLE_LENGTH * (1 - type?.value),
    }));
  };

  useEffect(() => {
    const item = props?.route?.params?.item;
    setItem(item);
    needs.value = withTiming(parseInt(item?.needs) / parseInt(item?.expenses), {
      duration: 2000,
    });
    wants.value = withTiming(parseInt(item?.wants) / parseInt(item?.expenses), {
      duration: 2000,
    });
    // investments.value = withTiming(investmentsPercent, {
    //   duration: 2000,
    // });
    // savings.value = withTiming(savingsPercent, {
    //   duration: 2000,
    // });
  }, [
    investments,
    investmentsPercent,
    needs,
    needsPercent,
    savings,
    savingsPercent,
    wants,
    wantsPercent,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Svg width={'100%'} style={styles.svgContainer}>
            <Circle
              cx={width / 4.2}
              cy={height / 6}
              r={R}
              stroke={colors.backgroundStrokeColor}
              strokeWidth={25}
            />
            <AnimatedCircle
              cx={width / 4.2}
              cy={height / 6}
              r={R}
              stroke={colors.strokeColor}
              strokeWidth={15}
              strokeDasharray={CIRCLE_LENGTH}
              animatedProps={AnimatedProps(needs)}
              strokeLinecap={'round'}
            />
          </Svg>
          <Text style={styles.percent}>{`${(
            (parseInt(item?.needs) / parseInt(item?.expenses)) *
            100
          ).toFixed(2)}%`}</Text>
          <Text
            style={
              styles.itemTitle
            }>{`${strings.statistics.needs} \n${dashboardData.stat.needs.total}`}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {LoginReducer: state.LoginReducer, AppReducer: state.AppReducer};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MonthDashboard);
