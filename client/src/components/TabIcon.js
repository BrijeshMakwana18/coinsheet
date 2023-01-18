/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, Text} from 'react-native';
import {colors, fonts, perfectSize} from '../theme';

export default function TabBarIcon(props) {
  return (
    <View
      style={{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          height: perfectSize(50),
          width: perfectSize(50),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={props.source}
          resizeMode="contain"
          style={{
            height: perfectSize(props.focused ? 50 : 30),
            width: perfectSize(props.focused ? 50 : 30),
          }}
        />
      </View>
      <Text
        style={{
          color: props.focused
            ? colors.activeTabColor
            : colors.inactiveTabColor,
          fontSize: perfectSize(12),
          //fontFamily: fonts.avenirMedium,
        }}>
        {props.name}
      </Text>
    </View>
  );
}
