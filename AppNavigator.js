import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import Login from '../FoodApp/components/LoginComponent';
import Home from '../FoodApp/components/HomeComponent';
import Auth from '../FoodApp/components/AuthComponent';

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login
    },
  },
  { initialRouteName: 'Login' }
)

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home
    },
  },
  { initialRouteName: 'Home' }

)

// const RootStack = createStackNavigator(
//   {
      
//     Main: {
//       screen: HomeStack
//     },

//   },
//   {
//     mode: 'modal',
//     headerMode: 'none',
//     initialRouteName:'Main'
//   }
// )

const SwitchNavigator = createSwitchNavigator(
  {
    AuthDecider :Auth,
    Auth: AuthStack,
    Main: HomeStack
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'AuthDecider'
  }
)

const AppNavigator = createAppContainer(SwitchNavigator);
export default AppNavigator;
