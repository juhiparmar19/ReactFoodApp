import React, { Component } from "react";
import { StyleSheet, View, Text, AsyncStorage, alert } from 'react-native';
import ApiManager from '../ApiService/ApiManager'

export default class HomeComponent extends Component {
  constructor(props) {
    super(props)
    this.props.navigation.pop('Login');
    this.state = {
      loading: true,
      recipeList: []

    }
  }

  componentDidMount() {
    this.state.recipeList = async () => {
      await AsyncStorage.getItem('accesstoken').then((token) => {
        ApiManager.getCookingList(token).then((res) => {
          if (res.status == 200) {
            this.setState({ loading: false })
            return res
          } else {
            alert("error:  " + res.error);
          }
        })
      })
    }
  }


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