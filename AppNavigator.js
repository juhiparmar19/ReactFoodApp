import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import LoginComponent from './screens/Login/LoginComponent';
import HomeComponent from './screens/Home/HomeComponent';
import AuthComponent from './screens/Navigator/AuthComponent';
import AddReceipeComponent from './screens/Receipe/AddReceipeComponent';
import ReceipeListComponent from './screens/Receipe/ReceipeListComponent';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import DrawerScreen from './screens/Home/DrawerScreen';
import {createDrawerNavigator,DrawerActions} from 'react-navigation-drawer'
import {TouchableOpacity,Image} from 'react-native';

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: LoginComponent
    },
  },
  { initialRouteName: 'Login' }
)
const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeComponent
    },
  },
  { 
    defaultNavigationOptions: {
      headerShown: false
    },
    initialRouteName: 'Home' }
)

const MainApp = createMaterialBottomTabNavigator(
  {
    Receipe: {screen: ReceipeListComponent},
    Home:{screen :HomeStack}  ,
    AddReceipe:{screen :AddReceipeComponent} ,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Home') {
          return (
            <Image
              source={ require('./assets/ic_home.png') }
              style={{ width: 20, height: 20, }} />
          );
        } 
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FF6F00',
      inactiveTintColor: '#263238',
    },
    initialRouteName:'Home'  
  }
);

const DrawerNavigator = createDrawerNavigator({
  Home:{
      screen: MainApp
  }
},{
  
  title:'Home',
  contentComponent: DrawerScreen,
  DrawerActions:'closed',
  drawerPosition:'right',
  drawerLockMode: 'locked-closed',
  drawerWidth: 300
});
const MenuImage = ({navigation}) => {
  if(!navigation.state.isDrawerOpen){
      return <Image style={{marginRight:10}} source={require('./assets/menu-button.png')}/>
  }else{
      return <Image style={{marginRight:10}} source={require('./assets/left-arrow.png')}/>
  }
}
const HomeStackNavigator = createStackNavigator({

  //important: key and screen name (i.e. DrawerNavigator) should be same while using the drawer navigator inside stack navigator.
  DrawerNavigator:{
      screen: DrawerNavigator
  }
}
,{
  defaultNavigationOptions: ({ navigation }) => ({
      title: 'Feeds',  // Title to appear in status bar
      headerRight: (
      <TouchableOpacity onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
          <MenuImage style="styles.bar" navigation={navigation}/>
      </TouchableOpacity>),
      headerStyle: {
          backgroundColor: '#d3d3d3',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
  })
}
);
const SwitchNavigator = createSwitchNavigator(
  {
    AuthDecider :AuthComponent,
    Auth: AuthStack,
    Main: HomeStackNavigator,
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'AuthDecider'
  }
)
const AppNavigator = createAppContainer(SwitchNavigator);
export default AppNavigator;
