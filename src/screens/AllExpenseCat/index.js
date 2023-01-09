import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, FlatList} from 'react-native';
import {PrimaryHeader} from '../../components';
import {strings, images, colors} from '../../theme';
import styles from './styles';
import {connect} from 'react-redux';
import {getDisplayDate} from '../../utils/globalMethods';
class AllExpenseCat extends Component {
  constructor(props) {
    super(props);
  }

  renderAllCat = (item, index) => {
    const {transaction, transactionsTitle} = strings.allExpenseCat;
    const {total, cat} = item;
    const {selectedFilter, dateRange} = this.props.route.params;
    let selectedStartDateTimeStamp, selectedEndDateTimeStamp;
    if (dateRange) {
      selectedStartDateTimeStamp = dateRange.start;
      selectedEndDateTimeStamp = dateRange.end;
    }
    if (item.total > 0) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('TransactionList', {
              selectedExpenseCat: cat,
              isFromExpenseCat: true,
              selectedFilter: selectedFilter,
              dateRange:
                selectedFilter === 'all'
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
            },
          ]}>
          <View style={styles.catImageContainer}>
            <Image source={images[cat]} style={styles.catImage} />
          </View>
          <View style={styles.catDetailsContainer}>
            <Text style={styles.catTitle}>{cat.toUpperCase()}</Text>
          </View>
          <Text
            style={[
              styles.totalAmmount,
              {
                color: colors.titleColor,
              },
            ]}>
            {total}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  getTransactionPeriodTitle = () => {
    const {overallExpense, monthlyExpense, customExpense} =
      strings.allExpenseCat;
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
  render() {
    const {headerTitle} = strings.allExpenseCat;
    const {dashboardData} = this.props.AppReducer;
    return (
      <View style={styles.container}>
        <PrimaryHeader
          onPress={() => this.props.navigation.goBack()}
          title={headerTitle}
          leftImage={images.backArrow}
          rightImage={images.expense}
          rightTintColorDisabled
          rightImageOpacity={1}
        />
        <Text style={styles.transactionPeriodTitle}>
          {this.getTransactionPeriodTitle()}
        </Text>
        <FlatList
          data={dashboardData.transactionCategories}
          contentContainerStyle={styles.catListContainer}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => this.renderAllCat(item, index)}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    AppReducer: state.AppReducer,
  };
};
export default connect(mapStateToProps)(AllExpenseCat);
