import React, {useEffect, useState} from 'react';
import Onboarding from '../../components/Onboarding/Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Login from '../Login/Login';
import Navigation from '../../Navigation/Navigation';
import Home from '../Home/Home';

const Loading = () => {
  return (
    <View>
      <ActivityIndicator size={'large'} />
    </View>
  );
};
function AppIntro(props) {
  const [loading, setLoading] = useState(true);
  const [viewOnboarding, setViewOnboarding] = useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewOnboarding');

      if (value !== null) {
        setViewOnboarding(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  // const token = useSelector(state => state.login.token);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : viewOnboarding ? (
        true ? (
          <View style={{width: '100%', flex: 1}}>
            <Home />
          </View>
        ) : (
          <Login {...props} />
        )
      ) : (
        <Onboarding {...props} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default AppIntro;
