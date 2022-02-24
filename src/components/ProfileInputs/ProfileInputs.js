import React from 'react';
import {TextInput, View} from 'react-native';

function ProfileInputs({placeholder, keyboardType, value}) {
  return (
    <View
      style={{
        width: '100%',
        shadowColor: '#707070',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        marginVertical: 8,
      }}>
      <TextInput
        placeholder={placeholder}
        style={{
          borderColor: '#707070',
          borderWidth: 0.4,
          borderRadius: 5,
          width: '100%',
          padding: 8,
          paddingVertical: 13,
          backgroundColor: '#fff',
        }}
        keyboardType={keyboardType}
        value={value}
        editable={false}
      />
    </View>
  );
}

export default ProfileInputs;
