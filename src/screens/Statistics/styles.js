/* eslint-disable no-undef */
import {StyleSheet, Platform} from 'react-native';
import {colors, perfectSize, fonts} from '../../theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackgroundColor,
    paddingTop: perfectSize(Platform.OS == 'ios' ? 56 : 40),
    padding: perfectSize(23),
  },
  portfolioContainer: {
    alignItems: 'center',
    borderRadius: perfectSize(10),
    marginTop: perfectSize(15),
    paddingLeft: '8%',
    paddingRight: '8%',
    paddingTop: '6%',
    paddingBottom: '6%',
    backgroundColor: colors.tabBarBackgroundColor,
    justifyContent: 'space-between',
    marginBottom: '5%',
  },
  portfolioInvestTitle: {
    //fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(14),
    color: colors.titleColor,
    opacity: 0.8,
  },
  portfolioValue: {
    //fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(23),
    color: colors.titleColor,
  },
  PLPrice: {
    //fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(20),
    color: colors.titleColor,
  },
  PLPercentage: {
    //fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(18),
    color: colors.titleColor,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: perfectSize(10),
    marginTop: perfectSize(15),
    padding: '5%',
    width: '100%',
    backgroundColor: colors.secondaryBackgroundColor,
    justifyContent: 'space-between',
  },
  stockTitle: {
    //fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(20),
    color: colors.titleColor,
    marginTop: perfectSize(5),
  },
  investedNav: {
    //fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(16),
    color: colors.titleColor,
    opacity: 0.8,
  },
  investedValue: {
    //fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(16),
    color: colors.titleColor,
    marginTop: perfectSize(5),
  },
  listTitle: {
    //fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(20),
    color: colors.titleColor,
    marginTop: perfectSize(5),
  },
});
