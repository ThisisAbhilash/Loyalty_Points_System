import React from 'react'
import { Text, Animated, Easing, Button, View, Image } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import LoginScreen from '../components/LoginScreen'
import SignupScreen from '../components/SignupScreen'
import ForgottenPasswordScreen from '../components/ForgottenPasswordScreen'
import Account from '../components/Account'
import About from '../components/About'
import Contact from '../components/Contact'
import Partners from '../components/Partners'
import BookTicket from '../components/BookTicket'
import Faq from '../components/Faq'
import DrawerContainer from '../components/DrawerContainer'
import Otpverificationscreen from '../components/Otpverificationscreen'


const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

// drawer stack
const DrawerStack = DrawerNavigator({
  account: { screen: Account },
  booktickets: {screen: BookTicket},
  about: { screen: About },
  contact: { screen: Contact },
  partners: { screen: Partners },
  faq: { screen: Faq },
}, {
    gesturesEnabled: false,
    contentComponent: (props) => <DrawerContainer {...props} />
  })

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#4286f4' },
      //title: 'Welcome',
      headerTitleStyle: { alignSelf: 'flex-end' },
      gesturesEnabled: false,
      headerLeft: <Button onPress={() => {
        if (navigation.state.index === 0) {
          navigation.navigate('DrawerOpen')
        } else {
          navigation.navigate('DrawerClose')
        }
      }} title='Menu' />
    })
  })


const LoginStack = StackNavigator({
  loginScreen: { screen: LoginScreen },
  signupScreen: { screen: SignupScreen },
  forgottenPasswordScreen: { screen: ForgottenPasswordScreen, navigationOptions: { title: 'Forgot Password' } },
  otpverificationscreen: { screen: Otpverificationscreen }
}, {
    headerMode: 'float',
    navigationOptions: {
      headerStyle: { backgroundColor: '#4286f4' },
      headerTitle: (
        <View style={{ flexDirection: 'row'}}>
          <Text style={{fontSize: 20, paddingTop: 5, paddingLeft: 5, fontWeight: 'bold'}}>Loyalty Management System</Text></View>
      ),    
    }
  })


const PrimaryNav = StackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: DrawerNavigation }
}, {

    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'loginStack',
    transitionConfig: noTransitionConfig
  })

export default PrimaryNav
