/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {LogBox, SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import Navigation from './src/Navigation/Navigation';
// import RNBootSplash from 'react-native-bootsplash';

import {enableScreens} from 'react-native-screens';
import {composeWithDevTools} from 'redux-devtools-extension';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import LoginReducer from './src/store/Login/Login';
import NfcInfoReducer from './src/store/NfcInfo/NfcInfo';
import LocsReducers from './src/store/Locs/LocsReducer';
import AddUsersReducer from './src/store/AddUsers/AddUsers';
import ProjectsReducer from './src/store/Projects/ProjectsReducer';
import GlobalIdenetifierReducer from './src/store/Globalidenetifiers/Globalidenetifiers';
import LocationReducer from './src/store/Locations/LocationsReducers';
import MobileModeReducer from './src/store/MobileMode/MobileModeReducer';
import LocationOfflineModeReducer from './src/store/Locations/LocationsOfflineModeReducer';
import GlobalIdenetifierOfflineReducer from './src/store/Globalidenetifiers/GlobalIdenitfiersOfflineMode';
import ProjectsOfflineModeReducer from './src/store/Projects/ProjectsOfflineModeReducer';
import LocsOfflineModeReducers from './src/store/Locs/LOCsOfflineReducer';
enableScreens();

NetInfo.fetch().then(state => {
  console.log('Connection type', state.type);
  console.log('Is connected?', state.isConnected);
});

const rootReducer = combineReducers({
  login: LoginReducer,
  nfcInfo: NfcInfoReducer,
  newUser: AddUsersReducer,
  globalIdentifier: GlobalIdenetifierReducer,
  globalIdentifierOffline: GlobalIdenetifierOfflineReducer,
  projects: ProjectsReducer,
  projectsOffline: ProjectsOfflineModeReducer,
  locations: LocationReducer,
  loactionsOfflineMode: LocationOfflineModeReducer,
  locs: LocsReducers,
  locsOffline: LocsOfflineModeReducers,
  mobileMode: MobileModeReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  // useEffect(() => {
  //   LogBox.ignoreAllLogs();

  //   setTimeout(() => {
  //     RNBootSplash.hide();
  //   }, 1000);
  // }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'#fff'}
      />
      <Provider store={store}>
        <Navigation />
      </Provider>
    </SafeAreaView>
  );
};

export default App;
