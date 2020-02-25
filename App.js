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
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

const App: () => React$Node = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <Provider store={configureStore}>
        <AppNavigator />
      </Provider>

    </>
  );
};


export default App;
