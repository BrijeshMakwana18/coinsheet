import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {perfectSize, fonts, colors, images, strings} from '../theme';
export default function NoDataFound({selectedFilter, error}) {
  const getTitle = () => {
    const {
      overallEmptyDashboardTitle,
      monthlyEmptyDashboardTitle,
      customEmptyDashboardTitle,
    } = strings.homeScreen;
    const {emptyCreditList, emptyDebitList} = strings.allTransactions;

    switch (selectedFilter) {
      case 'all':
        return overallEmptyDashboardTitle;
      case 'month':
        return monthlyEmptyDashboardTitle;
      case 'custom':
        return customEmptyDashboardTitle;
      case 'credit':
        return emptyCreditList;
      case 'debit':
        return emptyDebitList;
    }
  };
  return (
    <View style={styles.container}>
      <Image source={images.emptyDashboardImage} style={styles.image} />
      <Text style={styles.title}>{error || getTitle()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  image: {
    height: '70%',
    width: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: perfectSize(18),
    //fontFamily: fonts.quicksandBold,
    textAlign: 'center',
    color: colors.titleColor,
    padding: '5%',
  },
});
