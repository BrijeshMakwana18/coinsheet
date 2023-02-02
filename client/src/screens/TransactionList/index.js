import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  DeviceEventEmitter,
} from 'react-native';
import {PrimaryHeader, NoDataFound} from '../../components';
import {strings, images, colors, perfectSize, fonts} from '../../theme';
import styles from './styles';
import {connect} from 'react-redux';
import {getDisplayDate} from '../../utils/globalMethods';
import {decryptV1} from '../../configs/index';
class TransactionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: 'debit',
      hasDebitTransactions: false,
      hasCreditTransactions: false,
      hasInvestmentTransactions: false,
      offset: 10,
    };
  }

  componentDidMount() {
    DeviceEventEmitter.emit('HideTabBar', true);
    const {isFromExpenseCat, selectedExpenseCat} = this.props.route.params;
    if (selectedExpenseCat === 'investment') {
      this.setState({
        selectedFilter: 'investment',
      });
    }
    let allTransactions = this.getListData();
    if (!isFromExpenseCat && allTransactions) {
      for (let i = 0; i < allTransactions?.length; i++) {
        if (allTransactions[i].type === 'debit') {
          this.setState({
            hasDebitTransactions: true,
          });
          break;
        }
      }
      for (let i = 0; i < allTransactions?.length; i++) {
        if (allTransactions[i].type === 'credit') {
          this.setState({
            hasCreditTransactions: true,
          });
          break;
        }
      }
      for (let i = 0; i < allTransactions?.length; i++) {
        if (allTransactions[i].type === 'investment') {
          this.setState({
            hasInvestmentTransactions: true,
          });
          break;
        }
      }
    }
  }

  renderAllTransactions = (item, index) => {
    const {type, transactionCat, transactionDate, amount, notes} = item;
    const {selectedFilter, offset} = this.state;
    if (
      type === selectedFilter &&
      (selectedFilter === 'debit' ? index <= offset : true)
    ) {
      return (
        <TouchableOpacity
          onPress={() => {
            const profitloss = item.expenseType === 'profitloss';
            this.props.navigation.navigate(
              !profitloss ? 'AddExpense' : 'InvestmentProfitLoss',
              {
                isEdit: true,
                item: item,
              },
            );
          }}
          style={[
            styles.transactionContainer,
            {
              backgroundColor:
                type === 'credit'
                  ? colors.creditTransactionBackgroundColor
                  : colors.secondaryBackgroundColor,
            },
          ]}>
          <View style={styles.transactionImageContainer}>
            <Image
              source={
                item.type == 'credit'
                  ? images.incomePlaceholder
                  : images[item.transactionCat]
              }
              style={styles.transactionImage}
            />
          </View>
          <View style={styles.transactionDetailsContainer}>
            <Text numberOfLines={1} style={styles.transactionNotes}>
              {typeof notes === 'object' ? decryptV1(notes) : notes}
            </Text>
            <Text style={styles.transactionDate}>
              {getDisplayDate(transactionDate)}
            </Text>
          </View>
          <Text
            style={[
              styles.transactionAmount,
              {
                color:
                  type === 'credit'
                    ? colors.creditTransactionAmountColor
                    : colors.titleColor,
              },
            ]}>
            {type === 'credit' ? '+' : type === 'debit' ? '-' : ''}
            {amount}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  getTransactionPeriodTitle = () => {
    const {overallExpense, monthlyExpense, customExpense} =
      strings.allTransactions;
    const {selectedFilter, dateRange} = this.props.route.params;
    let selectedStartDateTimeStamp, selectedEndDateTimeStamp;
    if (dateRange) {
      selectedStartDateTimeStamp = dateRange.start;
      selectedEndDateTimeStamp = dateRange.end;
    }
    switch (selectedFilter) {
      case 'all':
        return overallExpense;
      case 'month':
        return monthlyExpense;
      case 'custom':
        const startDate = selectedStartDateTimeStamp
          ? getDisplayDate(selectedStartDateTimeStamp)
          : '';
        const endDate = selectedEndDateTimeStamp
          ? getDisplayDate(selectedEndDateTimeStamp)
          : '';
        return customExpense + ': ' + startDate + '-' + endDate;
    }
  };

  getListData = () => {
    const {isFromExpenseCat, selectedExpenseCat} = this.props.route.params;
    const {dashboardData, transactions} = this.props.AppReducer;
    let data = [];
    if (isFromExpenseCat) {
      data = transactions[selectedExpenseCat];
    } else {
      data = transactions.all;
    }
    return data;
  };
  getDasListVisibility = () => {
    const {isFromExpenseCat} = this.props.route.params;
    if (!isFromExpenseCat) {
      const {
        selectedFilter,
        hasCreditTransactions,
        hasDebitTransactions,
        hasInvestmentTransactions,
      } = this.state;

      if (selectedFilter === 'debit' && hasDebitTransactions) {
        return true;
      } else if (selectedFilter === 'credit' && hasCreditTransactions) {
        return true;
      } else if (selectedFilter === 'investment' && hasInvestmentTransactions) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  loadMore = () => {
    console.log('a');
    this.setState({
      offset: this.state.offset + 10,
    });
  };

  renderFooter = () => {
    if (this.state.selectedFilter === 'debit') {
      return (
        <TouchableOpacity
          onPress={() => this.loadMore()}
          style={[
            styles.filterButtonContainer,
            {
              backgroundColor: colors.primaryAppColor,
              width: '80%',
              alignSelf: 'center',
              marginTop: '4%',
              marginBottom: 0,
            },
          ]}>
          <Text style={styles.filterButtonTitle}>{'Load More'}</Text>
        </TouchableOpacity>
      );
    }
  };

  onPressInvestment = () => {
    this.setState({selectedFilter: 'investment'});
    this.flatListRef.scrollToOffset({
      offset: 0,
      animated: false,
    });
  };
  onPressCredit = () => {
    this.setState({selectedFilter: 'credit'});
    this.flatListRef.scrollToOffset({
      offset: 0,
      animated: false,
    });
  };
  onPressDebit = () => {
    this.setState({selectedFilter: 'debit'});
    this.flatListRef.scrollToOffset({
      offset: 0,
      animated: false,
    });
  };

  render() {
    const {headerTitle, filterOne, filterTwo, filterThree} =
      strings.allTransactions;
    const {isFromExpenseCat} = this.props.route.params;
    const {selectedFilter} = this.state;
    return (
      <View style={styles.container}>
        <PrimaryHeader
          onPress={() => {
            console.log(this.state.offset);
            this.props.navigation.goBack();
            DeviceEventEmitter.emit('HideTabBar', false);
          }}
          title={headerTitle}
          leftImage={images.backArrow}
          rightImage={
            selectedFilter === 'credit' ? images.income : images.expense
          }
          rightTintColorDisabled
          rightImageOpacity={1}
        />
        <Text style={styles.transactionPeriodTitle}>
          {this.getTransactionPeriodTitle()}
        </Text>
        {!isFromExpenseCat && (
          <View style={styles.filterContainer}>
            <TouchableOpacity
              onPress={() => this.onPressDebit()}
              style={[
                styles.filterButtonContainer,
                {
                  backgroundColor:
                    selectedFilter === 'debit'
                      ? colors.primaryAppColor
                      : colors.secondaryBackgroundColor,
                },
              ]}>
              <Text style={styles.filterButtonTitle}>{filterOne}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onPressInvestment()}
              style={[
                styles.filterButtonContainer,
                {
                  backgroundColor:
                    selectedFilter === 'investment'
                      ? colors.primaryAppColor
                      : colors.secondaryBackgroundColor,
                },
              ]}>
              <Text style={styles.filterButtonTitle}>{filterThree}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onPressCredit()}
              style={[
                styles.filterButtonContainer,
                {
                  backgroundColor:
                    selectedFilter === 'credit'
                      ? colors.primaryAppColor
                      : colors.secondaryBackgroundColor,
                },
              ]}>
              <Text style={styles.filterButtonTitle}>{filterTwo}</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.getDasListVisibility() ? (
          <FlatList
            ref={ref => {
              this.flatListRef = ref;
            }}
            data={this.getListData()}
            contentContainerStyle={styles.catListContainer}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) =>
              this.renderAllTransactions(item, index)
            }
            showsVerticalScrollIndicator={false}
            ListFooterComponent={this.renderFooter()}
          />
        ) : (
          <NoDataFound selectedFilter={selectedFilter} />
        )}
      </View>
    );
  }
}
// const mapDispatchToProps = dispatch => {};
const mapStateToProps = state => {
  return {
    AppReducer: state.AppReducer,
  };
};
export default connect(mapStateToProps)(TransactionList);
