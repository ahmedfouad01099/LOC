import React, {useState} from 'react';
import {Image, Platform, StyleSheet, TextInput, View} from 'react-native';

function InputText({
  secureTextEntry,
  keyboardType,
  styleProp,
  placeholder,
  imageSource,
  imgContainerStyle,
  imgStyle,
  borderColor,
  onChange,
}) {
  const [foucs, setFouc] = useState(false);
  return (
    <View
      style={
        foucs
          ? {
              ...styles.TxtInputContainer,
              shadowColor: borderColor,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }
          : styles.TxtInputContainer
      }>
      {imageSource ? (
        <View style={{...styles.iconImage, ...imgContainerStyle}}>
          <Image source={imageSource} style={{...imgStyle}} />
        </View>
      ) : null}
      <TextInput
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={{
          ...styles.TxtInput,
          ...styleProp,
          ...(foucs
            ? {
                borderColor: borderColor,
                borderWidth: 2,
              }
            : {}),
        }}
        placeholder={placeholder}
        // onFocus={() => setFouc(true)}
        onBlur={() => setFouc(false)}
        onChangeText={onChange}
      />
    </View>
  );
}

export default InputText;

const styles = StyleSheet.create({
  TxtInputContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TxtInput: {
    flex: 1,
    paddingVertical: 10,
  },
  iconImage: {
    alignItems: 'center',
    position: 'absolute',
    width: 15,
    height: 15,
    left: 5,
    top: Platform.OS === 'ios' ? '45%' : '50%',
  },
});
