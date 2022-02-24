import React from 'react';
import {Text, View} from 'react-native';

function LocText({title, text}) {
  return (
    <View
      style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      {title ? (
        <Text
          style={{
            fontSize: 22,
            textAlign: 'center',
            marginTop: 10,
            width: '70%',
          }}>
          {title}
        </Text>
      ) : null}
      <Text style={{textAlign: 'center', fontSize: 18}}>{text}</Text>
    </View>
  );
}

export default LocText;
