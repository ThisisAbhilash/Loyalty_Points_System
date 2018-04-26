import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

class CustomButton extends Component {
	render() {
		const { text, onPress} = this.props;
		return (
		  <TouchableOpacity style={styles.buttonStyle}
			onPress={() => onPress()}
		  >
			 <Text style={styles.textStyle}>{text}</Text>
		  </TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize:16,
	color: '#ffffff',
	textAlign: 'center'
  },
  
  buttonStyle: {
	padding:10,
	backgroundColor: '#202646',
    borderRadius:5,
    marginLeft: 40,
    marginRight: 40
  }
});

export default CustomButton;

