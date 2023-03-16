/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  Modal,
  Animated,
  StatusBar,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import {Button, ButtonWithImage, PrimaryHeader} from '../../../components';
import {connect} from 'react-redux';
import {images, colors, fonts, perfectSize, strings} from '../../../theme';
import CalendarPicker from 'react-native-calendar-picker';
import styles from './styles';
import {handleAddIncome} from './actions';
import {fetchDashboard, fetchTransactions} from '../../Home/actions';
//Months for date picker
let months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

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

class AddIncome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      notes: '',
      isKeyboard: false,
      displayDate: '',
      modalDisplayDate: '',
      datePicker: false,
      modalDate: '',
      selectedIncomeType: '',
    };
  }

  //Animated values
  headerMarginTop = new Animated.Value(perfectSize(0));
  opacity = new Animated.Value(perfectSize(1));
  catMarginTop = new Animated.Value(perfectSize(0));
  inputWidth = new Animated.Value(perfectSize(360));
  notesInputHeight = new Animated.Value(perfectSize(0));
  amountInputMarginTop = new Animated.Value(perfectSize(20));
  doneButtonRight = new Animated.Value(perfectSize(-100));
  datePickerMarginTop = new Animated.Value(perfectSize(950));

  componentDidMount() {
    DeviceEventEmitter.emit('HideTabBar', true);
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );

    let today = new Date();
    let date = `${today.getDate()} ${months[
      today.getMonth()
    ].toUpperCase()}, ${today.getFullYear()}`;

    this.setState({
      displayDate: date,
      modalDisplayDate: date,
      modalDate: today,
    });
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow = () => {
    this.setState({
      isKeyboard: true,
    });
    Animated.parallel([
      Animated.timing(this.headerMarginTop, {
        toValue: perfectSize(-200),
        duration: 350,
        useNativeDriver: false,
      }),
      Animated.timing(this.opacity, {
        toValue: perfectSize(0),
        duration: 350,
        useNativeDriver: false,
      }),
      Animated.timing(this.catMarginTop, {
        toValue: perfectSize(600),
        duration: 350,
        useNativeDriver: false,
      }),
      Animated.timing(this.inputWidth, {
        toValue: perfectSize(360),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.amountInputMarginTop, {
        toValue: perfectSize(Platform.OS == 'ios' ? 70 : 50),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.doneButtonRight, {
        toValue: perfectSize(20),
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  keyboardDidHide = () => {
    setTimeout(() => {
      this.setState({
        isKeyboard: false,
      });
    }, 300);
    Animated.parallel([
      Animated.timing(this.headerMarginTop, {
        toValue: perfectSize(0),
        duration: 350,
        useNativeDriver: false,
      }),
      Animated.timing(this.opacity, {
        toValue: perfectSize(1),
        duration: 350,
        useNativeDriver: false,
      }),
      Animated.timing(this.catMarginTop, {
        toValue: perfectSize(0),
        duration: 350,
        useNativeDriver: false,
      }),
      Animated.timing(this.inputWidth, {
        toValue: perfectSize(360),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.amountInputMarginTop, {
        toValue: perfectSize(20),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.doneButtonRight, {
        toValue: perfectSize(-100),
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  isActive = () => {
    const {amount, selectedIncomeType} = this.state;
    return amount.trim() == '' && selectedIncomeType === '' ? false : true;
  };

  onDateChange = date => {
    let today = new Date(date);
    let temp = `${today.getDate()} ${months[
      today.getMonth()
    ].toUpperCase()}, ${today.getFullYear()}`;

    this.setState({
      modalDisplayDate: temp,
      modalDate: today,
    });
  };

  handleDateSubmit = () => {
    let date = this.state.modalDisplayDate;
    this.setState({
      displayDate: date,
    });
    this.handleDatePicker(false);
  };

  handleCancelDate = () => {
    this.handleDatePicker(false);
    let date = this.state.displayDate;
    this.setState({
      modalDisplayDate: date,
    });
  };

  handleDatePicker = type => {
    this.setState({
      datePicker: type,
    });
  };

  handleOnSubmit = async () => {
    const {amount, notes, displayDate, modalDate} = this.state;
    const income = {
      userId: this.props.LoginReducer.user.id,
      type: 'credit',
      amount: parseFloat(amount),
      transactionDate: modalDate,
      notes: notes,
      incomeType: this.state.selectedIncomeType,
    };
    this.props.handleAddIncome({
      income: income,
      token: this.props.LoginReducer.user.token,
      onSuccess: response => {
        console.log('Income added', response);
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
        this.props.navigation.navigate('TransactionSuccess', {
          isFromIncome: true,
          amount: response.transaction.amount,
          notes: response.transaction.notes,
          transactionDate: response.transaction.transactionDate,
        });
      },
      onError: error => {
        console.log('Add income error', error);
      },
    });
  };
  render() {
    const {
      headerTitle,
      amountPlaceholder,
      notesPlaceholder,
      buttonTitle,
      salary,
      freelance,
      cashbackRewards,
      dividend,
      incomeType,
    } = strings.addIncome;
    const {selectedIncomeType} = this.state;
    return (
      <>
        <StatusBar
          translucent
          backgroundColor={
            this.state.datePicker
              ? colors.modalBackgroundColor
              : colors.primaryBackgroundColor
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
                onPress={() => this.props.navigation.goBack()}
                title={headerTitle}
                leftImage={images.backArrow}
                rightImage={images.income}
                rightTintColorDisabled
                rightImageOpacity={1}
              />
              <Text
                style={styles.dateLabel}
                onPress={() => this.handleDatePicker(true)}>
                {this.state.displayDate}
              </Text>
            </Animated.View>
            <Animated.View
              style={[
                styles.amountInputContainer,
                {
                  width: this.inputWidth,
                  marginTop: this.amountInputMarginTop,
                },
              ]}>
              <TextInput
                style={styles.textInput}
                placeholderTextColor="rgba(255,255,255,0.3)"
                selectionColor={colors.primaryAppColor}
                placeholder={amountPlaceholder}
                keyboardType="decimal-pad"
                onChangeText={amount => this.setState({amount: amount.trim()})}
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
                  width: this.inputWidth,
                },
              ]}>
              <TextInput
                style={styles.textInput}
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
            <Animated.View style={styles.incomeTypeContainer}>
              <Text style={styles.incomeTypeLabel}>{incomeType}</Text>
              <View style={styles.incomeTypeButtonsContainer}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      selectedIncomeType: 'salary',
                    })
                  }
                  style={[
                    styles.incomeTypeButtonContainer,
                    {
                      backgroundColor:
                        selectedIncomeType == 'salary'
                          ? colors.primaryAppColor
                          : colors.secondaryBackgroundColor,
                    },
                  ]}>
                  <Text style={styles.incomeTypeButtonTitle}>{salary}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      selectedIncomeType: 'dividend',
                    })
                  }
                  style={[
                    styles.incomeTypeButtonContainer,
                    {
                      backgroundColor:
                        selectedIncomeType == 'dividend'
                          ? colors.primaryAppColor
                          : colors.secondaryBackgroundColor,
                    },
                  ]}>
                  <Text style={styles.incomeTypeButtonTitle}>{dividend}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.incomeTypeButtonsContainer}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      selectedIncomeType: 'freelance',
                    })
                  }
                  style={[
                    styles.incomeTypeButtonContainer,
                    {
                      backgroundColor:
                        selectedIncomeType == 'freelance'
                          ? colors.primaryAppColor
                          : colors.secondaryBackgroundColor,
                    },
                  ]}>
                  <Text style={styles.incomeTypeButtonTitle}>{freelance}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      selectedIncomeType: 'cashbackRewards',
                    })
                  }
                  style={[
                    styles.incomeTypeButtonContainer,
                    {
                      backgroundColor:
                        selectedIncomeType == 'cashbackRewards'
                          ? colors.primaryAppColor
                          : colors.secondaryBackgroundColor,
                    },
                  ]}>
                  <Text style={styles.incomeTypeButtonTitle}>
                    {cashbackRewards}
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
            <Button
              title={buttonTitle}
              position="absolute"
              bottom={perfectSize(30)}
              active={this.isActive()}
              onPress={() => this.handleOnSubmit()}
              // disabled={!this.isActive()}
            />
            {this.state.isKeyboard && (
              <View
                style={{
                  alignSelf: 'flex-end',
                  bottom: perfectSize(30),
                }}>
                <ButtonWithImage
                  onPress={() => Keyboard.dismiss()}
                  image={images.confirm}
                  animatedButton
                />
              </View>
            )}
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
                  {this.state.modalDisplayDate}
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
  handleAddIncome: handleAddIncome,
  fetchDashboard: fetchDashboard,
  fetchTransactions: fetchTransactions,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddIncome);
