import Home from '../components/HomeComponent'
import Login from '../components/LoginComponent'
import Splash from '../components/SplashComponent'
import strings from '../config/string'
import { Navigation } from 'react-native-navigation';

function registerScreens() {
    Navigation.registerComponent(strings.screen_splash, () => Splash)
    Navigation.registerComponent(strings.screen_home, () => Home)
    Navigation.registerComponent(strings.screen_login, () => Login)
}
module.exports = {
    registerScreens
};
