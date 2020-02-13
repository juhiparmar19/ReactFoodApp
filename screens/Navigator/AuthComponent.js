import React, { Component } from "react";
import { Platform, StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

export default class AuthComponent extends Component{
  constructor(props){
    super(props);
    AsyncStorage.getItem('accesstoken').then(token =>{
      if(token != "" && token != null && token !=undefined){
        this.props.navigation.navigate('Main')
      }else{
        this.props.navigation.navigate('Auth')
      }
    });
  }
  
  render(){
   return null 
  }
}