/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {perfectSize, fonts, colors} from '../theme';
export default function Button({
  disabled,
  shadowColor,
  shadow,
  onPress,
  title,
  loading,
  ...props
}) {
  return (
    <TouchableOpacity
      disabled={disabled || loading ? true : false}
      style={{
        height: perfectSize(56),
        width: perfectSize(300),
        borderRadius: perfectSize(5),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: disabled
          ? colors.inactiveButtonBackgroundColor
          : colors.activeButtonBackgroundColor,
        shadowColor: shadowColor ? shadowColor : colors.primaryShadowColor,
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: shadow ? 0.58 : 0,
        shadowRadius: 16.0,
        elevation: shadow ? 24 : 0,
        ...props,
      }}
      onPress={onPress}>
      {loading ? (
        <></>
      ) : (
        <Text
          style={{
            fontSize: perfectSize(18),
            //fontFamily: fonts.quicksandBold,
            color: disabled
              ? colors.inactiveButtonTitleColor
              : colors.activeButtonTitleColor,
          }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
