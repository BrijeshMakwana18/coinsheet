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
const INDIA = 'INDIA';
const US = 'US';
class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      market: US,
    };
  }

  getPortfolio() {
    const {isInvestmentsLoading, investments, dashboardData} =
      this.props.AppReducer;
    let MF = investments.mutualFunds;
    let stocks = investments.stocks;
    let totalPF = dashboardData?.totalPF;
    let totalInvestmentValue =
      dashboardData.totalInvestment - totalPF - dashboardData.totalUSInvestment;

    let currentInvestmentValue = MF.totalMFValue + stocks.totalStocksValue;
    console.log(
      'Current',
      MF.totalMFValue,
      stocks.totalStocksValue,
      currentInvestmentValue,
      totalInvestmentValue,
    );
    let PL = currentInvestmentValue - totalInvestmentValue;
    let PLPercentage = parseFloat((100 * PL) / totalInvestmentValue);

    let usStocks = investments.us.stocks;
    let totalUSInvestment = investments.us.totalInvestment;
    let currentUSInvestmentValue = investments.us.currentInvestmentValue;
    let usPL = currentUSInvestmentValue - totalUSInvestment;
    let usPLPercentage = parseFloat((100 * usPL) / totalUSInvestment);
    if (this.state.market === US) {
      return {
        totalInvestmentValue: parseFloat(totalUSInvestment).toFixed(2),
        currentInvestmentValue: parseFloat(currentUSInvestmentValue).toFixed(2),
        PL: parseFloat(usPL).toFixed(2),
        PLPercentage: usPLPercentage.toFixed(2),
      };
    }
    return {
      totalInvestmentValue: parseFloat(totalInvestmentValue).toFixed(2),
      currentInvestmentValue: parseFloat(currentInvestmentValue).toFixed(2),
      PL: parseFloat(PL).toFixed(2),
      PLPercentage: PLPercentage.toFixed(2),
      totalPF: totalPF,
    };
  }

  renderStocks = (item, index) => {
    return (
      <View style={styles.stockContainer} key={index}>
        <View
          style={{
            width: '60%',
          }}>
          <Text style={styles.investedNav}>{`Avg: ${item.investedNav}`}</Text>
          <Text style={styles.stockTitle} numberOfLines={1}>
            {item.name ? item.name.toUpperCase() : item.id}
          </Text>
          <Text
            style={
              styles.investedValue
            }>{`Invested: ${item.investmentValue}`}</Text>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            width: '40%',
          }}>
          <Text
            style={[
              styles.investedNav,
              {
                color:
                  parseFloat(item.investmentChange.percentage) > 0
                    ? colors.positiveColor
                    : colors.negativeColor,
              },
            ]}>
            {item.investmentChange.percentage}
          </Text>
          <Text
            style={[
              styles.stockTitle,
              {
                color:
                  item.investmentChange.price > 0
                    ? colors.positiveColor
                    : colors.negativeColor,
              },
            ]}>
            {item.investmentChange.price}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                styles.investedValue,
                {
                  marginRight: perfectSize(10),
                },
              ]}>
              {item.currentNav}
            </Text>
            <Text
              style={[
                styles.investedValue,
                {
                  color:
                    parseFloat(item.navChange.percentage) > 0
                      ? colors.positiveColor
                      : colors.negativeColor,
                },
              ]}>
              {item.navChange.percentage}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {market} = this.state;
    const {investments, isInvestmentsLoading} = this.props.AppReducer;
    const {
      totalInvestmentValue,
      currentInvestmentValue,
      PL,
      PLPercentage,
      totalPF,
    } = this.getPortfolio();

    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor={colors.primaryBackgroundColor}
          barStyle="light-content"
        />
        {isInvestmentsLoading &&
        investments.mutualFunds === {} &&
        investments.stocks === {} ? (
          <StatSkeleton />
        ) : (
          <>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    market: INDIA,
                  });
                }}
                style={{
                  height: perfectSize(40),
                  width: perfectSize(150),
                  borderRadius: perfectSize(2),
                  backgroundColor:
                    this.state.market === INDIA
                      ? colors.primaryAppColor
                      : colors.secondaryBackgroundColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: perfectSize(16),
                    color: colors.titleColor,
                    //fontFamily: fonts.quicksandBold,
                  }}>
                  INDIA
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    market: US,
                  });
                }}
                style={{
                  height: perfectSize(40),
                  width: perfectSize(150),
                  borderRadius: perfectSize(2),
                  backgroundColor:
                    this.state.market === US
                      ? colors.primaryAppColor
                      : colors.secondaryBackgroundColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: perfectSize(16),
                    color: colors.titleColor,
                    //fontFamily: fonts.quicksandBold,
                  }}>
                  US
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.portfolioContainer}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={styles.portfolioInvestTitle}>
                    Invested Value
                  </Text>
                  <Text style={styles.portfolioValue}>
                    {totalInvestmentValue}
                  </Text>
                </View>
                <View>
                  <Text style={styles.portfolioInvestTitle}>Current Value</Text>
                  <Text style={styles.portfolioValue}>
                    {currentInvestmentValue}
                  </Text>
                </View>
              </View>
              {this.state.market === INDIA && (
                <View
                  style={{
                    width: '100%',
                    marginTop: '4%',
                  }}>
                  <View>
                    <View>
                      <Text style={styles.portfolioInvestTitle}>PF</Text>
                      <Text style={styles.portfolioValue}>{totalPF}</Text>
                    </View>
                  </View>
                </View>
              )}
              <View
                style={{
                  width: '100%',
                  height: 2,
                  marginTop: perfectSize(15),
                  backgroundColor: colors.primaryBackgroundColor,
                }}
              />
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: perfectSize(15),
                }}>
                <View>
                  <Text
                    style={[
                      styles.portfolioInvestTitle,
                      {fontSize: perfectSize(23)},
                    ]}>
                    {'P&L'}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      styles.portfolioValue,
                      {
                        marginRight: perfectSize(10),
                        color:
                          PLPercentage > 0
                            ? colors.positiveColor
                            : colors.negativeColor,
                      },
                    ]}>
                    {PL}
                  </Text>
                  <Text
                    style={[
                      styles.portfolioValue,
                      {
                        fontSize: perfectSize(14),
                        color:
                          PLPercentage > 0
                            ? colors.positiveColor
                            : colors.negativeColor,
                      },
                    ]}>
                    {`${PLPercentage}%`}
                  </Text>
                </View>
              </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.listTitle}>Current Holdings</Text>
              {this.state.market === INDIA ? (
                <>
                  {investments.stocks.data.map((item, index) => {
                    return this.renderStocks(item, index);
                  })}
                  <Text
                    style={[styles.listTitle, {marginTop: perfectSize(10)}]}>
                    Mutual Funds
                  </Text>
                  <View
                    style={{
                      marginBottom: '20%',
                    }}>
                    {investments.mutualFunds.data.map((item, index) => {
                      if (item.units) return this.renderStocks(item, index);
                    })}
                  </View>
                </>
              ) : (
                investments.us.stocks.data.map((item, index) => {
                  return this.renderStocks(item, index);
                })
              )}
            </ScrollView>
          </>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {LoginReducer: state.LoginReducer, AppReducer: state.AppReducer};
};

const mapDispatchToProps = {
  fetchInvestments: fetchInvestments,
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
