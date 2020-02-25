import React, { PureComponent } from "react";
import { StyleSheet, View, Text, Alert, FlatList, SectionList, SafeAreaView } from 'react-native';
import ApiManager from '../../service/ApiManager';
import AsyncStorage from '@react-native-community/async-storage';
import FeedItem from './FeedItem';
import NoDataComponent from '../../common/NoDataComponent';
import LoadingComponent from "../../common/LoadingComponent";
import {saveFeed} from '../../redux/actions/FeedActions'
import { connect } from "react-redux";

class HomeComponent extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      feedList: []
    }
    this.viewabilityConfig = {
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 95
    }
    this.getListData();
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

            this.props.saveFeedData(this.state.feedList)

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
      <LoadingComponent isLoading={this.state.loading} ></LoadingComponent>
      if (this.props.feedData.length > 0) {
        return <SafeAreaView style={{ flexDirection: 'column'}}>
          <SectionList
            sections={this.props.feedData}
            extraData={this.props.feedData}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <FeedItem Item={item} Navigation={this.props} updateState ={this.updateState}/>}
            extraData={this.state}
            removeClippedSubviews={true}
            viewabilityConfig={this.viewabilityConfig}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.item}>
                <Text style={styles.title}>{title}</Text>
              </View>)}
          />
        </SafeAreaView>
      } else {
        return (
          <NoDataComponent msg="No Feed added" />
        );
      }
    }
  }
  updateState = (recipeItem) => {
   const {inCookingList,recipeId} = recipeItem
   AsyncStorage.getItem('accesstoken').then((token) => {
    this.setState({ loading: true })
    if(inCookingList === 1){
      this.dislikeRecipe(recipeId,token)
    }else{
      this.likeRecipe(recipeId,token)
    }
   })
}

likeRecipe = (recipeId,token) => {

    ApiManager.likeRecipe(recipeId, token).then((response) => {
      this.setState({ loading: false })
      if (response != undefined && response.status == 200) {
        return response.json()
      }
      else {
        const { error } = responseJSON
        Alert.alert('FoodApp', error, [
          {
            text: 'Ok',
            style: 'cancel'
          },
        ])
      }
    }).then((responseJSON) => {
      if (responseJSON != undefined) {
        console.log("responsejson", responseJSON)
        this.getListData();


      }
    });

}
dislikeRecipe = (recipeId,token) => {
  ApiManager.dislikeRecipe(recipeId, token).then((response) => {
      this.setState({ loading: false })
      if (response != undefined && response.status == 200) {
        return response.json()
      }
      else {
        const { error } = responseJSON
        Alert.alert('FoodApp', error, [
          {
            text: 'Ok',
            style: 'cancel'
          },
        ])
      }
    }).then((responseJSON) => {
      if (responseJSON != undefined) {
        this.getListData();

      }
    });
  
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#7183c7',
    padding: 10,
    alignItems: 'center',
    marginVertical: 8,
  },
  header: {
    fontSize: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});
const mapStateToProps = (state) => {
  return { feedData: state.rootReducer.feedList}
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveFeedData: (feed) => {
      dispatch(saveFeed(feed))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
