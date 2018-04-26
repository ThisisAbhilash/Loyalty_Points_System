import React from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'

export default class ForgottenPasswordScreen extends React.Component {
  render() {
    return (
      <ImageBackground source={require('../assets/background.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text>Here, We will add the Password recovery Mechanism.
              Maybe by, sending OTP to verify Phone Number.
        </Text>
      </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
   flex: 1,
   width: null,
   height: null
 }
})
