import React, { Component } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';

export default class ProfileComponent extends Component {
 
    constructor(props) {
        super(props)

        this.state = {
            latitude:0.0,
            longitude:0.0,
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
        this.getLocation()

    }
    getLocation() {
        if (this.requestLocationPermission()) {
            Geolocation.getCurrentPosition(
                (position) => {
                    const { coords } = position
                    this.setState({latitude:coords.latitude})
                    this.setState({longitude:coords.longitude})
                    
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
        return <MapView style={{ flex: 1 }}
            initialRegion={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }} onRegionChange={this.onRegionChange}
            provider={PROVIDER_GOOGLE}
        >
            {/* <Marker
                coordinate={this.state.coordinate}
                title={this.state.coordinate.title}
            /> */}

        </MapView>
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

    onRegionChange(region) {
        // this.setState({ region });
    }



}

