import {StyleSheet} from 'react-native';
import {colors, fonts, perfectSize, width} from '../../../theme';
import {height} from '../../../theme';
// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: perfectSize(56),
    padding: perfectSize(20),
    backgroundColor: colors.primaryBackgroundColor,
  },
  textInput: {
    padding: perfectSize(20),
    height: '100%',
    width: '100%',
    backgroundColor: colors.textInputBackgroundColor,
    borderRadius: perfectSize(12),
    fontSize: perfectSize(23),
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
    marginTop: '5%',
    color: colors.titleColor,
    opacity: 0.5,
    textDecorationLine: 'underline',
    fontSize: perfectSize(18),
  },
  amountInputContainer: {
    width: '100%',
    height: perfectSize(80),
    alignSelf: 'center',
  },
  notesInputContainer: {
    width: '100%',
    marginTop: perfectSize(20),
    alignSelf: 'center',
  },
  selectCatLabel: {
    textAlign: 'center',
    marginTop: '5%',
    color: 'rgba(255,255,255,0.5)',
    fontSize: perfectSize(18),
  },
  catListContainer: {
    marginLeft: perfectSize(-23),
    width: width,
  },
  catContentContainer: {
    alignItems: 'center',
    paddingBottom: perfectSize(20),
  },
  //Category list styles
  catContainer: {
    height: perfectSize(80),
    width: perfectSize(80),
    alignItems: 'center',
    borderRadius: perfectSize(10),
    marginTop: perfectSize(20),
    justifyContent: 'space-around',
  },
  catImageContainer: {
    height: '40%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  catImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  catTitle: {
    fontSize: perfectSize(16),
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
    backgroundColor: colors.primaryBackgroundColor,
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
    fontSize: perfectSize(16),
    opacity: 0.6,
  },
  monthTitleStyle: {
    color: colors.titleColor,
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
  expenseTypeContainer: {
    flexDirection: 'row',
    height: '5%',
    width: '100%',
    marginTop: height > 700 ? '10%' : '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expenseTypeButtonsContainer: {
    width: '60%',
    height: '100%',
    flexDirection: 'row',
  },
  expenseTypeLabel: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.5)',
    fontSize: perfectSize(18),
  },
  expenseTypeButtonContainer: {
    height: '100%',
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: perfectSize(10),
  },
  expenseTypeButtonTitle: {
    fontSize: perfectSize(15),
    color: colors.titleColor,
    fontWeight: 'bold',
  },
});
