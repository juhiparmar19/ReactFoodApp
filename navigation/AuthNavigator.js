import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from '../components/LoginComponent';


const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login
    },
  },
  { initialRouteName: 'Login' }
)


const AuthNavigator = createAppContainer(AuthStack);
export default AuthNavigator;
