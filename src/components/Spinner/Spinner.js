import React from 'react';
import {ActivityIndicator} from 'react-native';

function Spinner({color, size, style}) {
  return (
    <ActivityIndicator
      size={size ? size : 'large'}
      color={color ? color : '#000'}
      style={{...style}}
    />
  );
}

export default Spinner;
