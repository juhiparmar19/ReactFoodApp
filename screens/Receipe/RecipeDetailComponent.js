import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking, ScrollView } from 'react-native';
import LoadingComponent from "../../common/LoadingComponent";
import ApiManager from '../../service/ApiManager';
import AsyncStorage from '@react-native-community/async-storage';
import CardFlip from 'react-native-card-flip';
import BaseStyle from '../../common/BaseStyle'

export default class ReceipeDetailComponent extends Component {



  constructor(props) {
    super(props)
    const recipeId = this.props.navigation.state.params.recipeId
    console.log('recipeId', recipeId
    )

    this.state = {
      loading: false,
      feedDetail: ''
    }
    this.getRecipeDetailData(recipeId)
  }

  getRecipeDetailData(recipeId) {
    AsyncStorage.getItem('accesstoken').then((token) => {
      this.setState({ loading: true })
      ApiManager.getRecipeDetail(token, recipeId).then((res) => {
        return res.json();
      }).then((responseJson) => {
        console.log('responseJson', responseJson)
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
            this.setState({ feedDetail: responseJson })

            console.log('data', this.state.feedDetail)
          }
        }
        this.setState({ loading: false })
      });
    })
  }
  componentWillUnmount() {
    this.props.navigation.goBack(null);
  }
  render() {

    const { complexity, firstName, lastName, name, photo, instructions, ingredients, metaTags, serves, yturl, preparationTime, inCookingList } = this.state.feedDetail
    const ytUrl = 'https://www.youtube.com/watch?v=XvxiiVpUAb4'

    if (this.state.loading) {
      return <LoadingComponent isLoading={this.state.loading} />
    }
    else {
      return <View style={BaseStyle.container}>
        <CardFlip style={styles.cardContainer} ref={(card) => this.card = card} >
          <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} >
            <View style={styles.container} >
              <Image style={styles.imagebgcontainer}
                source={photo ? { uri: 'http://35.160.197.175:3006/uploads/2425b3c2-6365-4d2e-b55d-3213b11f8892.png' } : require('../../assets/ic_default.png')} />
              <Text style={styles.inputHeader}>{name}</Text>
              <Text style={styles.textData}>Recipe by {firstName + " " + lastName}</Text>
              <Text style={styles.textData}>Total PreparationTime : {preparationTime}</Text>
              <Text style={styles.textData}>Total Serve : {serves}</Text>

              <View style={BaseStyle.horizontalBottom} >
                <Text style={{ justifyContent: 'flex-start', flex: 1, margin: 10, fontWeight: 'bold' }} onPress={() => {
                  //on clicking we are going to open the URL using Linking
                  Linking.openURL('https://www.youtube.com/watch?v=XvxiiVpUAb4');
                }} >{ytUrl ? 'Watch on ' + ytUrl : ''}</Text>
                <Image
                  style={{ width: 30, height: 30, margin: 10, tintColor: this.state.feedDetail.inCookingList == 1 ? 'red' : 'white' }}
                  source={inCookingList == 1 ? require('../../assets/ic_like.png') : require('../../assets/ic_unlike.png')}
                />
              </View>
            </View></TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} >
            <ScrollView>
              <View style={styles.verticalView} >
                <Text style={styles.inputHeader}>Ingredients</Text>
                <View style={{ margin: 10 }}>
                  <Text style={styles.textData}>
                    ¾ cup cashews or 100 grams cashews
                    125 grams khoya - about ¾ cup crumbled khoya (mawa or dried evaporated milk solids)
                    1 tejpatta (indian bay leaf)
      2 cloves
      ½ inch cinnamon
      2 green cardamoms
      2 strands of mace (javitri) - optional
      ½ teaspoon shah jeera (caraway seeds) - optional
      ¼ teaspoon turmeric powder
      ½ teaspoon red chilli powder
      1 teaspoon coriander powder
      (ground coriander)
      ¼ to ½ teaspoon garam masala, add as required
        </Text>
                </View>

                <Text style={styles.inputHeader}>Instructions</Text>
                <View style={{ margin: 10 }}>
                  <Text style={styles.textData}>
                    Chop 1 medium onion, 1 inch ginger, 6 to 7 garlic and 1 or 2 green chilies. Keep aside.
      Take the chopped onion, ginger, garlic, green chilies in chutney jar or grinder jar. Add 3 tbsp curd/yogurt.
      Grind everything to a smooth paste without adding any water. Keep this ground paste aside.
              </Text>
                </View>
              </View>
            </ScrollView>
          </TouchableOpacity>
        </CardFlip></View>
    }
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  cardContainer: {
    width: '90%',
    height: '90%',
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e3e3e3',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    flex: 1,
    shadowOpacity: 0.5,
  },
  inputHeader: {
    color: '#000000',
    fontSize: 20,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  textData: {
    color: '#000000',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 18,
    fontWeight: 'normal'
  },
  imagebgcontainer: {
    width: '100%',
    height: 350,

  },
  verticalView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    margin: 5
  },
  horizontalBottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1
  }

});


