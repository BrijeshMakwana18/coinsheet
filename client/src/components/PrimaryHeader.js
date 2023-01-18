import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {colors, fonts, perfectSize} from '../theme';

export default function PrimaryHeader(props) {
  const {
    onPress,
    title,
    rightImage,
    leftImage,
    leftTintColorDisabled,
    rightTintColorDisabled,
    leftImageOpacity,
    rightImageOpacity,
  } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.leftImageContainer}>
        <Image
          source={leftImage}
          style={[
            styles.leftImage,
            !leftTintColorDisabled && {tintColor: colors.titleColor},
            {
              opacity: leftImageOpacity ? leftImageOpacity : 0.5,
            },
          ]}
        />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        {/* <Image
          source={rightImage}
          style={[
            styles.headerImage,
            !rightTintColorDisabled && {tintColor: colors.titleColor},
            {opacity: rightImageOpacity ? rightImageOpacity : 0.5},
          ]}
          resizeMode="contain"
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftImageContainer: {
    height: perfectSize(25),
    width: perfectSize(25),
  },
  leftImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    opacity: 0.5,
  },
  headerContainer: {
    flexDirection: 'row',
    marginLeft: '10%',
  },
  headerTitle: {
    color: colors.titleColor,
    //fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(25),
  },
  headerImage: {
    height: perfectSize(130),
    width: perfectSize(200),
    top: perfectSize(-40),
    position: 'absolute',
    right: perfectSize(-20),
  },
});
