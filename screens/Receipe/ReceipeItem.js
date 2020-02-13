import React from 'react';

import {
    View,
    Text,
    Image,
    Linking,
  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import bookmarkIcon from '../assets/ic_splash_app.png';
import readIcon from '../assets/ic_splash_app.png';
import styles from '../../utils/BaseStyle';

const saveArticle = async (key, value) =>{
    try {
      await AsyncStorage.setItem(key, value);
      getAllData();

    } catch (e) {
      console.log(e);
    }
  };

  const getAllData = () =>{
    AsyncStorage.getAllKeys().then((keys) => {
      return AsyncStorage.multiGet(keys)
        .then((result) => {
          console.log(result);
        }).catch((e) =>{
          console.log(e);
        });
    });
  }
  const openURL = (url) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  }
  const ReceipeItem = ({Item}) => {
    const { name, preparationTime, photo } = Item;

    return (
      <View style = { styles.container }>
        <Image style={ styles.image } source={{ uri: photo }} />
        <Text style= { styles.input }>
          { name }
        </Text>
        <Text style = { styles.input }>
          { preparationTime }
        </Text>
{/* 
        <View style = { styles.articleBtns}>
               </View> */}
      </View>
    )
  }
  export default ReceipeItem;