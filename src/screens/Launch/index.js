/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import {images, perfectSize, colors, fonts, strings} from '../../theme';
import {styles} from './styles';
export default function Launch({navigation}) {
  const slideImage = useRef(new Animated.Value(perfectSize(-1000))).current;
  const slideModal = useRef(new Animated.Value(perfectSize(-1000))).current;
  const slideButton = useRef(new Animated.Value(perfectSize(200))).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const slideUp = () => {
    Animated.parallel([
      Animated.timing(slideImage, {
        toValue: perfectSize(30),
        duration: 2000,
        useNativeDriver: false,
        easing: Easing.elastic(1),
      }),
      Animated.timing(slideModal, {
        toValue: perfectSize(0),
        duration: 2000,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    slideUp();
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(slideButton, {
          toValue: perfectSize(0),
          duration: 1000,
          useNativeDriver: false,
        }),
      ]).start();
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.primaryBackgroundColor}
        barStyle="light-content"
      />

      {/* <Animated.Image
        source={images.launchScreenLogo}
        style={{
          height: '60%',
          width: '100%',
          marginTop: slideImage,
        }}
        resizeMode="contain"
      /> */}
      <Animated.View
        style={{
          position: 'absolute',
          backgroundColor: colors.secondaryBackgroundColor,
          height: '40%',
          width: '100%',
          borderTopLeftRadius: perfectSize(25),
          borderTopRightRadius: perfectSize(25),
          bottom: slideModal,
          alignItems: 'center',
          padding: perfectSize(20),
        }}>
        <Animated.Text style={[styles.title, {opacity: opacity}]}>
          {strings.launchScreen.title}
        </Animated.Text>
        <Animated.Text style={[styles.subTitle, {opacity: opacity}]}>
          {strings.launchScreen.subTitle}
        </Animated.Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={{
            height: perfectSize(60),
            width: perfectSize(200),
            borderRadius: perfectSize(5),
            backgroundColor: colors.primaryAppColor,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10%',
          }}>
          <Animated.View
            style={{
              position: 'absolute',
              backgroundColor: colors.secondaryBackgroundColor,
              height: perfectSize(71),
              width: slideButton,
              alignSelf: 'flex-start',
              borderRadius: perfectSize(5),
              zIndex: 1,
            }}
          />
          <Text
            style={{
            //   fontFamily: fonts.quicksandBold,
              color: colors.titleColor,
              fontSize: perfectSize(20),
            }}>
            {strings.launchScreen.signupTitle}
          </Text>
        </TouchableOpacity>
        <Text
          onPress={() => navigation.navigate('Login')}
          style={styles.loginButton}>
          {strings.launchScreen.loginTitle}
        </Text>
      </Animated.View>
    </View>
  );
}
