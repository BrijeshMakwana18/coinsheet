/* eslint-disable no-undef */
import {StyleSheet, Platform} from 'react-native';
import {colors, perfectSize, fonts} from '../../theme';

export default styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: colors.primaryBackgroundColor,
    paddingTop: perfectSize(Platform.OS == 'ios' ? 56 : 40),
    padding: perfectSize(23),
  },
  itemsContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
});
