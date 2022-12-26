/* eslint-disable no-undef */
import {StyleSheet, Platform} from 'react-native';
import {fonts, colors, perfectSize} from '../../theme';
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: perfectSize(Platform.OS == 'ios' ? 56 : 40),
    padding: perfectSize(23),
    backgroundColor: colors.primaryBackgroundColor,
  },
  header: {
    height: perfectSize(23),
    width: perfectSize(30),
  },
  backArrow: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    tintColor: colors.primaryTintColor,
    opacity: 0.5,
  },
  title: {
    textAlign: 'center',
    // fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(56),
    color: colors.titleColor,
    opacity: 0.5,
  },
  textInput: {
    padding: perfectSize(20),
    height: perfectSize(70),
    width: '100%',
    backgroundColor: colors.textInputBackgroundColor,
    borderRadius: perfectSize(12),
    fontSize: perfectSize(23),
    // fontFamily: fonts.quicksandBold,
    color: colors.titleColor,
  },
  bottomView: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.primaryBackgroundColor,
    paddingBottom: '8%',
  },
  bottomText: {
    textAlign: 'center',
    fontSize: perfectSize(14),
    color: colors.titleColor,
    // fontFamily: fonts.avenirLight,
    marginTop: '5%',
  },
});
