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
  backArrowContainer: {
    height: perfectSize(25),
    width: perfectSize(25),
  },
  backArrow: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    tintColor: colors.titleColor,
    opacity: 0.5,
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: perfectSize(10),
  },
  headerTitle: {
    color: colors.titleColor,
    //fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(35),
  },
  headerImage: {
    height: perfectSize(170),
    width: perfectSize(200),
    top: perfectSize(-40),
    position: 'absolute',
    right: perfectSize(-20),
  },
  dateLabel: {
    textAlign: 'center',
    marginTop: '15%',
    color: colors.titleColor,
    opacity: 0.5,
    //fontFamily: fonts.quicksandBold,
    textDecorationLine: 'underline',
    fontSize: perfectSize(18),
  },
  amountInputContainer: {
    height: perfectSize(80),
    alignSelf: 'center',
  },
  notesInputContainer: {
    marginTop: perfectSize(20),
    height: perfectSize(300),
    alignSelf: 'center',
  },
  //Date picker modal styles
  modal: {
    flex: 1,
    alignItems: 'center',
  },
  modalViewContainer: {
    flex: 1,
    backgroundColor: colors.modalBackgroundColor,
    alignItems: 'center',
  },
  datePickerContainer: {
    height: perfectSize(450),
    width: '85%',
    borderRadius: perfectSize(25),
    backgroundColor: colors.primaryAppColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: perfectSize(225),
  },
  datePickerHeaderContainer: {
    width: '80%',
    height: perfectSize(60),
    backgroundColor: colors.titleColor,
    borderRadius: perfectSize(50),
    position: 'absolute',
    top: perfectSize(-30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePickerHeaderLabel: {
    textAlign: 'center',
    color: colors.primaryAppColor,
    //fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(18),
  },
  //Calendar picker styles
  disabledDatesTextStyle: {
    color: colors.primaryBackgroundColor,
    opacity: 0.4,
    fontSize: perfectSize(15),
  },
  selectedDayStyle: {
    backgroundColor: colors.titleColor,
    height: perfectSize(30),
    width: perfectSize(30),
  },
  todayTextStyle: {},
  textStyle: {
    //fontFamily: fonts.quicksandBold,
    color: colors.titleColor,
    fontSize: perfectSize(13),
  },
  previousComponent: {
    height: perfectSize(20),
    width: perfectSize(20),
    resizeMode: 'contain',
    tintColor: colors.titleColor,
    opacity: 0.5,
  },
  nextComponent: {
    height: perfectSize(20),
    width: perfectSize(20),
    resizeMode: 'contain',
    tintColor: colors.titleColor,
    opacity: 0.5,
  },
  monthYearHeaderWrapperStyle: {
    flexDirection: 'column',
    alignSelf: 'center',
  },
  yearTitleStyle: {
    color: colors.titleColor,
    //fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(16),
    opacity: 0.6,
  },
  monthTitleStyle: {
    color: colors.titleColor,
    //fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(18),
    textTransform: 'uppercase',
  },
  dayLabelsWrapper: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  bottomViewContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: perfectSize(-30),
    width: '50%',
    justifyContent: 'space-between',
  },
  incomeTypeContainer: {
    flexDirection: 'column',
    height: '5%',
    width: '100%',
    marginTop: height > 700 ? '8%' : '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  incomeTypeButtonsContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '4%',
    justifyContent: 'space-between',
  },
  incomeTypeLabel: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.5)',
    //fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(18),
  },
  incomeTypeButtonContainer: {
    height: '100%',
    width: '48%',
    // backgroundColor: colors.primaryCardBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: perfectSize(10),
  },
  incomeTypeButtonTitle: {
    fontSize: perfectSize(15),
    color: colors.titleColor,
    //fontFamily: fonts.avenirHeavy,
    fontWeight: 'bold',
  },
});
