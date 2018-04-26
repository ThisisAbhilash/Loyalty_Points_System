import React, { Component } from 'react';
import { View, StyleSheet, Button, Text, Alert } from 'react-native';
import t from 'tcomb-form-native'; 

const Form = t.form.Form;

const User = t.struct({
  otp: t.String
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
    otp: {
      error: 'Enter the OTP received on your mobile'
    }
  },
  stylesheet: formStyles,
};

export default class Otpverificationscreen extends Component {
  OTPmatched(otp) {
    const generatedOTP = this.props.generatedOTP;
    return generatedOTP === otp;
  }
  handleSubmit = () => {
    const value = this._form.getValue();
    console.log('otp entered: ', value);
    if(OTPmatched(value)){
      this.props.navigation.navigate('drawerStack');
    }
    else{
      Alert.alert(
        'Failure',
        'Otp doesnot Match.Try Again',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
    
  }
  resendOTP(mobile) {
    Alert.alert(
      'OTP sent',
      'Otp has been sent at your Mobile Number.',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }
  render() {
    const userMobileNumber = this.props.userMobileNumber;
    return (
      <View style={styles.container}>
        <Form 
          ref={c => this._form = c}
          type={User} 
          options={options}
        />
        <Button
          title="Verify OTP"
          onPress={this.handleSubmit}
        />
        <View style={{paddingTop: 10}}> OTP sent at {userMobileNumber}.</View>
        <View style={{flexDirection: 'row'}}>
        <Text style={{paddingTop: 10}}>Didn't receive OTP yet?</Text>
        <Text
          style={styles.linky}
           onPress={() => this.resendOTP(userMobileNumber)} >
           Resend
         </Text>
         </View>
         <View>OTP expires in 180 secs.</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
     linky: {
       color: 'blue',
       paddingTop: 10
     }
});
