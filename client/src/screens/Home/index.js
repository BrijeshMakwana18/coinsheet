import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Animated,
  Platform,
  Easing,
  FlatList,
  DeviceEventEmitter,
} from 'react-native';
import {connect} from 'react-redux';
import {logout} from '../Login/actions';
import {fetchDashboard, fetchTransactions} from './actions';
import {
  DashboardSkeleton,
  ErrorSlider,
  Filter,
  NoDataFound,
  DatePicker,
  CircularProgress,
} from '../../components';
import {colors, strings, images, perfectSize, fonts} from '../../theme';
import styles from './styles';
import {
  getDisplayDate,
  getCurrentMonth,
  getCurrentTimestamps,
} from '../../utils/globalMethods';
import {encrypt, decryptV1} from '../../configs';
let months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      selectedFilter: 'all',
      monthFilter: getCurrentMonth(),
      datePicker: false,
      selectedStartDateTimeStamp: getCurrentTimestamps().start,
      selectedEndDateTimeStamp: getCurrentTimestamps().end,
      error: '',
    };
    this.errorModalTop = new Animated.Value(perfectSize(-500));
    this.listenerArray = [];
  }
  componentDidMount() {
    this.fetchDashboard();
  }
  fetchDashboard() {
    const data = {
      id: this.props.LoginReducer.user.id,
    };
    this.props.fetchTransactions({
      params: data,
    });
    this.setState({
      isLoading: true,
    });
    const params = {
      id: this.props.LoginReducer.user.id,
      dashboardType: this.state.selectedFilter,
      customDashboardDate: {
        start: this.state.selectedStartDateTimeStamp,
        end: this.state.selectedEndDateTimeStamp,
      },
    };
    this.props.fetchDashboard({
      params,
      token: this.props.LoginReducer.user.token,
      onSuccess: res => {
        this.setState({
          isLoading: false,
          error: '',
        });
      },
      onError: error => {
        this.setState({
          isLoading: false,
          error: error,
        });
        this.showError();
      },
    });
  }
  onDateChange = (date, type) => {
    if (date != null) {
      date = new Date(date);
    }
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDateTimeStamp: date,
      });
    } else {
      this.setState({
        selectedStartDateTimeStamp: date,
        selectedEndDateTimeStamp: null,
      });
    }
  };
  handleDateSubmit = () => {
    const {selectedStartDateTimeStamp, selectedEndDateTimeStamp} = this.state;
    if (
      selectedStartDateTimeStamp == null ||
      selectedEndDateTimeStamp == null
    ) {
      this.showError();
    } else {
      this.setState({datePicker: false});
      this.handleDashboardSort();
    }
  };
  handleCancelDate = () => {
    const {selectedStartDateTimeStamp, selectedEndDateTimeStamp} = this.state;
    if (selectedEndDateTimeStamp && selectedStartDateTimeStamp) {
      this.setState({
        datePicker: false,
      });
    } else {
      this.setState({
        selectedFilter: 'all',
        datePicker: false,
      });
    }
  };
  showError = () => {
    Animated.timing(this.errorModalTop, {
      toValue: Platform.OS == 'ios' ? perfectSize(50) : perfectSize(40),
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.elastic(Platform.OS == 'android' ? 1 : 1),
    }).start();
    setTimeout(() => {
      Animated.timing(this.errorModalTop, {
        toValue: -perfectSize(500),
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }, 2000);
  };

  renderTopCategories = (item, index) => {
    const {
      selectedStartDateTimeStamp,
      selectedEndDateTimeStamp,
      selectedFilter,
    } = this.state;
    if (item && item.total) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('TransactionList', {
              selectedExpenseCat: item.cat,
              isFromExpenseCat: true,
              selectedFilter: selectedFilter,
              dateRange:
                selectedFilter == 'all'
                  ? false
                  : {
                      start: selectedStartDateTimeStamp,
                      end: selectedEndDateTimeStamp,
                    },
            });
          }}
          style={[
            styles.catContainer,
            {
              backgroundColor: colors.secondaryBackgroundColor,
              marginTop: index <= 1 ? '5%' : 0,
            },
          ]}>
          <View style={styles.catImageContainer}>
            <Image source={images[item.cat]} style={styles.catImage} />
          </View>
          <Text numberOfLines={1} style={styles.catTitle}>
            {item.cat.toUpperCase()}
          </Text>
          <Text numberOfLines={1} style={styles.catTotalExpense}>
            {item.total.toFixed(2)}
          </Text>
        </TouchableOpacity>
      );
    }
  };
  renderRecentTransactions = (item, index) => {
    if (item) {
      return (
        <TouchableOpacity
          onPress={() =>
            item.type !== 'credit' &&
            this.props.navigation.navigate('AddExpense', {
              isEdit: true,
              item: item,
            })
          }
          style={[
            styles.recentTransactionsContainer,
            {
              backgroundColor: colors.secondaryBackgroundColor,
            },
          ]}>
          <View style={styles.recentTransactionsImageContainer}>
            <Image
              source={
                item.type == 'credit'
                  ? images.incomePlaceholder
                  : images[item.transactionCat]
              }
              style={styles.recentTransactionsImage}
            />
          </View>
          <View style={styles.recentTransactionsDetailsContainer}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.recentTransactionsTitle}>
              {decryptV1(item.notes)}
            </Text>
            <Text style={styles.recentTransactionsDate}>
              {getDisplayDate(item.transactionDate)}
            </Text>
          </View>
          <Text
            style={[
              styles.recentTransactionsAmount,
              {
                color:
                  item.type == 'debit'
                    ? colors.debitTransactionAmountColor
                    : colors.creditTransactionAmountColor,
              },
            ]}>
            {item.type == 'credit' ? '+' : '-'}
            {item.amount}
          </Text>
        </TouchableOpacity>
      );
    }
  };
  handleFilterPress = filter => {
    switch (filter) {
      case 'all':
        this.setState({
          selectedFilter: 'all',
          selectedStartDateTimeStamp: null,
          selectedEndDateTimeStamp: null,
        });
        break;
      case 'month':
        this.setState({
          selectedFilter: 'month',
          selectedStartDateTimeStamp: getCurrentTimestamps().start,
          selectedEndDateTimeStamp: getCurrentTimestamps().end,
        });
        break;
      case 'custom':
        this.setState({
          selectedStartDateTimeStamp: null,
          selectedEndDateTimeStamp: null,
        });
        this.setState({selectedFilter: 'custom', datePicker: true});
        break;
    }
  };
  handleDashboardSort() {
    const {selectedStartDateTimeStamp, selectedEndDateTimeStamp} = this.state;
  }
  renderItem = (item, index) => {
    const {needs, wants, totalExpense} = strings.homeScreen;
    return (
      <TouchableOpacity
        onPress={() => console.log(this.props.AppReducer)}
        style={[
          styles.dashboardContainer,
          {
            backgroundColor:
              index === 0
                ? colors.activeButtonBackgroundColor
                : colors.secondaryBackgroundColor,
          },
        ]}>
        <Text style={styles.myBalanceTitle}>
          {totalExpense}
          {` - ${months[
            new Date().getMonth() - index
          ].toUpperCase()} ${new Date().getFullYear()}`}
        </Text>
        <Text style={styles.myBalanceStyle}>{item.expenses}</Text>
        <View style={styles.dashboardInnerContainer}>
          <View style={styles.investmentContainer}>
            <View>
              <Text style={styles.dashboardInvestmentHeaderStyle}>{needs}</Text>
              <Text style={styles.dashboardInvestmentStyle}>{item.needs}</Text>
            </View>
          </View>
          <View style={styles.expenseContainer}>
            <View>
              <Text style={styles.dashboardExpenseHeaderStyle}>{wants}</Text>
              <Text style={styles.dashboardExpenseStyle}>{item.wants}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  renderCurrentMonth = () => {
    const {dashboardData} = this.props.AppReducer;
    let monthlyStats = dashboardData.monthlyStats;
    if (Array.isArray(monthlyStats)) {
      return (
        <FlatList
          data={monthlyStats}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => this.renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
  };

  renderOverview = () => {
    const {dashboardData} = this.props.AppReducer;
    const {myBalanceTitle, dashboardExpenseTitle} = strings.homeScreen;
    return (
      <TouchableOpacity style={styles.dashboardContainer}>
        <Text style={styles.myBalanceTitle}>{myBalanceTitle}</Text>
        <Text style={styles.myBalanceStyle}>
          {(
            dashboardData.totalIncome -
            dashboardData.totalExpense -
            dashboardData.totalInvestment
          ).toFixed(2)}
        </Text>
        <View style={styles.dashboardInnerContainer}>
          <View style={styles.expenseContainer}>
            <View>
              <Text style={styles.dashboardExpenseHeaderStyle}>
                {dashboardExpenseTitle}
              </Text>
              <Text style={styles.dashboardExpenseStyle}>
                {dashboardData.currentMonthStats.expenses}
              </Text>
            </View>
          </View>
        </View>
        <Image source={images.dashboardImage} style={styles.dashboardImage} />
      </TouchableOpacity>
    );
  };

  render() {
    const {
      isLoading,
      selectedFilter,
      selectedStartDateTimeStamp,
      selectedEndDateTimeStamp,
    } = this.state;
    const {user} = this.props.LoginReducer;
    const {
      title,
      myBalanceTitle,
      dashboardIncomeTitle,
      dashboardExpenseTitle,
      dashboardCashbackTitle,
      topCatHeader,
      recentTransactionsHeader,
      dashboardInvestmentTitle,
      summary,
      reliasedInvestmentTitle,
    } = strings.homeScreen;
    const {dashboardData} = this.props.AppReducer;
    return (
      <>
        <StatusBar
          translucent
          backgroundColor={colors.primaryBackgroundColor}
          barStyle="light-content"
        />
        {isLoading || Object.keys(dashboardData).length === 0 ? (
          <DashboardSkeleton />
        ) : (
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text
                onPress={() => this.fetchDashboard()}
                style={styles.headerTitle}>
                {`${title} ${user.username}`}
              </Text>
            </View>
            <Filter
              selectedFilter={selectedFilter}
              selectedStartDateTimeStamp={selectedStartDateTimeStamp}
              selectedEndDateTimeStamp={selectedEndDateTimeStamp}
              onPress={filterType => this.handleFilterPress(filterType)}
            />
            {dashboardData?.totalIncome === 0 &&
            dashboardData?.totalExpense === 0 ? (
              <NoDataFound selectedFilter={selectedFilter} />
            ) : (
              <>
                {selectedFilter === 'month' ? (
                  <ScrollView
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollContainer}>
                    {dashboardData?.monthlyStats?.length > 0
                      ? this.renderCurrentMonth()
                      : null}
                  </ScrollView>
                ) : (
                  <ScrollView
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollContainer}>
                    <TouchableOpacity
                      onPress={() => console.log(this.props.AppReducer)}
                      style={styles.dashboardContainer}>
                      <Text style={styles.myBalanceTitle}>
                        {myBalanceTitle}
                      </Text>
                      <Text style={styles.myBalanceStyle}>
                        {dashboardData.balance.toFixed(2)}
                      </Text>
                      <View style={styles.dashboardInnerContainer}>
                        <View style={styles.investmentContainer}>
                          <View>
                            <Text style={styles.dashboardInvestmentHeaderStyle}>
                              {reliasedInvestmentTitle}
                            </Text>
                            <Text style={styles.dashboardInvestmentStyle}>
                              {dashboardData.totalInvestment}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.expenseContainer}>
                          <View>
                            <Text style={styles.dashboardExpenseHeaderStyle}>
                              {dashboardExpenseTitle}
                            </Text>
                            <Text style={styles.dashboardExpenseStyle}>
                              {dashboardData.totalExpense}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.expenseContainer}>
                          <View>
                            <Text style={styles.dashboardExpenseHeaderStyle}>
                              {dashboardCashbackTitle}
                            </Text>
                            <Text style={styles.dashboardExpenseStyle}>
                              {dashboardData.totalCashbacks}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <Image
                        source={images.dashboardImage}
                        style={styles.dashboardImage}
                      />
                    </TouchableOpacity>
                    {dashboardData.transactionCategories.length > 0 ? (
                      <View style={styles.topCatContainer}>
                        <View style={styles.catHeaderContainer}>
                          <Text style={styles.topCatHeader}>
                            {topCatHeader}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              this.props.navigation.navigate('AllExpenseCat', {
                                selectedFilter: selectedFilter,
                                dateRange:
                                  selectedFilter == 'all'
                                    ? false
                                    : {
                                        start: selectedStartDateTimeStamp,
                                        end: selectedEndDateTimeStamp,
                                      },
                              });
                            }}
                            style={styles.seeAllContainer}>
                            <Text style={styles.seeAllTitle}>{'See all'}</Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: '3.33%',
                          }}>
                          {this.renderTopCategories(
                            dashboardData.transactionCategories[0],
                          )}
                          {this.renderTopCategories(
                            dashboardData.transactionCategories[1],
                          )}
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: '3.33%',
                            justifyContent: 'space-between',
                          }}>
                          {this.renderTopCategories(
                            dashboardData.transactionCategories[2],
                          )}
                          {this.renderTopCategories(
                            dashboardData.transactionCategories[3],
                          )}
                        </View>
                      </View>
                    ) : null}
                    {dashboardData.recentTransactions.length > 0 ? (
                      <View style={styles.recentTransactionsListContainer}>
                        <View style={styles.catHeaderContainer}>
                          <Text style={styles.recentTransactionsHeader}>
                            {recentTransactionsHeader}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              this.props.navigation.navigate(
                                'TransactionList',
                                {
                                  selectedFilter: selectedFilter,
                                  dateRange:
                                    selectedFilter == 'all'
                                      ? false
                                      : {
                                          start: selectedStartDateTimeStamp,
                                          end: selectedEndDateTimeStamp,
                                        },
                                },
                              );
                            }}
                            style={styles.seeAllContainer}>
                            <Text style={styles.seeAllTitle}>{'See all'}</Text>
                          </TouchableOpacity>
                        </View>
                        {this.renderRecentTransactions(
                          dashboardData.recentTransactions[0],
                        )}
                        {this.renderRecentTransactions(
                          dashboardData.recentTransactions[1],
                        )}
                        {this.renderRecentTransactions(
                          dashboardData.recentTransactions[2],
                        )}
                        {this.renderRecentTransactions(
                          dashboardData.recentTransactions[3],
                        )}
                      </View>
                    ) : null}
                  </ScrollView>
                )}
              </>
            )}
            <ErrorSlider error={this.state.error} top={this.errorModalTop} />
          </View>
        )}
        <DatePicker
          errorModalTop={this.errorModalTop}
          visible={this.state.datePicker}
          handleCancelDate={() => this.handleCancelDate()}
          handleDateSubmit={() => this.handleDateSubmit()}
          onDateChange={this.onDateChange}
          rangeSelected={
            selectedStartDateTimeStamp && selectedEndDateTimeStamp
              ? true
              : false
          }
          startDate={getDisplayDate(selectedStartDateTimeStamp)}
          endDate={getDisplayDate(selectedEndDateTimeStamp)}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {LoginReducer: state.LoginReducer, AppReducer: state.AppReducer};
};

const mapDispatchToProps = {
  logout: logout,
  fetchDashboard: fetchDashboard,
  fetchTransactions: fetchTransactions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
