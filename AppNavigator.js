import {
    AppRegistry,
    Button,
    Text,
    View
  } from 'react-native'
  import {
    createStackNavigator,
  } from 'react-navigation-stack';
  import {createAppContainer} from 'react-navigation';
  import React, { Component } from "react";

  import Login from '../FoodApp/components/LoginComponent';
  import Home from '../FoodApp/components/HomeComponent';

const AuthStack = createStackNavigator(
    {
       Login: {
        screen: Login
      },  
    },
   { initialRouteName:'Login'}
  )


  const HomeStack = createStackNavigator(
    {
      Home:{
        screen:Home
      }
    }
  )
  
  const RootStack = createStackNavigator(
    {
      Auth: {
        screen: AuthStack,
      },
      Main:{
        screen:HomeStack
      }
      
      

    },
    {
      mode: 'modal',
      headerMode: 'none'
    }
  )
  const AppNavigator = createAppContainer(RootStack);
  export default AppNavigator;
  