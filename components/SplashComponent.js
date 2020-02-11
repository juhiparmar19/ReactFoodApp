import React, { Component } from "react";
import { Platform, StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import BaseStyle from '../utils/BaseStyle'

export default class SplashComponent extends Component{
  constructor(){
    super();
    this.state={
      isVisible : true,
    }
  }

  Hide_Splash_Screen=()=>{

    this.setState({ 
      isVisible : false 

    });
    const token  = AsyncStorage.getItem('accesstoken');
    if(token == ""){
        this.props.navigation.navigate('Home')
    }else{
        this.props.navigation.navigate('Login')
    }
  }

  componentDidMount(){

    var that = this;

    setTimeout(function(){
        that.Hide_Splash_Screen();

    }, 3000);



  }

    render()
    {
        return(

            <View style={BaseStyle.container}>

              {/* //  <View style={styles.SplashScreen_RootView}> */}
                    {/* Put all your components Image and Text here inside Child view which you want to show in Splash Screen. */}
                    <Image source={require('../assets/ic_splash_app.png')}
                    style={styles.SplashScreen_ChildView} />
               {/* // </View> */}
                <TouchableOpacity 
                  activeOpacity = { 0.5 }
                  style={styles.TouchableOpacity_Style}
                  onPress={this.Hide_Splash_Screen} >
                </TouchableOpacity>
            </View> );

        // return(

        //     <View style = { styles.MainContainer }>

        //         <Text style={{textAlign: 'center'}}> Hello Guys </Text>

        //         {
        //           (this.state.isVisible === true) ? Splash_Screen : null
        //         }


        //     </View>

        // );
    }
}

const styles = StyleSheet.create(
{
    MainContainer:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },

    SplashScreen_RootView:
    {
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        margin : 20,
        position: 'absolute',
      

    },

    SplashScreen_ChildView:
    {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        margin: 20,
        position:'absolute'
      
    },

    TouchableOpacity_Style:{

        width:25, 
        height: 25, 
        top:9, 
        right:9, 
        position: 'absolute'

    }
});