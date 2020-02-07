import React, { Component } from "react";
import { StyleSheet, Text, TextInput, SafeAreaView, Image, Alert } from 'react-native';
import Constants from '../config/constants'
import BaseStyle from '../utils/BaseStyle'
import validationInput from '../utils/validation'
import { TouchableOpacity } from "react-native-gesture-handler";
import ProgressDialog from '../utils/ProgessDialogUtil';
import ApiManager from '../ApiService/ApiManager';
import constants from "../config/constants";
import AsyncStorage from '@react-native-community/async-storage'
import LoadingComponent from "./LoadingComponent";

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    if (Constants.isLoggedIn) {
      this.props.navigation.navigate('Home')
    } else {
      this.state = {
        profile: "",
        isProgress: false,
        controls: {
          email: {
            value: "jm1@example.com",
            valid: false,
            validationRules: {
              isEmail: true
            },
            touched: false
          },
          password: {
            value: "jay@123",
            valid: false,
            validationRules: {
              minLength: 6
            },
            touched: false
          },
        },

      }
    }



  }
  render() {
    return (
          //  <KeyboardAvoidingView style={BaseStyle.container} behavior="padding">
      

        <SafeAreaView style={BaseStyle.container}>
           <LoadingComponent isLoading={this.state.isProgress} />
          <Image
            style={BaseStyle.image}
            source={{ uri: 'https://facebook.github.io/react-native/img/tiny_logo.png' }}
          />
          <TextInput style={BaseStyle.input}
            onChangeText={val => this.validateUserInput("email", val)}
            value={this.state.controls.email.value}
            touched={this.state.controls.email.touched}
            autoCorrect={false}
            placeholder='Email'
            keyboardType='email-address'
          ></TextInput>
          <TextInput style={BaseStyle.input}
            onChangeText={val => this.validateUserInput("password", val)}
            value={this.state.controls.password.value}
            touched={this.state.controls.password.touched}
            secureTextEntry={true}
            placeholder='Password'
          >

          </TextInput>

          <TouchableOpacity
            style={BaseStyle.horizontalView}
            onPress={this.onLogin}
            disabled={
              !this.state.controls.email.valid ||
              !this.state.controls.password.valid
            }
          >
            <Text style={BaseStyle.buttonStyle}>Login</Text>
          </TouchableOpacity>
        </SafeAreaView>

      // </KeyboardAvoidingView>
    );
  }
  onLogin = () => {
   
    this.setState({isProgress: true})
    //Note:- Provide valid URL
    fetch('http://35.160.197.175:3006/api/v1/user/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': this.state.controls.email.value,
                'password': this.state.controls.password.value
            })
        }).then((response) => {
          this.setState({isProgress: false})
            if (response != undefined && response.status == 200) {
                return response.json()
            } else {
                Alert.alert('FoodApp', 'User not found', [
                  {
                      text: 'Ok',
                      style: 'cancel'
                  },
                  ])
              }

        }).then((responseJSON) => {
            if (responseJSON != undefined) {
            const {token} = responseJSON
            this.saveAccessToken(token);
            constants.isLoggedIn = true;
            this.props.navigation.navigate('Home');
            }
        }).catch((error) => {
            console.log(error);
            this.setState({isLoading: false})
        })
}


  saveAccessToken = async token => {
    try {

      await AsyncStorage.setItem('accesstoken', token);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };
  validateUserInput = (key, val) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    this.setState(prevState => {

      return {
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value: val,
            valid: validationInput(
              val,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});