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
  FlatList,
  DeviceEventEmitter,
} from 'react-native';
import {Button, ButtonWithImage, PrimaryHeader} from '../../../components';
import {connect} from 'react-redux';
import {images, colors, fonts, perfectSize, strings} from '../../../theme';
import CalendarPicker from 'react-native-calendar-picker';
import styles from './styles';
import {handleAddExpense} from './actions';
import {fetchDashboard, fetchTransactions} from '../../Home/actions';
import {getDisplayDate} from '../../../utils/globalMethods';
import {encrypt, decryptV1} from '../../../configs';
//Categories data
const data = [
  {
    title: 'FOOD',
    image: images.food,
    backgroundColor: 'rgba(246,78,162,0.9)',
    tintColor: 'rgb(246,78,162)',
  },
  {
    title: 'RECHARGE',
    image: images.recharge,
    backgroundColor: 'rgba(255,72,72,0.9)',
    tintColor: 'rgb(255,72,72)',
  },
  {
    title: 'TAX',
    image: images.tax,
    backgroundColor: 'rgba(72,19,128,0.9)',
    tintColor: 'rgb(72,19,128)',
  },
  {
    title: 'ENTERTAINMENT',
    image: images.entertainment,
    backgroundColor: 'rgba(36,107,254,0.9)',
    tintColor: 'rgb(36,107,254)',
  },
  {
    title: 'FUEL',
    image: images.fuel,
    backgroundColor: 'rgba(246,78,162,0.9)',
    tintColor: 'rgb(246,78,162)',
  },
  {
    title: 'GROCERIES',
    image: images.groceries,
    backgroundColor: 'rgba(255,72,72,0.9)',
    tintColor: 'rgb(255,72,72)',
  },
  {
    title: 'INVESTMENT',
    image: images.investment,
    backgroundColor: 'rgba(36,107,254,0.9)',
    tintColor: 'rgb(36,107,254)',
  },
  {
    title: 'LOANS',
    image: images.loan,
    backgroundColor: 'rgba(72,19,128,0.9)',
    tintColor: 'rgb(72,19,128)',
  },
  {
    title: 'MEDICAL',
    image: images.medical,
    backgroundColor: 'rgba(246,78,162,0.9)',
    tintColor: 'rgb(246,78,162)',
  },
  {
    title: 'SHOPPING',
    image: images.shopping,
    backgroundColor: 'rgba(255,72,72,0.9)',
    tintColor: 'rgb(255,72,72)',
  },
  {
    title: 'TRAVEL',
    image: images.travel,
    backgroundColor: 'rgba(72,19,128,0.9)',
    tintColor: 'rgb(72,19,128)',
  },
  {
    title: 'OTHER',
    image: images.other,
    backgroundColor: 'rgba(36,107,254,0.9)',
    tintColor: 'rgb(36,107,254)',
  },
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

class AddExpense extends Component {
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
  notesInputHeight = new Animated.Value(perfectSize(80));
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
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow = () => {
    Animated.parallel([
      Animated.timing(this.headerMarginTop, {
        toValue: perfectSize(-100),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.opacity, {
        toValue: perfectSize(0),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.catMarginTop, {
        toValue: perfectSize(600),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.notesInputHeight, {
        toValue: perfectSize(200),
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
    Animated.parallel([
      Animated.timing(this.headerMarginTop, {
        toValue: perfectSize(0),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.opacity, {
        toValue: perfectSize(1),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.catMarginTop, {
        toValue: perfectSize(0),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.notesInputHeight, {
        toValue: perfectSize(80),
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

  renderCategories = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.title == 'INVESTMENT') {
            this.setState({
              selectedExpenseType: 'investment',
            });
          }
          this.setState({
            selectedCat: item.title,
          });
        }}
        style={[
          styles.catContainer,
          {
            backgroundColor:
              this.state.selectedCat == item.title
                ? item.backgroundColor
                : colors.secondaryBackgroundColor,
            marginLeft: index % 4 == 0 ? 0 : perfectSize(20),
          },
        ]}>
        <View style={[styles.catImageContainer]}>
          <Image source={item.image} style={styles.catImage} />
        </View>
        <Text
          numberOfLines={1}
          style={[
            styles.catTitle,
            {
              color: colors.titleColor,
            },
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

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
        notes.trim() == '' ||
        Object.keys(selectedCat).length == 0
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
    const {amount, notes, selectedDate, selectedCat, selectedExpenseType} =
      this.state;

    let updatedRedord = {
      userId: this.props.LoginReducer.user.id,
      type: selectedCat.toLowerCase() === 'investment' ? 'investment' : 'debit',
      amount: parseFloat(amount),
      transactionDate: selectedDate,
      notes: encrypt(notes),
      transactionCat: selectedCat.toLowerCase(),
      expenseType: selectedExpenseType,
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
    const {amount, notes, selectedDate, selectedCat, selectedExpenseType} =
      this.state;
    const expense = {
      userId: this.props.LoginReducer.user.id,
      type: selectedCat.toLowerCase() === 'investment' ? 'investment' : 'debit',
      amount: parseFloat(amount),
      transactionDate: selectedDate,
      notes: encrypt(notes),
      transactionCat: selectedCat.toLowerCase(),
      expenseType: selectedExpenseType,
    };
    this.props.handleAddExpense({
      expense: expense,
      token: this.props.LoginReducer.user.token,
      onSuccess: response => {
        const dashboardParams = {
          id: this.props.LoginReducer.user.id,
          dashboardType: 'all',
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
    console.log('Add expense render');
    const {
      headerTitle,
      amountPlaceholder,
      notesPlaceholder,
      selectCat,
      buttonTitle,
      expenseType,
      need,
      want,
      investment,
      headerTitleForEdit,
      buttonTitleSave,
    } = strings.addExpense;
    let initialScrollToIndex = item =>
      item.title.toLowerCase() == this.props.route.params?.item.selectedCat;
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
            <Animated.View
              style={{
                marginTop: this.catMarginTop,
                opacity: this.opacity,
              }}>
              <Text style={styles.selectCatLabel}>{selectCat}</Text>
            </Animated.View>
            <Animated.View
              style={[
                styles.catListContainer,
                {
                  opacity: this.opacity,
                },
              ]}>
              <FlatList
                ref={ref => (this.flatListRef = ref)}
                data={data}
                initialScrollIndex={
                  this.props.route.params?.item.selectedCat
                    ? data.findIndex(initialScrollToIndex)
                    : 0
                }
                onScrollToIndexFailed={info => {
                  const wait = new Promise(resolve => setTimeout(resolve, 500));
                  wait.then(() => {
                    this.flatListRef.current?.scrollToIndex({
                      index: data.findIndex(initialScrollToIndex),
                      animated: true,
                    });
                  });
                }}
                // horizontal
                numColumns={4}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.catContentContainer}
                renderItem={({item, index}) =>
                  this.renderCategories(item, index)
                }
                keyExtractor={(item, index) => index.toString()}
              />
            </Animated.View>
            <Animated.View style={styles.expenseTypeContainer}>
              <Text style={styles.expenseTypeLabel}>{expenseType}</Text>
              <View
                style={[
                  styles.expenseTypeButtonsContainer,
                  {
                    justifyContent:
                      selectedCat == 'INVESTMENT' ? 'center' : 'space-between',
                  },
                ]}>
                {selectedCat != 'INVESTMENT' ? (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          selectedExpenseType: 'need',
                        })
                      }
                      style={[
                        styles.expenseTypeButtonContainer,
                        {
                          backgroundColor:
                            selectedExpenseType == 'need'
                              ? colors.primaryAppColor
                              : colors.secondaryBackgroundColor,
                        },
                      ]}>
                      <Text style={styles.expenseTypeButtonTitle}>{need}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          selectedExpenseType: 'want',
                        })
                      }
                      style={[
                        styles.expenseTypeButtonContainer,
                        {
                          backgroundColor:
                            selectedExpenseType == 'want'
                              ? colors.primaryAppColor
                              : colors.secondaryBackgroundColor,
                        },
                      ]}>
                      <Text style={styles.expenseTypeButtonTitle}>{want}</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View
                    style={[
                      styles.expenseTypeButtonContainer,
                      {
                        backgroundColor: colors.primaryAppColor,
                      },
                    ]}>
                    <Text style={styles.expenseTypeButtonTitle}>
                      {investment}
                    </Text>
                  </View>
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);
