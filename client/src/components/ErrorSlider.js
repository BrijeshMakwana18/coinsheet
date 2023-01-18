import React from 'react';
import {Text, Animated, StyleSheet} from 'react-native';
import {colors, perfectSize, fonts} from '../theme';

export default function ErrorSlider({...props}) {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          top: props.top,
        },
      ]}>
      <Text style={styles.errorMessage}>{props.error}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '10%',
    backgroundColor: colors.alertBackgroundColor,
    borderRadius: perfectSize(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16.0,
    elevation: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
  },
  errorMessage: {
    //fontFamily: fonts.avenirMedium,
    fontSize: perfectSize(21),
    color: colors.titleColor,
    textAlign: 'center',
    padding: perfectSize(10),
    fontWeight: 'bold',
  },
});
