import React, { Component } from "react";
import { Text, TextInput, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native';
import BaseStyle from '../../common/BaseStyle'
import validationInput from '../../utils/validation'
import ApiManager from '../../service/ApiManager';
import constants from "../../config/constants";
import AsyncStorage from '@react-native-community/async-storage'
import LoadingComponent from "../../common/LoadingComponent";

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
          onSubmitEditing={() => this.Password.focus()}
          returnKeyType={'next'}
          touched={this.state.controls.email.touched}
          autoCorrect={false}
          placeholder='Email'
          keyboardType='email-address'
        ></TextInput>
        <TextInput style={BaseStyle.input}
          onChangeText={val => this.validateUserInput("password", val)}
          value={this.state.controls.password.value}
          touched={this.state.controls.password.touched}
          ref={ref => this.Password = ref}
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
                ? {...BaseStyle.buttonDisableStyle }
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
        const { error } = response
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
        this.saveUserProfile(responseJSON)
        this.saveAccessToken(token);
        constants.isLoggedIn = true;
        this.props.navigation.navigate('Main')
            }
    });
  }
  saveAccessToken = async token => {
    try {

      AsyncStorage.setItem('accesstoken', token);
    } catch (error) {
      console.log(error.message);
    }
  };
  saveUserProfile = async user => {
    try {
      AsyncStorage.setItem('user',JSON.stringify(user) );
    } catch (error) {
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

