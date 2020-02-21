import React from 'react';

import {
  View,
  Text,
  Image,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../../common/BaseStyle';

const saveArticle = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    getAllData();

  } catch (e) {
    console.log(e);
  }
};

const getAllData = () => {
  AsyncStorage.getAllKeys().then((keys) => {
    return AsyncStorage.multiGet(keys)
      .then((result) => {
        console.log(result);
        console.log(e);
      });
  });
}

const ReceipeItem = ({ Item }) => {
  const { name, preparationTime,firstName,lastName, photo } = Item;

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Image style={{ width: 100, height: 100, alignItems: 'flex-start', flex: 0.3, resizeMode: 'cover' ,margin:5}} source={photo ? { uri: photo } : require('../../assets/ic_default.png')} />
      <View style={{ flex: 0.5, flexDirection: 'column',justifyContent:'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.inputDataBold}>
            Recipe : 
          </Text>
          <Text style={styles.inputDataNormal}>
            {name}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.inputDataBold}>
            Recipe by :
          </Text>
          <Text style={styles.inputDataNormal}>
            {firstName+" "+lastName}
          </Text>
        </View>
      </View>
    </View>
  )
}
export default ReceipeItem;