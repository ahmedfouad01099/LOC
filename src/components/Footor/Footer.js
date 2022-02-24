import React from 'react';
import {Image, Text, View} from 'react-native';

function Footer({bottom, position, backgroundColor, style}) {
  return (
    <View
      style={{
        width: '100%',
        position: position ? position : 'absolute',
        bottom: bottom ? bottom : 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor ? backgroundColor : 'transparent',
        // marginTop: 100,
        paddingVertical: 3,
        // backgroundColor: showMenu ? 'rgba(255,255,255,0.5)' : 'transparent',
        ...style,
      }}>
      <Text>Powered by</Text>
      <Image
        source={require('../../../assets/images/1.png')}
        style={{width: 150, height: 50, resizeMode: 'contain'}}
      />
    </View>
  );
}

export default Footer;
