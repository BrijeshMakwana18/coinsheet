import {View, Text, StyleSheet, Modal, Image} from 'react-native';
import React from 'react';
import {ButtonWithImage} from '.';
import {ErrorSlider} from '.';
import {perfectSize, images, colors, fonts, strings} from '../theme';
import CalendarPicker from 'react-native-calendar-picker';
//Custom styles for date picker
const customDayHeaderStylesCallback = () => {
  return {
    textStyle: {
      color: colors.primaryBackgroundColor,
      fontSize: perfectSize(16),
      //fontFamily: fonts.quicksandBold,
      opacity: 0.4,
    },
  };
};

//Custom styles for date picker
const customDatesStylesCallback = date => {
  let currentDate = new Date();
  let tempDate = new Date(date);
  let a = `${currentDate.getDate()} ${currentDate.getMonth()} ${currentDate.getFullYear()}`;
  let b = `${tempDate.getDate()} ${tempDate.getMonth()} ${tempDate.getFullYear()}`;
  if (a == b) {
    return {
      style: {
        backgroundColor: colors.primaryBackgroundColor,
        height: perfectSize(30),
        width: perfectSize(30),
      },
      textStyle: {
        color: colors.titleColor,
      },
    };
  }
};
export default function DatePicker({
  errorModalTop,
  visible,
  handleCancelDate,
  handleDateSubmit,
  onDateChange,
  startDate,
  endDate,
  rangeSelected,
}) {
  const {selectDateError} = strings.homeScreen;
  return (
    <Modal
      visible={visible}
      style={styles.modal}
      transparent
      animationType="fade">
      <View style={styles.modalViewContainer}>
        <View style={styles.datePickerContainer}>
          <View style={styles.datePickerHeaderContainer}>
            {rangeSelected && (
              <Text style={styles.datePickerHeaderLabel}>
                {startDate}
                {'\n'}To{'\n'}
                {endDate}
              </Text>
            )}
          </View>
          <CalendarPicker
            disabledDatesTextStyle={styles.disabledDatesTextStyle}
            selectedDayStyle={styles.selectedDayStyle}
            todayTextStyle={styles.todayTextStyle}
            todayBackgroundColor={colors.primaryAppColor}
            textStyle={styles.textStyle}
            allowRangeSelection
            allowBackwardRangeSelect
            selectedDayTextColor={colors.primaryAppColor}
            monthYearHeaderWrapperStyle={styles.monthYearHeaderWrapperStyle}
            yearTitleStyle={styles.yearTitleStyle}
            monthTitleStyle={styles.monthTitleStyle}
            dayLabelsWrapper={styles.dayLabelsWrapper}
            customDayHeaderStyles={customDayHeaderStylesCallback}
            customDatesStyles={customDatesStylesCallback}
            dayShape="circle"
            onDateChange={onDateChange}
            width={perfectSize(320)}
            weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
            showDayStragglers
            selectedDayColor={colors.titleColor}
            maxDate={new Date()}
            previousComponent={
              <Image
                source={images.leftArrow}
                style={styles.previousComponent}
              />
            }
            nextComponent={
              <Image source={images.rightArrow} style={styles.nextComponent} />
            }
          />
          <View style={styles.bottomViewContainer}>
            <ButtonWithImage
              onPress={() => handleCancelDate()}
              image={images.cancel}
              animatedButton
            />
            <ButtonWithImage
              onPress={() => handleDateSubmit()}
              image={images.confirm}
              animatedButton
            />
          </View>
        </View>
      </View>
      <ErrorSlider error={selectDateError} top={errorModalTop} />
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: colors.secondaryBackgroundColor,
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
    color: colors.primary,
    //fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(14),
  },
  //Calendar picker styles
  disabledDatesTextStyle: {
    color: colors.backgroundColor,
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
});
