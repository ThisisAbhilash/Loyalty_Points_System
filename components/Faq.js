import React from 'react'
import { StyleSheet, Text, View, Imagem, ImageBackground } from 'react-native'

export default class Faq extends React.Component {
  static navigationOptions = {
    drawerLabel: 'About',
    drawerIcon: () => (
      <Image
        source={require('../assets/icons/faq.jpg')}
        style={{width: 30, height: 30, borderRadius: 15}}
      />
    )
  }

  render() {
    return (
      <ImageBackground source={require('../assets/background.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold', textDecorationLine:'underline'}}>FAQ About the Application</Text>
        <Text style={styles.question}>Q. How do I get points ?</Text>
        <Text style={styles.answer}>A. You get loyalty point credited in your account when you visit Eco park, Madam Wax or other places.
                 While booking tickets, make sure you provide your mobile number at the counter.</Text>
        <Text style={styles.question}>Q. How many points do I get ?</Text>
        <Text style={styles.answer}>A. You get One loyalty point per 100 /- Rupees you spend.</Text>

        <Text style={styles.question}>Q. How do I redeem my points ?</Text>
        <Text style={styles.answer}>A. You can book tickets using your points or can use these points with our associated partner's.</Text>
      </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc'
  },
  backgroundImage: {
   flex: 1,
   width: null,
   height: null
 },
 question: {
   color: 'red',
   fontSize: 14,
   paddingTop: 10
 },
 answer: {
  color: 'green',
  fontSize: 12,
 }
})
