import React, { Component } from "react";
import { StyleSheet, View, Text, Alert, FlatList, TouchableOpacity, Image } from 'react-native';
import ApiManager from '../../service/ApiManager';
import AsyncStorage from '@react-native-community/async-storage';
import FlatListItemSeparator from '../FlatData/FlatListItemSeparator';
import FlatListHeader from '../FlatData/FlatListHeader';
import ReceipeItem from '../Receipe/ReceipeItem';
import NoDataComponent from '../../common/NoDataComponent';
import LoadingComponent from "../../common/LoadingComponent";

export default class HomeComponent extends Component {
 
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      recipeList: []
    }
    this.getListData();
  }
   getListData() {
    AsyncStorage.getItem('accesstoken').then((token) => {
      ApiManager.getCookingList(token).then((res) => {
        return res.json();
        }).then((responseJson) => {
             const { error } = responseJson
              if (error != undefined) {
                Alert.alert('FoodApp', "data", [
                 {
                   text: 'Ok',
                   style: 'cancel'
                 },
                ])
              } else {
                if (responseJson != undefined) {
                this.setState({ recipeList: responseJson })
                }
              }
        this.setState({ loading: false })
      });
    })
  }
  render() {
    if (this.state.loading) {
      return <LoadingComponent isLoading={this.state.loading} />
    }
    else {
      <LoadingComponent isLoading={this.state.loading} />
      if (this.state.recipeList.length > 0) {
        return (
          <View>
            <FlatList
              data={this.state.recipeList}
              ItemSeparatorComponent={FlatListItemSeparator}
              keyExtractor={(item, recipeId) => recipeId.toString()}
              renderItem={({ item }) => <ReceipeItem Item={item} />}
            />
          </View>
        )
      } else {
        return (
          <NoDataComponent msg="No Receipes found" />
        );
      }
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});