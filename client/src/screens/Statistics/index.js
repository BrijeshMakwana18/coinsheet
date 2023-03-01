import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
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
class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // const strokeOffset = useSharedValue(radius * Math.PI * 2);

  // const animatedCircleProps = useAnimatedProps(() => {
  //   return {
  //     strokeDashoffset: withTiming(strokeOffset.value, {duration: 2000}),
  //   };
  // });

  // useEffect(() => {
  //   strokeOffset.value = 0;
  // }, []);
  render() {
    return <View style={styles.container}></View>;
  }
}

const mapStateToProps = state => {
  return {LoginReducer: state.LoginReducer, AppReducer: state.AppReducer};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
