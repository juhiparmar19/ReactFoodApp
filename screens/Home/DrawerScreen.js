import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {ScrollView, Text, View} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import styles from '../../common/BaseStyle';
import AsyncStorage from '@react-native-community/async-storage';
import {reset} from '../../redux/actions/Useractions'
import { connect } from "react-redux";

class DrawerScreen extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
     this.props.navigation.dispatch(navigateAction);
     this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  render () {
    return (
      <View>
        <ScrollView>
          <View>
            <View style={styles.menuItem}>
              <Text style={{fontSize: 15, color :'#7183c7'}} onPress={this.navigateToScreen('Home')}>
                Home
              </Text>
            </View>
            <View style={styles.menuItem}>
              <Text style={{fontSize: 15, color :'#7183c7'}} onPress={this.navigateToScreen('Profile')}>
               Profile
              </Text>
            </View>
            <View style={styles.menuItem}>
              <Text style={{fontSize: 15, color :'#7183c7',fontWeight:'600'}}  onPress={this.onLogout}>
              LogOut
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
  onLogout =()=>{
    AsyncStorage.setItem('accessToken','');
    AsyncStorage.setItem('user','');
    this.props.logout()

    this.props.navigation.navigate('Auth');

  }
}

DrawerScreen.propTypes = {
  navigation: PropTypes.object
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout() {
      dispatch(reset())
    }
  }
}

export default connect(null, mapDispatchToProps)(DrawerScreen)
