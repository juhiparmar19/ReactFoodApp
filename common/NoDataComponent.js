import React,{Component} from 'react';
import {View,Text} from 'react-native';
import BaseStyle from './BaseStyle';

export default function NoDataComponent(props) {
    if (props.msg != undefined) {
        return <View style={{ flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center' }}>
            <Text size='large' color='red' style={BaseStyle.commonInputStyle}>{props.msg}</Text>
        </View>
    } 
}