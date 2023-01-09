/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  DeviceEventEmitter,
  TouchableOpacity,
  FlatList,
  BackHandler,
} from 'react-native';
import {colors, perfectSize} from '../../theme';
import {connect} from 'react-redux';
import {images} from '../../theme';
import styles from './styles';

const data = [
  {
    label: 'Credit',
    image: images.income,
    description:
      'This transaction will be counted as your income. It could be your monthly salary or other income which you want to add or track',
    screenName: 'AddIncome',
    backgroundColor: colors.primaryAppColor,
  },
  {
    label: 'Debit',
    image: images.expense,
    description:
      'This transaction will be counted as your expense. It cound be daily expenses that you should keep track of.',
    screenName: 'AddExpense',
    backgroundColor: colors.primaryAppColor,
  },
  {
    label: 'Endpoint',
    screenName: 'Endpoint',
  },
];
class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.hardwareBackHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        this.onBackButtonTapped();
      },
    );
  }

  componentWillUnmount() {
    this.hardwareBackHandler.remove();
  }

  onBackButtonTapped = () => {
    DeviceEventEmitter.emit('HideTabBar', false);
    this.props.navigation.goBack();
  };
  renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(item.screenName)}
        style={[styles.cardContainer, {marginTop: index == 0 ? 0 : '10%'}]}>
        <Text style={styles.cardTitle}>{item.label}</Text>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <>
        <StatusBar
          translucent
          backgroundColor={colors.backgroundColor}
          barStyle="light-content"
        />
        <View style={styles.container}>
          <View
            style={{
              left: perfectSize(23),
              position: 'absolute',
              top: perfectSize(60),
              zIndex: 1,
            }}>
            <TouchableOpacity onPress={() => this.onBackButtonTapped()}>
              <Image source={images.close} style={styles.closeImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.listContentContainer}>
            <Image
              source={images.objectOne}
              style={[
                styles.objectImage,
                {
                  top: '5%',
                  right: '-10%',
                },
              ]}
            />
            <Image
              source={images.objectTwo}
              style={[
                styles.objectImage,
                {
                  bottom: '5%',
                  left: '-10%',
                },
              ]}
            />
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContentContainer}
              renderItem={({item, index}) => this.renderItem(item, index)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {LoginReducer: state.LoginReducer};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction);
