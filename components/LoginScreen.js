import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import { View, StyleSheet, Text, Alert, ImageBackground, TextInput, Image } from 'react-native';
import CustomButton from '../components/CustomButton';

const imageAddress = [require('../assets/hwh.jpg')];

export default class Login extends Component {
  state = {
    otp: "",
    phonenumber: "",
    generatedOTP: "",
  }
  randomFixedInteger = function (length) {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
  }
  mobileNumberRegistered = function (phonenumber) {
    return true;
  }
  handleSubmit = () => {

    var reg = new RegExp('^[0-9]+$');
    if (this.state.phonenumber.length !== 10 || !reg.test(this.state.phonenumber)) {
      Alert.alert(
        'Incorrect Mobile Number',
        'Please enter exact 10 digit mobile number.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
    }
    else if (!(this.mobileNumberRegistered(this.state.phonenumber))) {
      Alert.alert(
        'Mobile Number not Registered.',
        'Please first create a account at www.lms.com. ',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
    }
    else {
      if (this.state.otp == this.state.generatedOTP) {
        this.props.navigation.navigate('drawerStack', { phoneNumber: "1234567" });
      }
      else {
        Alert.alert(
          'Login Failed',
          'OTP Verification Failed. Retry',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        )
      }
    }

  }
  directLogin = () => {
    this.props.navigation.navigate('drawerStack', { phoneNumber: "1234" });
  }
  sendOTP = () => {

    var reg = new RegExp('^[0-9]+$');
    if (this.state.phonenumber.length !== 10 || !reg.test(this.state.phonenumber)) {
      Alert.alert(
        'Incorrect Mobile Number',
        'Please enter exact 10 digit mobile number.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
    }
    else if (!(this.mobileNumberRegistered(this.state.phonenumber))) {
      Alert.alert(
        'Mobile Number not Registered.',
        'Please first create a account at www.lms.com. ',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
    }
    else {
      var generatedOTP = this.randomFixedInteger(6);
      fetch(`http://20.188.96.150:4000/sendOTP/${encodeURIComponent(this.state.phonenumber)}/${encodeURIComponent(generatedOTP)}`)
        .then((response) => response.json())
        .then((responseData) => {
          Alert.alert(
            'OTP sent',
            'Otp has been sent to your Mobile Number.' + this.state.phonenumber,
            [
              { text: 'OK', onPress: () => console.log("Good") },
            ],
            { cancelable: false }
          )
          this.setState({ generatedOTP: generatedOTP });
        })
    }
  }
  render() {
    return (
      <ImageBackground source={require('../assets/background.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <TextInput
            style={styles.textofInput}
            value={this.state.phonenumber}
            placeholder="Enter the registered Mobile Number"
            placeholderTextColor="#9a73ef"
            keyboardType='numeric'
            onChangeText={(text) => this.setState({ phonenumber: text })} />
          <CustomButton text="Send OTP" onPress={this.sendOTP} />
          <View style={{ paddingTop: 30 }} />
          <TextInput
            style={styles.textofInput}
            value={this.state.otp}
            placeholder="Enter the OTP received"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            keyboardType='numeric'
            onChangeText={(text) => this.setState({ otp: text })} />
          <CustomButton
            text="Login"
            onPress={this.handleSubmit}
            style={{ paddingTop: 10 }}
          />
          <CustomButton
            text="Test login"
            onPress={this.directLogin} />
          <Image
            source={imageAddress[0]}
            style={{ width: 320, height: 200 }}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 40,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  linky: {
    color: 'blue',
    paddingTop: 10
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  },
  textofInput: {
    fontSize: 18
  }
});
