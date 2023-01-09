import {StyleSheet} from 'react-native';
import {colors, fonts, perfectSize} from '../../theme';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: colors.primaryBackgroundColor,
  },
  successImage: {
    height: '50%',
    width: '90%',
  },
  successMessage: {
    color: colors.titleColor,
    fontSize: perfectSize(20),
    textAlign: 'center',
    //fontFamily: fonts.avenirHeavy,
    marginTop: '10%',
    fontWeight: 'bold',
    opacity: 0.8,
  },
  detailsContainer: {
    width: '90%',
    padding: '10%',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // backgroundColor: 'green',
  },
  labelHeader: {
    color: colors.titleColor,
    fontSize: perfectSize(14),
    //fontFamily: fonts.quicksandBold,
    fontWeight: 'bold',
    opacity: 0.5,
  },
  labelTitle: {
    color: colors.titleColor,
    fontSize: perfectSize(25),
    //fontFamily: fonts.quicksandBold,
    marginTop: '4%',
    fontWeight: 'bold',
  },
});
