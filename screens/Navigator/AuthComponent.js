import React, { Component } from "react";
import AsyncStorage from '@react-native-community/async-storage'
import {saveUserData} from '../../redux/actions/Useractions'
import { connect } from "react-redux";

 class AuthComponent extends Component{
  constructor(props){
    super(props);
    AsyncStorage.getItem('user').then(user =>{
      this.props.saveUser(user)
        });
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
const mapDispatchToProps = (dispatch) => {
  return {
    saveUser: (user) => {
      dispatch(saveUserData(user))
    }
  }
}

export default connect(null, mapDispatchToProps)(AuthComponent)


