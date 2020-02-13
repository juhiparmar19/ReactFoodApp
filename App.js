/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, Component } from 'react';
import {
  StatusBar,
  Platform,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import AppNavigator from '../FoodApp/AppNavigator'
import AuthNavigator from '../FoodApp/AuthNavigator'
import AsyncStorage from '@react-native-community/async-storage';

const App: () => React$Node = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
        <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
        <AppNavigator />
  
    </>
  );
};


export default App;
