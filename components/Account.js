import React from 'react';
import { StyleSheet, Text, View, Image, Alert, ImageBackground, ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode';
import { Keyboard } from 'react-native';
import { ImagePicker } from 'expo';
import CustomButton from '../components/CustomButton';


export default class Account extends React.Component {
  componentWillMount() {
    console.log("Account ",this.props.navigation.state.params);
    Keyboard.dismiss();
    //call api to fetch username,email,userAddress
    fetch(`http://20.188.96.150:4000/contractGetBalance/${encodeURIComponent(this.state.userAddress)}`)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ points: responseData, loading: false });
      })
  }
  state = {
    userName: "i_am_abhilash",
    emailID: "abhilashthakur@gmail.com",
    points: 0,
    userAddress: "0xc81e59054EA9adE7a58EFd6bEAd86Eec9B3E773B",
    showQRcode: false,
    loading: true,
    image: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
  }

  static navigationOptions = {
    drawerLabel: 'Account',
    drawerIcon: () => (
      <Image
        source={require('../assets/icons/account.png')}
        style={{ width: 30, height: 30, borderRadius: 15 }}
      />
    )
  }
  showPointHistory = () => {
    Alert.alert(
      'Show All audit here',
      'Otp has been sent to your Mobile Number.',
      [
        { text: 'OK', onPress: () => console.log("Good") },
      ],
      { cancelable: false }
    )
  }
  hideQR = () => {
    this.setState({ showQRcode: false });
  }
  showQR = () => {
    this.setState({ showQRcode: true });
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  render() {
    var qrData = "UserName$" + this.state.userName + "$emailID$" + this.state.emailID + "$points$" + this.state.points;
    var toShow = <CustomButton text="Generate QR Code"
      onPress={this.showQR} />;
    if (this.state.showQRcode) {
      toShow = <View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <QRCode
          value={qrData}
          size={180}
          bgColor='purple'
          fgColor='white'
        />
        <CustomButton text="Hide QR Code"
          onPress={this.hideQR} />
      </View>
    }
    return (
      <ImageBackground source={require('../assets/background.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={{ zIndex: 2000, fontSize: 18, fontStyle: 'italic', textAlign: 'right' }}>Welcome {this.state.userName}</Text>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>

            <Image
              style={{
                paddingVertical: 30,
                width: 150,
                height: 150,
                borderRadius: 75,

              }}
              resizeMode='cover'
              source={{
                uri: this.state.image
              }}
            />
          </View>
          <CustomButton text="Upload Image" onPress={this._pickImage} />

          <Text style={{ fontSize: 18, fontStyle: 'normal', textAlign: 'center' }}>Available Loyalty Points {this.state.points}</Text>
          <Text onPress={this.showPointHistory} style={{
            color: 'blue', fontSize: 16, textDecorationLine: 'underline',
            fontStyle: 'normal', textAlign: 'right', paddingBottom: 20
          }}>Show Point History</Text>
          {toShow}
          {this.state.loading &&
            <View style={styles.loading}>
              <ActivityIndicator size='large' />
            </View>
          }
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
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88'
  }
})
