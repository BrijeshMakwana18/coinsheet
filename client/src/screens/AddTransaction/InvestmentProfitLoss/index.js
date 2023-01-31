/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  Modal,
  Animated,
  StatusBar,
  DeviceEventEmitter,
} from 'react-native';
import {Button, ButtonWithImage, PrimaryHeader} from '../../../components';
import {connect} from 'react-redux';
import {images, colors, fonts, perfectSize, strings} from '../../../theme';
import CalendarPicker from 'react-native-calendar-picker';
import styles from './styles';
import {handleAddExpense} from '../AddExpense/actions';
import {fetchDashboard, fetchTransactions} from '../../Home/actions';
import {getDisplayDate} from '../../../utils/globalMethods';
import {encrypt, decryptV1} from '../../../configs';

//Custom styles for date picker
const customDayHeaderStylesCallback = () => {
  return {
    textStyle: {
      color: colors.primaryBackgroundColor,
      fontSize: perfectSize(16),
      //fontFamily: fonts.quicksandBold,
      opacity: 0.4,
    },
  };
};

//Custom styles for date picker
const customDatesStylesCallback = date => {
  let currentDate = new Date();
  let tempDate = new Date(date);
  let a = `${currentDate.getDate()} ${currentDate.getMonth()} ${currentDate.getFullYear()}`;
  let b = `${tempDate.getDate()} ${tempDate.getMonth()} ${tempDate.getFullYear()}`;
  if (a == b) {
    return {
      style: {
        backgroundColor: colors.primaryBackgroundColor,
        height: perfectSize(30),
        width: perfectSize(30),
      },
      textStyle: {
        color: colors.titleColor,
      },
    };
  }
};

class InvestmentProfitLoss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: this.props.route?.params?.item?.amount.toString() || '',
      notes: decryptV1(this.props.route?.params?.item?.notes),
      selectedCat:
        this.props.route?.params?.item?.transactionCat.toUpperCase() || '',
      datePicker: false,
      selectedExpenseType: this.props.route?.params?.item?.expenseType || '',
      selectedDate:
        this.props.route?.params?.item?.transactionDate || new Date(),
    };
  }

  //Animated values
  headerMarginTop = new Animated.Value(perfectSize(0));
  opacity = new Animated.Value(perfectSize(1));
  catMarginTop = new Animated.Value(perfectSize(0));
  notesInputHeight = new Animated.Value(perfectSize(200));
  amountInputMarginTop = new Animated.Value(perfectSize(20));
  doneButtonRight = new Animated.Value(perfectSize(-100));
  datePickerMarginTop = new Animated.Value(perfectSize(950));

  componentDidMount() {
    DeviceEventEmitter.emit('HideTabBar', true);
  }

  isActive = () => {
    const {amount, selectedCat, notes, selectedExpenseType} = this.state;
    if (this.props.route.params?.isEdit) {
      const {amount, notes, selectedDate, selectedCat, selectedExpenseType} =
        this.state;
      const {item} = this.props?.route?.params;
      const previousRecord = {
        userId: this.props.LoginReducer.user.id,
        type: 'debit',
        amount: item.amount,
        transactionDate: item.transactionDate,
        notes: item.notes,
        transactionCat: item.transactionCat.toLowerCase(),
        expenseType: item.expenseType,
      };
      let updatedRedord = {
        userId: this.props.LoginReducer.user.id,
        type: 'debit',
        amount: parseFloat(amount),
        transactionDate: selectedDate,
        notes: notes,
        transactionCat: selectedCat.toLowerCase(),
        expenseType: selectedExpenseType,
      };
      if (JSON.stringify(previousRecord) == JSON.stringify(updatedRedord)) {
        return false;
      } else {
        return true;
      }
    } else {
      return selectedExpenseType.trim() == '' ||
        selectedExpenseType.trim() == '' ||
        amount.trim() == '' ||
        notes.trim() == ''
        ? false
        : true;
    }
  };

  onDateChange = date => {
    let today = new Date(date);

    this.setState({
      selectedDate: today,
    });
  };

  handleDateSubmit = () => {
    this.handleDatePicker(false);
  };

  handleCancelDate = () => {
    this.handleDatePicker(false);
  };

  handleDatePicker = type => {
    this.setState({
      datePicker: type,
    });
  };

  handleUpdate = async () => {
    const {amount, notes, selectedDate, selectedExpenseType} = this.state;

    let updatedRedord = {
      userId: this.props.LoginReducer.user.id,
      type: 'investment',
      amount: parseFloat(amount),
      transactionDate: selectedDate,
      notes: encrypt(notes),
      transactionCat: selectedExpenseType,
      expenseType: 'profitloss',
      id: this.props.route.params.item._id,
    };
    this.props.handleAddExpense({
      expense: updatedRedord,
      onSuccess: response => {
        const params = {
          id: this.props.LoginReducer.user.id,
          dashboardType: 'all',
        };
        console.log('Expense added', response);
        this.props.fetchDashboard({
          params,
        });
        this.props.fetchTransactions({
          params: {
            id: this.props.LoginReducer.user.id,
          },
        });
        if (response.responseType) {
          this.props.navigation.navigate('TransactionSuccess', {
            isUpdate: true,
            isFromExpense: true,
            amount: response.transaction.amount,
            notes: decryptV1(response.transaction.notes),
            transactionDate: response.transaction.transactionDate,
            selectedCat: response.transaction.transactionCat,
            expenseType: response.transaction.expenseType,
          });
        }
      },
      onError: error => {
        console.log('Add expense error', error);
      },
    });
  };

  handleOnSubmit = async () => {
    const {amount, notes, selectedDate, selectedExpenseType} = this.state;
    const expense = {
      userId: this.props.LoginReducer.user.id,
      type: 'investment',
      amount: parseFloat(amount),
      transactionDate: selectedDate,
      notes: encrypt(notes),
      transactionCat: selectedExpenseType,
      expenseType: 'profitloss',
    };
    this.props.handleAddExpense({
      expense: expense,
      token: this.props.LoginReducer.user.token,
      onSuccess: response => {
        const dashboardParams = {
          id: this.props.LoginReducer.user.id,
          dashboardType: 'all',
        };
        const statisticsParams = {
          id: this.props.LoginReducer.user.id,
          statisticsType: 'all',
        };
        console.log('Expense added', response);
        this.props.fetchDashboard({
          params: dashboardParams,
          token: this.props.LoginReducer.user.token,
        });
        this.props.fetchTransactions({
          params: {
            id: this.props.LoginReducer.user.id,
          },
        });
        if (response.responseType) {
          this.props.navigation.navigate('TransactionSuccess', {
            isFromExpense: true,
            amount: response.transaction.amount,
            notes: decryptV1(response.transaction.notes),
            transactionDate: response.transaction.transactionDate,
            selectedCat: response.transaction.transactionCat,
            expenseType: response.transaction.expenseType,
          });
        }
      },
      onError: error => {
        console.log('Add expense error', error);
      },
    });
  };
  render() {
    const {
      headerTitle,
      amountPlaceholder,
      notesPlaceholder,
      buttonTitle,
      type,
      profit,
      loss,
      headerTitleForEdit,
      buttonTitleSave,
    } = strings.profitloss;
    const {selectedExpenseType, selectedCat} = this.state;
    return (
      <>
        <StatusBar
          translucent
          backgroundColor={
            this.state.datePicker
              ? colors.modalBackgroundColor
              : colors.backgroundColor
          }
          barStyle="light-content"
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Animated.View
              style={{
                marginTop: this.headerMarginTop,
                opacity: this.opacity,
              }}>
              <PrimaryHeader
                onPress={() => {
                  if (this.props.route.params?.isEdit) {
                    DeviceEventEmitter.emit('HideTabBar', false);
                  }
                  this.props.navigation.goBack();
                }}
                title={
                  this.props?.route?.params?.isEdit
                    ? headerTitleForEdit
                    : headerTitle
                }
                leftImage={images.backArrow}
                rightImage={images.expense}
                rightTintColorDisabled
                rightImageOpacity={1}
              />
              <Text
                style={styles.dateLabel}
                onPress={() => this.handleDatePicker(true)}>
                {getDisplayDate(this.state.selectedDate)}
              </Text>
            </Animated.View>
            <Animated.View
              style={[
                styles.amountInputContainer,
                {
                  marginTop: this.amountInputMarginTop,
                },
              ]}>
              <TextInput
                contextMenuHidden={true}
                style={[
                  styles.textInput,
                  Platform.OS == 'android' && {fontWeight: 'normal'},
                ]}
                placeholderTextColor="rgba(255,255,255,0.3)"
                selectionColor={colors.primaryAppColor}
                placeholder={amountPlaceholder}
                keyboardType="numeric"
                onChangeText={amount => this.setState({amount: amount})}
                value={this.state.amount}
                returnKeyType="next"
                onSubmitEditing={() => this.notesInput.focus()}
                blurOnSubmit={false}
                ref={input => {
                  this.amountInput = input;
                }}
              />
            </Animated.View>
            <Animated.View
              style={[
                styles.notesInputContainer,
                {
                  height: this.notesInputHeight,
                },
              ]}>
              <TextInput
                contextMenuHidden={true}
                style={[
                  styles.textInput,
                  Platform.OS == 'android' && {fontWeight: 'normal'},
                ]}
                placeholderTextColor="rgba(255,255,255,0.3)"
                selectionColor={colors.primaryAppColor}
                placeholder={notesPlaceholder}
                returnKeyType="next"
                onChangeText={notes => this.setState({notes: notes})}
                value={this.state.notes}
                blurOnSubmit={false}
                ref={input => {
                  this.notesInput = input;
                }}
                multiline
                numberOfLines={5}
              />
            </Animated.View>

            <Animated.View style={styles.expenseTypeContainer}>
              <View
                style={[
                  styles.expenseTypeButtonsContainer,
                  {
                    justifyContent: 'space-between',
                  },
                ]}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      selectedExpenseType: 'profit',
                    })
                  }
                  style={[
                    styles.expenseTypeButtonContainer,
                    {
                      backgroundColor:
                        selectedExpenseType == 'profit'
                          ? colors.primaryAppColor
                          : colors.secondaryBackgroundColor,
                    },
                  ]}>
                  <Text style={styles.expenseTypeButtonTitle}>{profit}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      selectedExpenseType: 'loss',
                    })
                  }
                  style={[
                    styles.expenseTypeButtonContainer,
                    {
                      backgroundColor:
                        selectedExpenseType == 'loss'
                          ? colors.primaryAppColor
                          : colors.secondaryBackgroundColor,
                    },
                  ]}>
                  <Text style={styles.expenseTypeButtonTitle}>{loss}</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>

            <Button
              title={
                this.props?.route?.params?.isEdit
                  ? buttonTitleSave
                  : buttonTitle
              }
              position="absolute"
              bottom={perfectSize(30)}
              onPress={() =>
                this.props?.route?.params?.isEdit
                  ? this.handleUpdate()
                  : this.handleOnSubmit()
              }
              disabled={!this.isActive()}
            />
            <Animated.View
              style={{
                position: 'absolute',
                top: perfectSize(350),
                right: this.doneButtonRight,
              }}>
              <ButtonWithImage
                onPress={() => Keyboard.dismiss()}
                image={images.confirm}
                animatedButton
              />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
        <Modal
          visible={this.state.datePicker}
          style={styles.modal}
          transparent
          animationType="fade">
          <View style={styles.modalViewContainer}>
            <View style={styles.datePickerContainer}>
              <View style={styles.datePickerHeaderContainer}>
                <Text style={styles.datePickerHeaderLabel}>
                  {getDisplayDate(this.state.selectedDate)}
                </Text>
              </View>
              <CalendarPicker
                disabledDatesTextStyle={styles.disabledDatesTextStyle}
                selectedDayStyle={styles.selectedDayStyle}
                todayTextStyle={styles.todayTextStyle}
                todayBackgroundColor={colors.primaryAppColor}
                textStyle={styles.textStyle}
                selectedDayTextColor={colors.primaryAppColor}
                monthYearHeaderWrapperStyle={styles.monthYearHeaderWrapperStyle}
                yearTitleStyle={styles.yearTitleStyle}
                monthTitleStyle={styles.monthTitleStyle}
                dayLabelsWrapper={styles.dayLabelsWrapper}
                customDayHeaderStyles={customDayHeaderStylesCallback}
                customDatesStyles={customDatesStylesCallback}
                dayShape="circle"
                onDateChange={this.onDateChange}
                width={perfectSize(320)}
                weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
                showDayStragglers
                selectedDayColor={colors.titleColor}
                maxDate={new Date()}
                previousComponent={
                  <Image
                    source={images.leftArrow}
                    style={styles.previousComponent}
                  />
                }
                nextComponent={
                  <Image
                    source={images.rightArrow}
                    style={styles.nextComponent}
                  />
                }
              />
              <View style={styles.bottomViewContainer}>
                <ButtonWithImage
                  onPress={() => this.handleCancelDate()}
                  image={images.cancel}
                  animatedButton
                />
                <ButtonWithImage
                  onPress={() => this.handleDateSubmit()}
                  image={images.confirm}
                  animatedButton
                />
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {LoginReducer: state.LoginReducer};
};

const mapDispatchToProps = {
  handleAddExpense: handleAddExpense,
  fetchDashboard: fetchDashboard,
  fetchTransactions: fetchTransactions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvestmentProfitLoss);
