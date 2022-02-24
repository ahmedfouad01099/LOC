import React from 'react';
import {Image, StyleSheet, useWindowDimensions, View} from 'react-native';
import Pagintator from './Pagintator';

function OnboardingItem({image, sliderLang, props}) {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.container, {width}]}>
      <Image
        source={image}
        style={
          ([styles.image],
          {
            width: 200,
            resizeMode: 'contain',
            height: 100,
          })
        }
      />
      <View>
        <Pagintator {...props} data={sliderLang} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'cairo',
    fontSize: 28,
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  description: {
    fontFamily: 'cairo',
    color: 'rgba(0, 0, 0, .5)',
    textAlign: 'center',
    paddingHorizontal: 64,
  },
});
export default OnboardingItem;
