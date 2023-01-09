import {StyleSheet} from 'react-native';
import {colors, fonts, perfectSize, width} from '../../../theme';
import {height} from '../../../theme';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: perfectSize(56),
    padding: perfectSize(23),
    backgroundColor: colors.primaryBackgroundColor,
  },
  textInput: {
    padding: perfectSize(20),
    height: '100%',
    width: '100%',
    backgroundColor: colors.textInputBackgroundColor,
    borderRadius: perfectSize(12),
    fontSize: perfectSize(23),
    //fontFamily: fonts.quicksandBold,
    color: colors.titleColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    height: perfectSize(80),
    alignSelf: 'center',
    marginTop: perfectSize(20),
    width: '100%',
  },
});
