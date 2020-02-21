import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginComponent from './screens/Login/LoginComponent';
import HomeComponent from './screens/Home/HomeComponent';
import AuthComponent from './screens/Navigator/AuthComponent';
import AddReceipeComponent from './screens/Receipe/AddReceipeComponent';
import ReceipeListComponent from './screens/Receipe/ReceipeListComponent';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import DrawerScreen from './screens/Home/DrawerScreen';
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer'
import { TouchableOpacity, Image } from 'react-native';

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
    headerMode:'none',
    initialRouteName: 'Home'
  }
)
const MainApp = createMaterialBottomTabNavigator(
  {
    Recipes: { screen: ReceipeListComponent},
    Home: { screen: HomeStack },
     AddRecipe: { screen: AddReceipeComponent 
      //, navigationOptions:{
    //   title:'Add Recipe',
    //   tabBarLabel:'Add Recipe',
    
    // //  keyboardHidesNavigationBar:true
    // }
  },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
          
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case 'Home':
            return (
              <Image
                source={require('./assets/ic_home.png')}
                style={{ width: 25, height: 25,alignItems:'center',tintColor:tintColor }} />
            );
          case 'Recipes':
            return (
              <Image
                source={require('./assets/ic_recipe.png')}
                style={{ width: 30, height: 30,alignItems:'center', tintColor:tintColor }} />
            );
          case 'AddRecipe':
            return (
              <Image
                source={require('./assets/ic_add_recipe.png')}
                style={{ width: 30, height: 30,alignItems:'center',tintColor:tintColor  }} />
            );
          default:
            break;
        }
      }
      

    }),

    initialRouteName: 'Home',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
   // keyboardHidesNavigationBar:true,
    tabBarOptions: {
      activeColor: '#f0edf6',
      inactiveColor: '#3e2465',
      labelStyle: {
        fontSize: 15,
        margin: 0,
        padding: 0,
      },
    },
    barStyle: { backgroundColor: '#7183c7' },
  }
);

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: MainApp
  }
}, {

  keyboardHidesNavigationBar:true,
  contentComponent: DrawerScreen,
  drawerPosition: 'right',
  drawerWidth: 300
});
const MenuImage = ({ navigation }) => {
  if (!navigation.state.isDrawerOpen) {
    return <Image style={{ marginRight: 5, width: 27, height: 20, alignItems: 'center' }} source={require('./assets/ic_drawer.png')} />
  } else {
    return <Image style={{ marginRight: 5, width: 27, height: 20, alignItems: 'center' }} source={require('./assets/ic_back_arrow.png')} />
  }
}
const HomeStackNavigator = createStackNavigator({

  //important: key and screen name (i.e. DrawerNavigator) should be same while using the drawer navigator inside stack navigator.
  DrawerNavigator: {
    screen: DrawerNavigator
  }}, {
  defaultNavigationOptions: ({ navigation }) => ({   
    headerRight: () =>
      <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
        <MenuImage style="styles.bar" navigation={navigation} />
      </TouchableOpacity>,
    headerRightContainerStyle: {
      backgroundColor: '#fff',
    },
    headerMode:'float',
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20
    },
    safeAreaInsets: { top:0 /* statusbar height */ },

  })
}
);
const SwitchNavigator = createSwitchNavigator(
  {
    AuthDecider: AuthComponent,
    Auth: AuthStack,
    Main: HomeStackNavigator,
  },
  {
    mode: 'modal',
    initialRouteName: 'AuthDecider'
  }
)
const getCurrentRoute=(Object,index)=>{
  const {routes} = Object
  const {routeName} =routes[index]
  return routeName
}

DrawerNavigator.navigationOptions = ({ navigation }) => {
  let headerTitle = "";
  const {routes} = navigation.state
  const {index} = routes[ navigation.state.index]
  const [Object] = routes
  headerTitle = getCurrentRoute(Object,index)
  if(headerTitle ==='AddRecipe'){
    headerTitle = 'Add Recipe'
  }
  return {
      headerTitle,
  }
}

const AppNavigator = createAppContainer(SwitchNavigator);
export default AppNavigator;
