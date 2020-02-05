import React, { Component } from "react";
import{StyleSheet,View,Text} from 'react-native';

export default class HomeComponent extends Component{
    render() {
        return (
          <View style={styles.container}>
            <Text>We have sooooo many friends!</Text>
          </View>
        );
      }
}
const styles = StyleSheet.create({
        
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
});