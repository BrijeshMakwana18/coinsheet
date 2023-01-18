/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {colors, perfectSize} from '../theme';

export default function ButtonWithImage(props) {
  const {onPress, image, animatedButton} = props;
  return (
    <TouchableOpacity
      style={{
        height: perfectSize(60),
        width: perfectSize(60),
        backgroundColor: !animatedButton && colors.titleColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: perfectSize(animatedButton ? 0 : 15),
      }}
      onPress={onPress}>
      <Image
        source={image}
        style={{
          height: perfectSize(animatedButton ? 60 : 20),
          width: perfectSize(animatedButton ? 60 : 20),
          tintColor: !animatedButton && colors.primaryAppColor,
        }}
      />
    </TouchableOpacity>
  );
}
