import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { CheckBox } from 'react-native-elements'
import CustomButton from '../components/CustomButton';

export default class Contact extends React.Component {
    state = {
        userName: "i_am_abhilash",
        emailID: "abhilash.thakur@gmail.com",
        addressHash: "0xc81e59054EA9adE7a58EFd6bEAd86Eec9B3E773B",
        points: 0,
        location: "",
        totalTickets: 0,
        totalAmount: "Rs. 0.00",
        amountToPay: "Rs. 0.00",
        payWithPoints: false,
        usePoint: '',
        mobileNumber: '7278094634',
        loading: true,
        dropDownListPoints: []
    }
    static navigationOptions = {
        drawerLabel: 'Book Tickets',
        drawerIcon: () => (
            <Image
                source={require('../assets/icons/book.png')}
                style={{ width: 30, height: 30, borderRadius: 15 }}
            />
        )
    }
    componentWillMount() {
        // call api get username, email , address
        //then get points
        console.log("book tickets", this.props.navigation.state.params);
        fetch(`http://20.188.96.150:4000/contractGetBalance/${encodeURIComponent(this.state.addressHash)}`)
            .then((response) => response.json())
            .then((responseData) => {
                var i = 1, list = [];
                while (i <= parseInt(responseData)) {
                    list.push({ value: i.toString() });
                    i++;
                }
                this.setState({ points: responseData, loading: false, dropDownListPoints: list });
            })
    }
    bookTickets = () => {
        var list = this.state.amountToPay.split('.');
        console.log(list);
        var amountPaid = parseInt(list[1]);
        var tokensAdded = Math.floor(amountPaid / 100);

        var pointsUsed = parseInt(this.state.usePoint);
        var updatedPoints = parseInt(this.state.points) + tokensAdded - pointsUsed;
        console.log(updatedPoints);
        Alert.alert(
            'Updated Points = ' + updatedPoints,
            'Points Spent = ' + pointsUsed + "& Points Earned = " + tokensAdded,
            [
                { text: 'OK', onPress: () => console.log("Good") },
            ],
            { cancelable: false }
        )
        //call decrement api 
        if (this.state.payWithPoints && pointsUsed != 0) {
            fetch(`http://20.188.96.150:4000/contractDecrementBalance/${encodeURIComponent(this.state.addressHash)}/${encodeURIComponent(pointsUsed)}`)
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                })
        }
        //call increment api
        if (tokensAdded != 0) {
            fetch(`http://20.188.96.150:4000/contractIncrementBalance/${encodeURIComponent(this.state.addressHash)}/${encodeURIComponent(tokensAdded)}`)
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                })
        }
        this.sendMessageForBooking(this.state.mobileNumber, this.state.userName, this.state.location,
            updatedPoints, this.state.totalTickets);
    }
    randomFixedInteger = function (length) {
        return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
    }
    sendMessageForBooking = function (mob, name, loc, points, tickets) {
        mob = "91" + mob;
        var todayDate = new Date().toString();
        var divDate = todayDate.split(' ');
        todayDate = divDate[0] + " " + divDate[1] + " " + divDate[2] + " " + divDate[3] + " " + divDate[4]+" "+divDate[6];
        var ticketID = "TIC:" + this.randomFixedInteger(8);
        var apikey = 'IDtM3WWJ7dA-UFHAg5OgxQ9wxHxW3lEHBssCra3jVi';
        fetch(`http://20.188.96.150:4000/sendMessage/${encodeURIComponent(apikey)}/${encodeURIComponent(mob)}
        /${encodeURIComponent(name)}/${encodeURIComponent(loc)}
        /${encodeURIComponent(todayDate)}/${encodeURIComponent(points)}
        /${encodeURIComponent(tickets)}/${encodeURIComponent(ticketID)}`)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
            })
    }
    setUP = (event) => {
        var tic = parseInt(event);
        tic = 30 * tic;
        var totalAmount = "Rs. " + tic.toString() + ".00";
        this.setState({
            totalTickets: parseInt(event), totalAmount: totalAmount,
            amountToPay: totalAmount
        });
    }
    updateAll = (event) => {
        console.log(event);
        var tic = this.state.totalTickets;
        tic = 30 * tic;
        var points = parseInt(event);
        var totalAmount = "";

        if (tic < points) {
            totalAmount = "Rs. 0.00";
        }
        else {
            totalAmount = "Rs. " + (tic - points).toString() + ".00";
        }
        this.setState({ amountToPay: totalAmount, usePoint: event });
    }
    payWithLoyaltyPoints = () => {
        console.log(this.state.payWithPoints);
        var checked = false;
        if (!this.state.payWithPoints) {
            checked = true;
            this.setState({ payWithPoints: checked });
        } else {
            var tic = this.state.totalTickets;
            tic = 30 * tic;
            var ta = totalAmount = "Rs. " + tic.toString() + ".00";
            this.setState({ amountToPay: ta, payWithPoints: checked });
        }

    }
    render() {
        var dropdownLocationData = [{
            value: 'Eco Park',
        }, {
            value: 'Madam Wax Mueseum',
        }, {
            value: 'Nicco Park',
        }, {
            value: 'Vivek Tirtha',
        }];
        var dropdownTicket = [{
            value: '1',
        }, {
            value: '2',
        }, {
            value: '3',
        }, {
            value: '4',
        }, {
            value: '5',
        }, {
            value: '6',
        }, {
            value: '7',
        }, {
            value: '8',
        },
        {
            value: '9',
        }, {
            value: '10',
        }
        ];
        var addInput;
        if (this.state.payWithPoints) {
            addInput = <Dropdown label='How many Loyalty Points to spend?' labelFontSize={16}
                itemColor="green" data={this.state.dropDownListPoints} selectedItemColor="blue" onChangeText={(event) => { this.updateAll(event) }}
            />
        }
        return (
            <ImageBackground source={require('../assets/background.png')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Enter the ticket booking Details</Text>
                    <Dropdown
                        label='Select Location'
                        labelFontSize={16}
                        itemColor="green"
                        data={dropdownLocationData}
                        selectedItemColor="blue"
                        onChangeText={(event) => { this.setState({ location: event }) }}
                    />
                    <Dropdown
                        label='No. of Tickets'
                        labelFontSize={16}
                        itemColor="green"
                        data={dropdownTicket}
                        selectedItemColor="blue"
                        selectedIndex={this.state.totalTickets}
                        onChangeText={(event) => { this.setUP(event) }}
                    />
                    <Text
                        style={{ paddingTop: 15, fontSize: 14, fontStyle: 'normal', textAlign: 'center' }}>
                        Total Amount(Rs 30/- per Ticket) = {this.state.totalAmount}
                    </Text>
                    <Text style={{ paddingTop: 15, fontSize: 14, fontStyle: 'normal', textAlign: 'center' }}>Available Loyalty Points {this.state.points}</Text>
                    <CheckBox
                        title='Do you want to pay with loyalty points?'
                        checked={this.state.payWithPoints}
                        onPress={() => { this.payWithLoyaltyPoints() }}
                    />
                    {addInput}
                    <Text
                        style={{ paddingTop: 15, paddingBottom: 10, fontSize: 14, fontStyle: 'normal', textAlign: 'center' }}>
                        Final amount to Pay = {this.state.amountToPay}
                    </Text>
                    <CustomButton text="Book Tickets" onPress={() => this.bookTickets()} />
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
        backgroundColor: '#ccc',
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
});