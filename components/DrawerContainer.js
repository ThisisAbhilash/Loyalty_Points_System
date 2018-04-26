import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
//import Hr from 'react-native-hr';

export default class DrawerContainer extends React.Component {

  logout = () => {
    // This will reset back to loginStack
    // https://github.com/react-community/react-navigation/issues/1127
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      key: null,  // black magic
      actions: [NavigationActions.navigate({ routeName: 'loginStack' })]
    })
    this.props.navigation.dispatch(actionToDispatch)
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
       <ScrollView style={{flex:1, backgroundColor:'white'}}>
       <View style={{ flexDirection: 'row' }}>
        <Image source={require('../assets/icons/account.png')} 
               style={{width: 30, height: 30, marginTop: 12}}
        />
        <Text onPress={() => navigation.navigate('account')} 
              style={styles.uglyDrawerItem}
        >
          Account
        </Text>
        </View>
        <View style={styles.hairline} />
        
        <View style={{ flexDirection: 'row' }}>
        <Image source={require('../assets/icons/book.png')} 
               style={{width: 30, height: 30, marginTop: 10}}
          />
        <Text onPress={() => navigation.navigate('booktickets')} 
              style={styles.uglyDrawerItem}
        >
          Book Tickets
        </Text>
        </View>
        <View style={styles.hairline} />

        <View style={{ flexDirection: 'row' }}>
        <Image source={require('../assets/icons/partners.png')} 
               style={{width: 30, height: 30, marginTop: 10}}
          />
        <Text onPress={() => navigation.navigate('partners')} 
              style={styles.uglyDrawerItem}
        >
          Our Partners
        </Text>
        </View>
        <View style={styles.hairline} />
        


        <View style={{ flexDirection: 'row'}}>
        <Image source={require('../assets/icons/about.png')} 
               style={{width: 22, height: 22, marginTop: 12}}
        />
        <Text onPress={() => navigation.navigate('about')} 
              style={styles.uglyDrawerItem}
        >
          About us
        </Text>
        </View>
        <View style={styles.hairline} />
        
        <View style={{ flexDirection: 'row' }}>
        <Image source={require('../assets/icons/faq.jpg')} 
               style={{width: 30, height: 30, marginTop: 9}}
          />
        <Text onPress={() => navigation.navigate('faq')} 
              style={styles.uglyDrawerItem}
        >
          FAQ
        </Text>
        </View>
        <View style={styles.hairline} />
        
        <View style={{ flexDirection: 'row' }}>
        <Image source={require('../assets/icons/contact.png')} 
               style={{width: 25, height: 25, marginTop: 10}}
          />
        <Text onPress={() => navigation.navigate('contact')} 
              style={styles.uglyDrawerItem}
        >
          Contact
        </Text>
        </View>
        <View style={styles.hairline} />
        

        <View style={{ flexDirection: 'row' }}>
        <Image source={require('../assets/icons/logout.jpg')} 
               style={{width: 30, height: 30, marginTop: 9}}
          />
        <Text onPress={this.logout}
              style={styles.uglyDrawerItem}
        >
          Log Out
        </Text>
        </View>
        <View style={styles.hairline} />
       
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  uglyDrawerItem: {
    fontSize: 18,
    color: 'blue',
    padding: 7,
    backgroundColor: 'white',
    overflow: 'hidden',
    textAlign: 'center'
  },
  lineStyle:{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    alignSelf: 'stretch'
 },
 hairline: {
  backgroundColor: '#A2A2A2',
  height: 3,
  width: 300
},
})
