import React from 'react';
import {Platform, Text, View} from 'react-native';
import TouchableCmp from '../../constants/TouchableCmp';

function SettingButtons({title}) {
  return (
    <View
      style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <TouchableCmp
        style={
          Platform.OS === 'ios'
            ? {width: '100%', justifyContent: 'center', alignItems: 'center'}
            : {}
        }>
        <View
          style={{
            width: '80%',
            backgroundColor: '#222E57',
            marginVertical: 10,
            padding: 10,
            paddingVertical: 15,
            borderRadius: 5,
          }}>
          <Text style={{color: '#fff', textAlign: 'center'}}>{title}</Text>
        </View>
      </TouchableCmp>
    </View>
  );
}

export default SettingButtons;
