import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

function Pagintator(props) {
  const [activeDot, setActiveDot] = useState(0);
  // const token = useSelector(state => state.login.token);
  useEffect(() => {
    for (let i = 0; i < props.data.length; i++) {
      setTimeout(() => {
        setActiveDot(activeDot + 1);
      }, 500);

      if (activeDot === 5) {
        setTimeout(() => {
          // token
          //   ? props.navigation.navigate('home')
          //   : 
            props.navigation.navigate('login');
        }, 500);
      }
    }
  }, [activeDot]);
  return (
    <View style={styles.container}>
      {props.data.map((_, i) => {
        return (
          <View
            style={
              i === activeDot
                ? {...styles.dot, backgroundColor: '#48B7AD'}
                : styles.dot
            }
            key={i.toString()}></View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
    marginHorizontal: 8,
  },
});

export default Pagintator;
