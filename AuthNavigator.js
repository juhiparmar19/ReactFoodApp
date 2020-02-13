import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './screens/Login/LoginComponent';
import Home from './screens/Home/HomeComponent';

import AppNavigator from '../FoodApp/AppNavigator';

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login
    }
  },
  { 
    mode: 'modal',
    headerMode: 'none',  
    initialRouteName: 'Login' }
)

const AuthNavigator = createAppContainer(AuthStack);
export default AuthNavigator;
