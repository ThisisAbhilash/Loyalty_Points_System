import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { MapView } from 'expo';

export default class Contact extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Contact',
    drawerIcon: () => (
      <Image
        source={require('../assets/icons/contact.png')}
        style={{width: 30, height: 30, borderRadius: 15}}
      />
    )
  }

  render() {
    var markers = 
      {
        latitude: 22.5801,
        longitude: 88.4729,
        title: 'Newtown',
        subtitle: 'Hidco Bhawan'
      }
    ;
    return (
      <ImageBackground source={require('../assets/background.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={{fontSize: 16, fontStyle: 'italic', textDecorationLine:'underline'}}>Contact</Text>
        <Text style={{fontSize: 14}}>For any assistance/issue :-</Text>
        <Text style={{fontSize: 14}}>Address: Premises No. 35-1111, Biswa Bangla Sarani, 3rd Rotary, Newtown, Kolkata, West Bengal 700156</Text>
        <Text style={{fontSize: 14}}>Hours: 10am - 6pm</Text>
        <Text style={{fontSize: 14}}>Phone: 033 2324 6037</Text>
        <Text style={{fontSize: 14}}>Owner: Government of West Bengal</Text>

        <MapView
        style={styles.map}
        initialRegion={{
          latitude: 22.5801,
          longitude: 88.4729,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
       <MapView.Marker
            coordinate={markers}
          />
      </MapView>
      </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
   flex: 1,
   width: null,
   height: null
 },
 map: {
   alignSelf: 'stretch', 
   height: 350 
}
})
