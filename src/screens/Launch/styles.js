import {StyleSheet} from 'react-native';
import {colors, perfectSize, fonts} from '../../theme';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackgroundColor,
    alignItems: 'center',
  },
  images: {
    height: '100%',
    width: '100%',
  },
  title: {
    color: colors.titleColor,
    fontSize: perfectSize(32),
    textAlign: 'center',
    // fontFamily: fonts.quicksandBold,
  },
  subTitle: {
    marginTop: '5%',
    color: colors.subTitleColor,
    fontSize: perfectSize(18),
    textAlign: 'center',
    // fontFamily: fonts.quicksandBold,
    opacity: 0.6,
  },
  bottomView: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: '5%',
  },
  loginButton: {
    color: colors.titleColor,
    fontSize: perfectSize(18),
    textAlign: 'center',
    // fontFamily: fonts.quicksandBold,
    opacity: 0.5,
    marginTop: '4%',
  },
});
