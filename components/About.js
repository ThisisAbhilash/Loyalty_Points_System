import React from 'react'
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'

export default class About extends React.Component {
  static navigationOptions = {
    drawerLabel: 'About',
    drawerIcon: () => (
      <Image
        source={require('../assets/icons/about.png')}
        style={{width: 30, height: 30, borderRadius: 15}}
      />
    )
  }

  render() {
    return (
      <ImageBackground source={require('../assets/background.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text>About the Application</Text>
      </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    
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
