/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  StatusBar,
  DeviceEventEmitter,
} from 'react-native';
import {setEndpointData} from '../../Home/actions';
import {Button, ButtonWithImage, PrimaryHeader} from '../../../components';
import {connect} from 'react-redux';
import {images, colors, fonts, perfectSize, strings} from '../../../theme';
import styles from './styles';

class AddEndpoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: this.props?.AppReducer?.endpoint?.ip,
      port: this.props?.AppReducer?.endpoint?.port,
    };
  }

  isActive = () => {
    const {ip, port} = this.state;
    return ip == '' && port === '' ? false : true;
  };

  handleOnSubmit = async () => {
    const {ip, port} = this.state;
    const data = {
      ip,
      port,
    };
    this.props.setEndpointData({
      data,
    });
    setTimeout(() => {
      DeviceEventEmitter.emit('HideTabBar', false);
      this.props.navigation.pop(2);
      this.props.navigation.navigate('Home');
    }, 2000);
  };
  render() {
    const {ipPlaceholder, portPlaceHolder, buttonTitle, headerTitle} =
      strings.addEndpoint;
    const {ip, port} = this.state;
    return (
      <>
        <StatusBar
          translucent
          backgroundColor={colors.primaryBackgroundColor}
          barStyle="light-content"
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <PrimaryHeader
              onPress={() => this.props.navigation.goBack()}
              title={headerTitle}
              leftImage={images.backArrow}
              rightImage={images.income}
              rightTintColorDisabled
              rightImageOpacity={1}
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholderTextColor="rgba(255,255,255,0.3)"
                selectionColor={colors.primaryAppColor}
                placeholder={ipPlaceholder}
                onChangeText={ip => this.setState({ip: ip.trim()})}
                value={ip}
                returnKeyType="next"
                onSubmitEditing={() => this.portInput.focus()}
                blurOnSubmit={false}
                ref={input => {
                  this.ipInput = input;
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholderTextColor="rgba(255,255,255,0.3)"
                selectionColor={colors.primaryAppColor}
                placeholder={portPlaceHolder}
                returnKeyType="next"
                onChangeText={port => this.setState({port: port})}
                value={port}
                blurOnSubmit={false}
                ref={input => {
                  this.portInput = input;
                }}
              />
            </View>
            <Button
              title={buttonTitle}
              position="absolute"
              bottom={perfectSize(30)}
              active={this.isActive()}
              onPress={() => this.handleOnSubmit()}
            />
            {this.state.isKeyboard && (
              <View
                style={{
                  alignSelf: 'flex-end',
                  bottom: perfectSize(30),
                }}>
                <ButtonWithImage
                  onPress={() => Keyboard.dismiss()}
                  image={images.confirm}
                  animatedButton
                />
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {LoginReducer: state.LoginReducer, AppReducer: state.AppReducer};
};

const mapDispatchToProps = {
  setEndpointData,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEndpoint);
