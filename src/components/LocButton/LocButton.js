import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TouchableCmp from '../../constants/TouchableCmp';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {isAndroid} from '../../constants/IsAndroid';
import Spinner from '../Spinner/Spinner';

function LocButton({
  title,
  txtColor,
  btnBackgroundColor,
  btnIcon,
  styleProp,
  onPress,
  loading,
  disabled,
}) {
  return (
    <TouchableCmp
      disabled={disabled}
      style={
        disabled
          ? {
              backgroundColor: '#ccc',
              ...styles.btn,
              ...styleProp,
            }
          : {
              backgroundColor: btnBackgroundColor,
              ...styles.btn,
              ...styleProp,
            }
      }
      onPress={onPress ? () => onPress() : null}>
      <View
        style={
          isAndroid
            ? {
                backgroundColor: btnBackgroundColor,
                ...styles.btn,
                ...styleProp,
              }
            : styles.iosView
        }>
        {btnIcon ? (
          <AntDesign
            name="google"
            size={20}
            color={'#fff'}
            style={styles.googleIcon}
          />
        ) : null}
        {loading ? (
          <Spinner size={'small'} color={'#fff'} />
        ) : (
          <Text style={{color: txtColor, ...styles.txtBtn}}>{title}</Text>
        )}
      </View>
    </TouchableCmp>
  );
}

export default LocButton;

const styles = StyleSheet.create({
  btn: {
    width: '40%',
    padding: 15,
    borderRadius: 5,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtn: {textAlign: 'center', fontSize: 13},
  googleIcon: {
    marginRight: 15,
  },
  iosView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
