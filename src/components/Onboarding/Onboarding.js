import React from 'react';
import {StyleSheet, View} from 'react-native';
import OnboardingItem from './OnboardingItem';

function Onboarding(props) {
  const sliderLang = [
    {id: '1'},
    {id: '2'},
    {id: '3'},
    {id: '4'},
    {id: '5'},
    {id: '6'},
  ];

  return (
    <View style={styles.container}>
      <View style={{flex: 6}}>
        <OnboardingItem
          image={require('../../../assets/images/1.png')}
          sliderLang={sliderLang}
          props={props}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  ActivityIndicator: {
    paddingVertical: 7,
  },
});

export default Onboarding;
