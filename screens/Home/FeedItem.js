import React, { Component } from 'react';
import { DrawerActions } from 'react-navigation-drawer';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableNativeFeedbackBase,
} from 'react-native';
import styles from '../../common/BaseStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { connect } from "react-redux";

class FeedItem extends Component {
  constructor(props) {
    super(props)
    const { Item, Navigation } = props
    this.state = {
      feedItem: Item,
    }

  }

  render() {
    return this.FeedData(this.state.feedItem)
  }

  FeedData = (Item) => {
    const { name, inCookingList, photo, recipeId } = Item;
    return (
      <SkeletonContent
    containerStyle={{flex: 1, width: 300}}
    isLoading={false}
    layout={[
    { key:"someId", width: 220, height: 20, marginBottom: 6 },
    { key: "someOtherId", width: 180, height: 20, marginBottom: 6 },
    ]}
    >

      <TouchableOpacity style={styles.maincontainer}>

        <View style={styles.verticalView}>
          <TouchableOpacity
          style={{flexDirection:"row"}}
            onPress={() => {
              this.props.Navigation.navigation.push('RecipeDetail', { recipeId: recipeId })
              this.props.Navigation.navigation.dispatch(DrawerActions.closeDrawer())
            }} >
            <ImageBackground style={{
              alignItems: 'center',
              justifyContent: 'center', width :"100%",height: 200
            }}
              source={photo ? { uri: photo } : require('../../assets/ic_default.png')}  >
            </ImageBackground>

          </TouchableOpacity>
          <View style={styles.horizontalBottom} >
            <Text style={styles.inputContainer}>{name}</Text>
            <TouchableOpacity onPress={() => {
              console.log("inCookingList", inCookingList)
              this.props.updateState(Item);
            }}>
              <Image
                style={{ width: 30, height: 30, margin: 10, tintColor: inCookingList == 1 ? 'red' : 'black' }}
                source={inCookingList == 1 ? require('../../assets/ic_like.png') : require('../../assets/ic_unlike.png')}
              />
            </TouchableOpacity>
          </View>

        </View>
      </TouchableOpacity>
      </SkeletonContent>
    )
  }
};
const mapStateToProps = (state) => {
  return { isLoading: state.rootReducer.isLoading}
}



export default connect(mapStateToProps)(FeedItem)
