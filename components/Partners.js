import React from 'react'
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'

export default class Partners extends React.Component {
  static navigationOptions = {
    drawerLabel: 'About',
    drawerIcon: () => (
      <Image
        source={require('../assets/icons/partners.png')}
        style={{width: 30, height: 30, borderRadius: 15}}
      />
    )
  }

  render() {
    return (
      <ImageBackground source={require('../assets/background.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text>List of associated Partners where user can redeem their points</Text>
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
