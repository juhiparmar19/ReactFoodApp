import React, { Component } from "react";
import { StyleSheet, View, Text, Alert, FlatList, SectionList, SafeAreaView } from 'react-native';
import ApiManager from '../../service/ApiManager';
import AsyncStorage from '@react-native-community/async-storage';
import FlatListHeader from '../FlatData/FlatListHeader';
import FeedItem from './FeedItem';
import NoDataComponent from '../../common/NoDataComponent';
import LoadingComponent from "../../common/LoadingComponent";

export default class HomeComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      feedList: []
    }
    this.getListData();
  }
  componentDidMount () {
    this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
     // this.getListData();
     
    });
}
componentWillUnmount(){
    this._onFocusListener.remove()
}
  getListData() {
    AsyncStorage.getItem('accesstoken').then((token) => {
      ApiManager.getFeedList(token).then((res) => {
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
            this.setState({ feedList: responseJson })
            this.setState({ feedList: this.getSectionData() })
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
      if (this.state.feedList.length > 0) {
        return <SafeAreaView >
          
          <SectionList
            sections={this.state.feedList}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <FeedItem Item={item} />}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.item}>
                <Text style={styles.title}>{title}</Text>
              </View>)}
          />
        </SafeAreaView>
      }else{
        return (
          <NoDataComponent msg="No Feed added" />
        );
      }
    }

  }
  getSectionData = () => {
    const SECTIONS = []
    const cookingData = [];
    const foodData = [];
    for (const item in this.state.feedList) {
      if (this.state.feedList[item].inCookingList === 1) {
        cookingData.push(this.state.feedList[item])
      } else {
        foodData.push(this.state.feedList[item])
      }
    }
    SECTIONS.push({
      title: "Favourite Recipe",
      data: cookingData

    })
    SECTIONS.push({
      title: "New Recipe",
      data: foodData
    })
    return SECTIONS;
  }

}
function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#7183c7',
    padding: 10,
    alignItems:'center',
    marginVertical: 8,
  },
  header: {
    fontSize: 20,
  },
  title: {
    fontSize: 24,
    color:'#fff',
    fontWeight:'bold',
  },
});
