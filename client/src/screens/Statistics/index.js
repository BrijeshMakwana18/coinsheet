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
import {fetchInvestments} from '../Home/actions';
import styles from './styles';
import {FlatList} from 'react-native-gesture-handler';
class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <View style={styles.container}></View>;
  }
}

const mapStateToProps = state => {
  return {LoginReducer: state.LoginReducer, AppReducer: state.AppReducer};
};

const mapDispatchToProps = {
  fetchInvestments: fetchInvestments,
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
