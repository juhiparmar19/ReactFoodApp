import React, { Component } from "react";
import { Text, TextInput, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native';
import BaseStyle from '../../common/BaseStyle'
import validationInput from '../../utils/validation'
import ApiManager from '../../service/ApiManager';
import constants from "../../config/constants";
import AsyncStorage from '@react-native-community/async-storage'
import LoadingComponent from "../../common/LoadingComponent";
import { StackActions, NavigationActions } from 'react-navigation'
import AppNavigator from '../../AppNavigator'

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      profile: "",
      token :"",
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
    AsyncStorage.getItem('accesstoken').then(accesstoken => {
      if (accesstoken != null && accesstoken != "") {
        this.setState({token:accesstoken})
       // this.props.navigation.navigate('Main')
      }
    });


  }
  render() {
    if(this.state.accesstoken=="" || this.state.accesstoken == null)
      {
    return (

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
          placeholder='Password' ></TextInput>
        <TouchableOpacity
          style={BaseStyle.horizontalView}
          activeOpacity={0.5}
          onPress={this.onLogin}
          disabled={
            !this.state.controls.email.valid ||
            !this.state.controls.password.valid
          } >
          <Text
            style={
              (!this.state.controls.email.valid || !this.state.controls.password.valid)
                ? { ...BaseStyle.buttonStyle, ...BaseStyle.buttonDisableStyle }
                : BaseStyle.buttonStyle
            }
          >Login</Text>
        </TouchableOpacity>
      </SafeAreaView>

    );
  }
  else{
    return null
  }
  }
  onLogin = async () => {
    this.setState({ isProgress: true })
    await ApiManager.login(this.state.controls.email.value.trim(), this.state.controls.password.value.trim()).then((response) => {
      this.setState({ isProgress: false })
      if (response != undefined && response.status == 200) {
        return response.json()
      }
      else {
        const { error } = responseJSON
        Alert.alert('FoodApp', error, [
          {
            text: 'Ok',
            style: 'cancel'
          },
        ])
      }
    }).then((responseJSON) => {
      if (responseJSON != undefined) {
        const { token } = responseJSON
        this.saveAccessToken(token);
        constants.isLoggedIn = true;
        <AppNavigator/>
       // this.props.navigation.navigate('Main')

        // const resetAction = StackActions.reset({
        //   index: 0,
        //   actions: [
        //     NavigationActions.navigate({ routeName: 'Main' })
        //   ]
        // })
        // this.props.navigation.dispatch(resetAction)
      }
    });
  }
  saveAccessToken = async token => {
    try {

      AsyncStorage.setItem('accesstoken', token);
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

