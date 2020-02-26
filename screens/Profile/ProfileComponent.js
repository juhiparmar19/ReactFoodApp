import React, { Component } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import colors from '../../config/colors'
import BaseStyle from '../../common/BaseStyle'
import ImagePicker from 'react-native-image-picker'
import Permissions from 'react-native-permissions'
import { saveProfileImage } from '../../redux/actions/Useractions'

class ProfileComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            latitude: 0.0,
            longitude: 0.0,
            coordinate: ([{
                latitude: 23.0258156,
                longitude: 72.5030821,
                title: 'Solution analysts pvt.Ltd'
            },
            {
                latitude: 23.0258156,
                longitude: 72.5030821,
                title: 'Solution analysts pvt.Ltd'
            }])
        }
        // this.checkCameraAndPhotos()
        this.getLocation()

    }
    getLocation() {
        if (this.requestLocationPermission()) {
            Geolocation.getCurrentPosition(
                (position) => {
                    const { coords } = position
                    this.setState({ latitude: coords.latitude })
                    this.setState({ longitude: coords.longitude })

                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }

    }

    requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            )
            return granted;
        } catch (err) {
            console.warn(err)
            return false;
        }
    }

    render() {
        const { firstName, lastName, email } = JSON.parse(this.props.user)
        return <View style={styles.MainContainer}>
            <View style={styles.imageMainStyle}>
                <TouchableOpacity style={styles.imageTouchStyle} onPress={() => this.launchPicker()} >
                    <Image source={this.props.uri ? { uri: this.props.uri } : require('../../assets/ic_default.png')} style={BaseStyle.roundedImage}>
                    </Image>
                </TouchableOpacity>

                <View style={styles.sunViewStyle}  >
                    <Text style={styles.cardView_InsideText}> {firstName + " " + lastName} </Text>
                    <Text style={styles.cardView_InsideText}> {email} </Text>
                </View>

            </View>

            <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.buttonBg, margin: 15 }}>Current Location </Text>
            <MapView style={styles.MapViewStyle}
                initialRegion={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.09,
                }} onRegionChange={this.onRegionChange}
                zoomEnabled={true}
                showsUserLocation={true}
                provider={PROVIDER_GOOGLE} >
                {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
                    coordinate={{ "latitude": this.state.latitude, "longitude": this.state.longitude }}
                    title="Solution analysts pvt.ltd"
                />}
            </MapView>
        </View>
    }
    componentWillUnmount() {
        this.props.navigation.goBack(null);
    }
    getInitialState() {
        return {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        };
    }
    // Check the status of multiple permissions
    checkCameraAndPhotos = () => {
        Permissions.checkMultiple(['camera', 'photo']).then(response => {
            //response is an object mapping type to permission
            this.setState({
                // cameraPermission: response.camera,
                // photoPermission: response.photo,
            })
        })
    }
    onRegionChange(region) {
        // this.setState({ region });
    }
    launchPicker = () => {
        let options = {
            title: 'Choose Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
            } else if (response.error) {
            } else {
                this.props.saveProfilePic(response.uri);
            }
        });
    }

}


const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.buttonDisableBg
    },

    cardViewStyle: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 20,
        marginTop: 80

    },
    imageMainStyle: {
        marginTop: 80, marginStart: 15, marginEnd: 15, height: 180, backgroundColor: 'white', alignItems: 'center', borderWidth: 1, borderRadius: 5,
        borderColor: "gray"
    },
    imageTouchStyle: {
        position: 'absolute', top: -75, height: 150, width: 150, borderRadius: 150 / 2,
    },
    MapViewStyle: {
        width: "100%",
        height: "100%"
    },
    sunViewStyle: {
        marginTop: 80, marginStart: 10, marginEnd: 10
    },
    cardView_InsideText: {
        fontSize: 20,
        color: '#000000',
        textAlign: 'center',
        marginTop: 5

    }

});
const mapStateToProps = (state) => {
    console.log("state.rootReducer.user", state)
    return { user: state.rootReducer.user, uri: state.rootReducer.imageUri }
}
const mapDispatchToProps = (dispatch) => {
    return {
        saveProfilePic: (uri) => {
            dispatch(saveProfileImage(uri))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent)
