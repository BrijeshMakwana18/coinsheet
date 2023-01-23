import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {perfectSize, colors, fonts} from '../theme';
import {getCurrentMonth, getDisplayDate} from '../utils/globalMethods';
export default function Filter({
  selectedFilter,
  onPress,
  selectedStartDateTimeStamp,
  selectedEndDateTimeStamp,
}) {
  const startDate = selectedStartDateTimeStamp
    ? getDisplayDate(selectedStartDateTimeStamp)
    : '';
  const endDate = selectedEndDateTimeStamp
    ? getDisplayDate(selectedEndDateTimeStamp)
    : '';
  return (
    <View style={styles.filterContainer}>
      <View style={styles.filterInnerContainer}>
        <TouchableOpacity
          onPress={() => onPress('all')}
          style={[
            styles.filterButtonContainer,
            {
              backgroundColor:
                selectedFilter == 'all'
                  ? colors.primaryAppColor
                  : colors.secondaryBackgroundColor,
            },
          ]}>
          <Text style={styles.filterButtonTitle}>{'All'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPress('month')}
          style={[
            styles.filterButtonContainer,
            {
              backgroundColor:
                selectedFilter == 'month'
                  ? colors.primaryAppColor
                  : colors.secondaryBackgroundColor,
            },
          ]}>
          <Text style={styles.filterButtonTitle}>{getCurrentMonth()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    width: '100%',
    paddingLeft: perfectSize(23),
    paddingRight: perfectSize(23),
    marginTop: perfectSize(23),
    marginBottom: '5%',
  },
  filterInnerContainer: {
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  filterButtonContainer: {
    height: perfectSize(40),
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: perfectSize(5),
  },
  filterButtonTitle: {
    fontSize: perfectSize(15),
    color: colors.titleColor,
    //fontFamily: fonts.avenirHeavy,
    fontWeight: 'bold',
  },
  dateLabel: {
    textAlign: 'center',
    marginTop: '5%',
    color: colors.titleColor,
    opacity: 0.5,
    //fontFamily: fonts.quicksandBold,
    textDecorationLine: 'underline',
    fontSize: perfectSize(18),
  },
});
