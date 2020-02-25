import React, { Component } from "react";
import { StyleSheet, Alert,  SafeAreaView, FlatList } from 'react-native';
import ApiManager from '../../service/ApiManager';
import AsyncStorage from '@react-native-community/async-storage';
import LoadingComponent from "../../common/LoadingComponent";
import ReceipeItem from '../Receipe/ReceipeItem';
import NoDataComponent from '../../common/NoDataComponent';
import FlatListItemSeparator from '../FlatData/FlatListItemSeparator';

export default class ReceipeListComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            receipeList: [],
            title: 'Data',
            isFetching: false,

        }
        this.viewabilityConfig = {
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 95
          }
        this.getReceipeListData();
    }
    onRefresh() {
        this.setState({ isFetching: true }, function() { this.getReceipeListData() });
     }
    getReceipeListData() {
        AsyncStorage.getItem('accesstoken').then((token) => {
            ApiManager.getCookingList(token).then((res) => {
                return res.json();
            }).then((responseJson) => {
                const { error } = responseJson
                console.log("data" ,responseJson)
                if (error != undefined) {
                    Alert.alert('FoodApp', "data", [
                        {
                            text: 'Ok',
                            style: 'cancel'
                        },
                    ])
                } else {
                    if (responseJson != undefined) {
                        this.setState({ receipeList: responseJson })
                    }
                }
                this.setState({ loading: false })
                this.setState({ isFetching: false })

            });
        })
    }
   
    render() {
        if (this.state.loading) {
          return <LoadingComponent isLoading={this.state.loading} />
        }
        else {
          <LoadingComponent isLoading={this.state.loading} />
          if (this.state.receipeList.length > 0) {
            return (
              <SafeAreaView style={{flexDirection:'column'}}>
                <FlatList
                  data={this.state.receipeList}
                  extraData={this.state}
                  onRefresh={() => this.onRefresh()}
                  refreshing={this.state.isFetching}
                  initialNumToRender={10}
                  removeClippedSubviews={true}
                  viewabilityConfig={this.viewabilityConfig}
                  ItemSeparatorComponent={FlatListItemSeparator}
                  keyExtractor={(item, recipeId) => recipeId.toString()}
                  renderItem={({ item }) => <ReceipeItem Item={item} />}
                />
              </SafeAreaView>
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
        marginTop: 10,
        marginHorizontal: 16,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
    },
    header: {
        fontSize: 32,
    },
    title: {
        fontSize: 24,
    },
});
