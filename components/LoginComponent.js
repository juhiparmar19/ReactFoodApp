import React, { Component } from "react";
import { StyleSheet, Text, TextInput,SafeAreaView,Image } from 'react-native';
import Constants from '../config/constants'
import BaseStyle from '../utils/BaseStyle'
import validationInput from '../utils/validation'
import { TouchableOpacity } from "react-native-gesture-handler";

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
            value: "",
            valid: false,
            validationRules: {
              isEmail: true
            },
            touched: false
          },
          password: {
            value: "",
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
      <SafeAreaView style={BaseStyle.container}>

<Image
          style={BaseStyle.image}
          source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
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
        onPress={this.onLoginPress}
        disabled={
          !this.state.controls.email.valid ||
          !this.state.controls.password.valid
        }
        >
<Text style={BaseStyle.buttonStyle}>Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  onLoginPress = async () => {

  //  this.openProgressbar(true);
    await ApiManager.login(this.state.controls.email.value.trim(), this.state.controls.password.value.trim()).then((response) => {
      status = response.status.toString();
     // this.openProgressbar(false);
      if (status === "200") {
        this.setState(
          {
            profile: response.user
          },
          // In this block you can do something with new state.
          function () {
            // this.saveAccessToken(response.access_token)
            // this.startDrawerScreen();
          })
      } else {
        alert("error:  " + response.error);
      }

    })
    
  }
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