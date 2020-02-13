import React from 'react';

import {
    View,
    Text
} from 'react-native';
const FlatListHeader = () => {
    return (
        <View elevation={1}
            style={{
                height: 100,
                width: "97%",
                margin: 5,
                backgroundColor: "#fff",
                border: 2.9,
                borderColor: "black",
                alignSelf: "center",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 16,
                },
                shadowOpacity: 1,
                shadowRadius: 7.49
            }}
        >
            <Text style={{ textShadowColor: 'black', textShadowOffset: { width: 1, height: 3 }, textShadowRadius: 10, fontSize: 40, fontWeight: '800', flex: 1, alignSelf: "center", paddingTop: 30, fontSize: 40 }}>Latest articles</Text>
        </View>
    );
}
export default FlatListHeader;