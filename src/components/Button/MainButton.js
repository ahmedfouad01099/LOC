import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import TouchableCmp from '../../constants/TouchableCmp';
import {isAndroid} from '../../constants/IsAndroid';
import Spinner from '../Spinner/Spinner';

function MainButton({
  title,
  txtColor,
  txtStyle,
  btnBackgroundColor,
  btnIcon,
  props,
  styleProp,
  onPress,
  loading,
}) {
  return (
    <View style={styles.btnContainer}>
      <TouchableCmp
        style={{
          backgroundColor: btnBackgroundColor,
          ...styles.btn,
          ...styleProp,
        }}
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
          {btnIcon ? btnIcon : null}
          {loading ? (
            <Spinner size={'small'} color={'#fff'} />
          ) : (
            <Text style={{color: txtColor, ...styles.txtBtn, ...txtStyle}}>
              {title}
            </Text>
          )}
        </View>
      </TouchableCmp>
    </View>
  );
}

export default MainButton;

const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: '40%',
    padding: 15,
    borderRadius: 5,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtn: {textAlign: 'center'},
  iosView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
