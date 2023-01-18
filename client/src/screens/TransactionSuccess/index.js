/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text, Image, StatusBar, DeviceEventEmitter} from 'react-native';
import styles from './styles';
import {images, colors, strings, perfectSize} from '../../theme';
import {Button} from '../../components';
import {getDisplayDate} from '../../utils/globalMethods';
export default function TransactionSuccess({navigation, route}) {
  const handleOnSubmit = () => {
    navigation.pop(2);
  };
  let {
    successMessage,
    buttonTitle,
    transactionType,
    date,
    amountHeader,
    incomeHeader,
    expenseHeader,
  } = strings.transactionSuccess;
  let {isFromIncome, amount, transactionDate} = route.params;
  useEffect(() => {
    DeviceEventEmitter.emit('HideTabBar', true);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={colors.primaryBackgroundColor}
        barStyle="light-content"
      />
      <Image
        source={images.transactionSuccess}
        style={styles.successImage}
        resizeMode="contain"
      />
      <Text style={styles.successMessage}>{successMessage}</Text>
      <View style={styles.detailsContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.labelHeader}>{transactionType}</Text>
            <Text style={styles.labelTitle}>
              {isFromIncome ? incomeHeader : expenseHeader}
            </Text>
          </View>
          <View>
            <Text style={styles.labelHeader}>{amountHeader}</Text>
            <Text style={[styles.labelTitle, {fontSize: perfectSize(30)}]}>
              {amount}
            </Text>
          </View>
        </View>
        <View style={{marginTop: '10%'}}>
          <Text style={styles.labelHeader}>{date}</Text>
          <Text style={styles.labelTitle}>
            {getDisplayDate(transactionDate)}
          </Text>
        </View>
      </View>
      <Button
        title={buttonTitle}
        position="absolute"
        bottom={perfectSize(30)}
        active={true}
        onPress={() => handleOnSubmit()}
      />
    </View>
  );
}
