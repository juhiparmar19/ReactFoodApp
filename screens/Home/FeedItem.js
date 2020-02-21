import React from 'react';

import {
    View,
    Text,
    Image,
    ImageBackground,
} from 'react-native';
import styles from '../../common/BaseStyle';

const likeRecipe= async ()=>{
    this.setState({ isProgress: true })
    await ApiManager.login(this.state.controls.email.value.trim(), this.state.controls.password.value.trim()).then((response) => {
      this.setState({ isProgress: false })
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
        const { token } = responseJSON
        this.saveAccessToken(token);
        constants.isLoggedIn = true;
        this.props.navigation.navigate('Main')
            }
    });
}


const ReceipeItem = ({ Item }) => {
    const { name, inCookingList, photo } = Item;
    return (
        <View style={styles.verticalView}>
            <ImageBackground style={styles.imagebgcontainer}
                source={photo ? { uri: photo } : require('../../assets/ic_default.png')}  >
                <View style={styles.horizontalBottom} >
                    <Text style={styles.inputContainer}>{name}</Text>
                        <Image
                            style={{width:30,height:30,margin:10,tintColor:inCookingList == 1 ? 'red' : 'white'}}
                            source={inCookingList == 1 ? require('../../assets/ic_like.png'):require('../../assets/ic_unlike.png') }
                        />
                </View>
            </ImageBackground>

        </View>
    )
}

export default ReceipeItem;