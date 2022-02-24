import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

function LocInput({
  label,
  placeholder,
  width,
  value,
  onChange,
  inputIdentifier,
  valid,
  validationMsg,
}) {
  return (
    <View style={{marginTop: 5, width: width ? width : '100%'}}>
      <Text style={{marginVertical: 4}}>{label}</Text>
      <TextInput
        style={
          valid
            ? styles.textInput
            : {...styles.textInput, borderColor: 'red', borderWidth: 1}
        }
        placeholder={placeholder}
        value={value}
        onChangeText={e => onChange(e, inputIdentifier)}
      />
      {!valid ? (
        <View style={{paddingVertical: 3}}>
          <Text style={{color: 'red'}}>{validationMsg}</Text>
        </View>
      ) : null}
    </View>
  );
}

export default LocInput;

const styles = StyleSheet.create({
  textInput: {
    borderColor: '#48B7AD',
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#fff',

    shadowColor: '#48B7AD',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
