import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from '../FoodApp/components/LoginComponent';
import Home from '../FoodApp/components/HomeComponent';
import Splash from '../FoodApp/components/SplashComponent';

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

const RootStack = createStackNavigator(
  {
    Splash:{
      screen : Splash
    },

    Auth: {
      screen: AuthStack,
    },
    Main: {
      screen: HomeStack
    },
    

  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'Splash' 
  }
)
const AppNavigator = createAppContainer(RootStack);
export default AppNavigator;
