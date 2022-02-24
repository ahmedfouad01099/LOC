import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TouchableCmp from '../../constants/TouchableCmp';

function MainHeader(props) {
  return (
    <View style={styles.homeHeader}>
      <TouchableCmp
        onPress={() => {
          props.onPress ? props.onPress() : null;
          props.navigation.goBack();
        }}>
        <MaterialIcons name="arrow-back-ios" size={35} color={'#222E57'} />
      </TouchableCmp>
      {props.title ? (
        <Text style={{fontSize: 25, color: '#222E57'}}>{props.title}</Text>
      ) : (
        <Image
          source={require('../../../assets/images/1.png')}
          style={{width: 200, height: 50, resizeMode: 'contain'}}
        />
      )}
      {!props.editIcon ? (
        <View />
      ) : (
        <TouchableCmp
          onPress={() => {
            props.navigation.navigate(props.navigateTo);
          }}>
          <Image
            source={require('../../../assets/images/edit.png')}
            style={{width: 27, height: 27}}
          />
        </TouchableCmp>
      )}
    </View>
  );
}

export default MainHeader;

const styles = StyleSheet.create({
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },
});
