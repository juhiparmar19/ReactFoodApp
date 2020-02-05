import {
    AppRegistry,
    Button,
    Text,
    View
  } from 'react-native'
  import {
    StackNavigator,
    TabNavigator
  } from 'react-navigation'
  import {Login} from '../FoodApp/components/LoginComponent'
  import {Home} from '../FoodApp/components/HomeComponent'
  import {Splash} from '../FoodApp/components/SplashComponent'

const AuthStack = StackNavigator(
    {
      Splash: {
        screen: Splash
      },
      Login: {
        screen: Login
      },
     
    }
  )
  
//   const ModalStack = DismissableStackNavigator(
//     {
//       ModalStackScreen: {
//         screen: ModalStackScreen
//       }
//     },
//     {
//       headerMode: 'none'
//     }
//   )
  
  const RootStack = StackNavigator(
    {
      Main: {
        screen: AuthStack,
      }
    //   ModalScreen: {
    //     screen: ModalScreen,
    //   },
    //   ModalStack: {
    //     screen: ModalStack
    //   }
    },
    {
      mode: 'modal',
      headerMode: 'none'
    }
  )

  class App extends React.Component {
    render () {
      return <RootStack />
    }
  }
  
  AppRegistry.registerComponent('FoodApp', () => App)