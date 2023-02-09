/* eslint-disable no-undef */
import {StyleSheet, Platform} from 'react-native';
import {colors, fonts, perfectSize, width} from '../../theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackgroundColor,
    paddingTop: perfectSize(Platform.OS == 'ios' ? 56 : 40),
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: perfectSize(10),
    paddingLeft: perfectSize(23),
  },
  headerTitle: {
    color: colors.titleColor,
    //fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(30),
  },
  scrollContainer: {
    flex: 1,
    paddingLeft: perfectSize(23),
    paddingRight: perfectSize(23),
  },
  dashboardContainer: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: perfectSize(10),
    backgroundColor: colors.secondaryBackgroundColor,
    justifyContent: 'center',
    padding: perfectSize(20),
    marginTop: '2%',
  },
  myBalanceTitle: {
    fontSize: perfectSize(16),
    //fontFamily: fonts.avenirMedium,
    color: colors.titleColor,
    opacity: 0.7,
    letterSpacing: perfectSize(0.5),
  },
  myBalanceStyle: {
    fontSize: perfectSize(26),
    //fontFamily: fonts.quicksandBold,
    color: colors.titleColor,
  },
  dashboardInnerContainer: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  investmentContainer: {
    width: '50%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  expenseContainer: {
    width: '50%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  dashboardInvestmentHeaderStyle: {
    fontSize: perfectSize(16),
    //fontFamily: fonts.avenirMedium,
    color: colors.titleColor,
    opacity: 0.7,
    letterSpacing: perfectSize(0.5),
  },
  dashboardExpenseHeaderStyle: {
    fontSize: perfectSize(16),
    //fontFamily: fonts.avenirMedium,
    color: colors.titleColor,
    opacity: 0.7,
    letterSpacing: perfectSize(0.5),
  },
  dashboardInvestmentStyle: {
    color: colors.titleColor,
    //fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(22),
  },
  dashboardExpenseStyle: {
    color: colors.titleColor,
    //fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(22),
  },
  dashboardImage: {
    height: '60%',
    width: '60%',
    position: 'absolute',
    resizeMode: 'contain',
    top: '5%',
    right: '5%',
  },
  topCatContainer: {
    marginTop: '7%',
  },
  catHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  seeAllContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  seeAllTitle: {
    color: colors.titleColor,
    //fontFamily: fonts.avenirMedium,
    fontSize: perfectSize(14),
  },
  topCatHeader: {
    fontSize: perfectSize(18),
    //fontFamily: fonts.quicksandBold,
    color: colors.titleColor,
  },
  expenseCatContainer: {
    alignItems: 'center',
    backgroundColor: colors.secondaryBackgroundColor,
  },
  //Category list styles
  catContainer: {
    height: perfectSize(200),
    width: '47.77%',
    alignItems: 'center',
    borderRadius: perfectSize(20),
  },
  catImageContainer: {
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  catImage: {
    marginTop: '10%',
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    // tintColor: colors.primaryLightColor,
  },
  catTitle: {
    marginTop: '10%',
    fontSize: perfectSize(18),
    color: colors.titleColor,
    //fontFamily: fonts.quicksandBold,
  },
  catTotalExpense: {
    fontSize: perfectSize(18),
    color: colors.titleColor,
    //fontFamily: fonts.quicksandBold,
  },
  summaryTitle: {
    fontSize: perfectSize(18),
    //fontFamily: fonts.quicksandBold,
    color: colors.titleColor,
  },
  recentTransactionsListContainer: {
    width: '100%',
    marginTop: '5%',
    alignSelf: 'center',
    borderRadius: perfectSize(20),
    justifyContent: 'center',
    marginBottom: '10%',
  },
  recentTransactionsHeader: {
    fontSize: perfectSize(18),
    //fontFamily: fonts.quicksandBold,
    color: colors.titleColor,
  },
  //Recent transactions style
  recentTransactionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: perfectSize(10),
    marginTop: perfectSize(15),
    padding: '5%',
    // backgroundColor: colors.secondaryCardBackgroundColor,
  },
  recentTransactionsImageContainer: {
    height: perfectSize(70),
    width: perfectSize(70),
    borderRadius: perfectSize(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentTransactionsImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  recentTransactionsDetailsContainer: {
    marginLeft: '5%',
    width: '60%',
  },
  recentTransactionsTitle: {
    color: colors.titleColor,
    fontSize: perfectSize(18),
    //fontFamily: fonts.quicksandBold,
  },
  recentTransactionsDate: {
    color: colors.titleColor,
    fontSize: perfectSize(15),
    //fontFamily: fonts.quicksandBold,
    opacity: 0.7,
    marginTop: '6%',
  },
  recentTransactionsAmount: {
    // color: colors.primaryLightColor,
    fontSize: perfectSize(18),
    //fontFamily: fonts.quicksandBold,
    right: '4%',
    position: 'absolute',
  },
});
