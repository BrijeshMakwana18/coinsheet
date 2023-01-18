import React from 'react';
import {View, Text} from 'react-native';
import {colors, perfectSize} from '../../theme';
export const CircularChart = ({totalIncome, item, index}) => {
  let percent = (item.total * 100) / totalIncome;
  return (
    <View
      style={[
        styles.catContainer,
        {
          backgroundColor: colors.secondaryBackgroundColor,
          marginTop: index <= 1 ? '5%' : 0,
          marginBottom: '2%',
          height: 'auto',
        },
      ]}>
      <CircularProgress
        percent={percent.toFixed(2)}
        radius={perfectSize(50)}
        bgRingWidth={perfectSize(12)}
        progressRingWidth={perfectSize(10)}
        ringColor={colors.primaryAppColor}
        ringBgColor={colors.tabBarBackgroundColor}
        textFontSize={perfectSize(18)}
        textFontColor={colors.titleColor}
        textFontWeight={'bold'}
        clockwise={true}
        bgColor={'white'}
        startDegrees={0}
        marginTop="10%"
      />
      <Text
        style={{
          fontSize: perfectSize(18),
          //fontFamily: fonts.quicksandBold,
          color: colors.titleColor,
          marginTop: '10%',
        }}>
        {item.title}
      </Text>
      <Text
        style={{
          fontSize: perfectSize(18),
          //fontFamily: fonts.quicksandBold,
          color: colors.titleColor,
          marginTop: '5%',
          marginBottom: '10%',
        }}>
        {item.total}
      </Text>
    </View>
  );
};
