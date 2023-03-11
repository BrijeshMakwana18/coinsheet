/* eslint-disable no-undef */
import {StyleSheet, Platform} from 'react-native';
import {colors, perfectSize, fonts} from '../../theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackgroundColor,
    paddingTop: perfectSize(Platform.OS == 'ios' ? 56 : 40),
    padding: perfectSize(23),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    width: '48%',
    height: '92%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: perfectSize(20),
    backgroundColor: colors.secondaryBackgroundColor,
  },
  svgContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  percent: {
    fontSize: perfectSize(20),
    color: colors.titleColor,
    fontFamily: fonts.avenirBook,
    fontWeight: 'bold',
    position: 'absolute',
    top: '38%',
  },
  itemTitle: {
    fontSize: perfectSize(18),
    color: colors.titleColor,
    fontFamily: fonts.avenirHeavy,
    position: 'absolute',
    fontWeight: 'bold',
    bottom: '10%',
    textAlign: 'center',
  },
});
