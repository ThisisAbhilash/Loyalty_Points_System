import React, { Component } from 'react';
import { View, StyleSheet, Button, ScrollView, Keyboard, KeyboardAvoidingView, Alert  } from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  phonenumber: t.String,
  email: t.maybe(t.String),
  username: t.maybe(t.String),
  password: t.String
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

const options = {
  fields: {
    phonenumber: {
      error: 'Mobile Number is must'
    },
    password: {
      error: 'Choose a Strong Password'
    }
  },
  stylesheet: formStyles,
};

export default class Register extends Component {

  randomFixedInteger = function (length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
  }
  gotoOTPScreen(value){
    this.props.navigation.navigate('otpverificationscreen', { userMobileNumber: value.phonenumber, generatedOTP: generatedOTP, 
      userName: value.username, userEmail:value.email, userPassword: value.password} );
  }
  handleSubmit = () => {
    const value = this._form.getValue();
    console.log('value: ', value);
    var reg = new RegExp('^[0-9]+$');
    if(value) {
      if(value.phonenumber.length !== 10 || !reg.test(value.phonenumber)) {
        Alert.alert(
          'Incorrect Mobile Number',
          'Please enter exact 10 digit mobile number.',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      }else{
        var generatedOTP = this.randomFixedInteger(6);
        console.log("Generated OTP is ",generatedOTP);
        fetch('http://20.188.96.150:4000/sendOTP/${value.phonenumber}/${generatedOTP}')  
        .then((response) => response.json())
        .then((responseData) => {
          Alert.alert(
            'OTP sent',
            'Otp has been sent to your Mobile Number.' + value.phonenumber,
            [
              {text: 'OK', onPress: () => this.gotoOTPScreen(value)},
            ],
            { cancelable: false }
          )
          
          })
        
      }
    }
    
  }
  
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <Form 
          ref={c => this._form = c}
          type={User} 
          options={options}
        />
        <Button
          title="Sign Up!"
          onPress={this.handleSubmit}
        />
       </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    // justifyContent: 'center',
    // marginTop: 50,
    // padding: 20,
    backgroundColor: '#ffffff',
  },
});
