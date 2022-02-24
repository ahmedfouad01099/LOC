import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TouchableCmp from '../../../constants/TouchableCmp';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from '../../../components/Footor/Footer';
import {useDispatch, useSelector} from 'react-redux';
import {
  onChangeAddUserInput,
  onFetchingSpecificUser,
} from '../../../store/AddUsers/AddUsers';
import ProfileInputs from '../../../components/ProfileInputs/ProfileInputs';
import SettingButtons from '../../../components/Settings/SettingButtons';
import LocCmp from '../../../components/LocCmp/LocCmp';
import LocButton from '../../../components/LocButton/LocButton';
import DownLoadIcon from '../../../../assets/images/download-icon.png';
import ArrowIcon from '../../../../assets/images/arrow-loading.png';
import {
  onFetchingGlobalIdentifiers,
  onSelectingIdentifier,
} from '../../../store/Globalidenetifiers/Globalidenetifiers';
import MainButton from '../../../components/Button/MainButton';
import Spinner from '../../../components/Spinner/Spinner';
import {createLocationTable} from '../../../Sql/Locations/LocationsSqlite';
import {createIdentifierTable} from '../../../Sql/Identifiers/IdentifiersSqlite';
import {KeltechLocalDB} from '../../../constants/LocalDB';
import {onChangingMobileMode} from '../../../store/MobileMode/MobileModeReducer';
import {
  onFetchingGlobalIdentifiersOffline,
  onSelectingIdentifierOfflineMode,
} from '../../../store/Globalidenetifiers/GlobalIdenitfiersOfflineMode';

function OverlayView({
  scaleValue,
  closeButtonOffset,
  showMenu,
  showMenuHandler,
  offsetValue,
  props,
  currentTab,
}) {
  const dispatch = useDispatch();

  // ============================================================
  // Profile section
  const {userId, token} = useSelector(state => state.login);
  const {userForm, specificUser, userError, userErrorMsg} = useSelector(
    state => state.newUser,
  );
  useEffect(() => {
    dispatch(onFetchingSpecificUser(userId, token));
  }, [dispatch]);

  useEffect(() => {
    if (specificUser && specificUser.user_id) {
      if (specificUser.fullName.indexOf(' ') > -1) {
        dispatch(
          onChangeAddUserInput(
            specificUser.fullName.split(' ')[0],
            'firstName',
          ),
        );
        dispatch(
          onChangeAddUserInput(specificUser.fullName.split(' ')[1], 'lastName'),
        );
      } else {
        dispatch(onChangeAddUserInput(specificUser.fullName, 'firstName'));
      }

      dispatch(onChangeAddUserInput(specificUser.email, 'email'));
      dispatch(onChangeAddUserInput(specificUser.role, 'role'));
    }
  }, [specificUser]);

  // ============================================================
  // Location section
  const [refreshing, setRefreshing] = useState(false);
  const {mode} = useSelector(state => state.mobileMode);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(onFetchingGlobalIdentifiers(token));
      setRefreshing(false);
    }, 500);
  }, [dispatch, refreshing]);

  const {globalIdentifiers, loadFetchingGlobalIdentifiers, error, errorMsg} =
    useSelector(state => state.globalIdentifier);

  const {
    globalIdentifiersOfflineMode,
    loadFetchingIdentifiersOfflineMode,
    selectedIdentifierOfflineMode,
  } = useSelector(state => state.globalIdentifierOffline);

  useEffect(() => {
    dispatch(onFetchingGlobalIdentifiers(token));
  }, []);

  const [offlineIdentifiers, setOfflineIdentifiers] = useState([]);

  return (
    <Animated.View
      style={{
        ...styles.overlayView,
        borderRadius: showMenu ? 15 : 0,
        // Transformation View
        transform: [{scale: scaleValue}, {translateX: offsetValue}],
      }}>
      <Animated.View
        style={{
          transform: [{translateY: closeButtonOffset}],
        }}>
        <View
          style={{
            backgroundColor: showMenu ? 'rgba(0,0,0,0.5)' : '#fff',
            ...styles.btnMenu,
          }}>
          <View style={styles.homeHeader}>
            <TouchableCmp onPress={() => showMenuHandler()}>
              <Entypo name="menu" size={35} color={'#222E57'} />
            </TouchableCmp>
            <Image
              source={require('../../../../assets/images/1.png')}
              style={{width: 200, height: 50, resizeMode: 'contain'}}
            />
            <TouchableCmp onPress={() => props.navigation.navigate('profile')}>
              <Ionicons
                color={'#222E57'}
                size={30}
                name="person"
                style={{marginRight: 5}}
              />
            </TouchableCmp>
          </View>
          {currentTab === 'Home' ? (
            <View>
              <View style={styles.txtView}>
                <Text style={styles.txt}>welcome to</Text>
                <Text style={{...styles.txt, fontSize: 22}}>
                  Label On Cable
                </Text>
              </View>

              <TouchableCmp
                onPress={() => props.navigation.navigate('nfc_enable')}>
                <View style={styles.centerScanLocContainer}>
                  <View style={styles.scanLocContainer}>
                    <Image
                      source={require('../../../../assets/images/scanloc.png')}
                      style={styles.scanLocImg}
                    />
                    <View style={styles.scanLocTxtContainer}>
                      <Text style={styles.scanLocTxt}>Scan LOC</Text>
                    </View>
                  </View>
                </View>
              </TouchableCmp>
            </View>
          ) : null}

          {currentTab === 'Profile' ? (
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              {userError ? (
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{textAlign: 'center'}}>{userErrorMsg}</Text>
                </View>
              ) : (
                <View
                  style={{
                    width: '80%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../../assets/images/profile.jpeg')}
                    style={{width: 100, height: 100, borderRadius: 50}}
                  />

                  <Text style={{fontSize: 20, marginBottom: 20}}>
                    {userForm.firstName.value + ' ' + userForm.lastName.value}
                  </Text>

                  <ProfileInputs
                    placeholder={'E-mail'}
                    keyboardType={'default'}
                    value={userForm.email.value}
                    onChange={e => dispatch(onChangeAddUserInput(e, 'email'))}
                  />
                  <ProfileInputs
                    placeholder={'Full Name'}
                    keyboardType={'default'}
                    value={
                      userForm.firstName.value + ' ' + userForm.lastName.value
                    }
                    onChange={e => dispatch(onChangeAddUserInput(e, 'email'))}
                  />
                  <ProfileInputs
                    placeholder={'Role'}
                    keyboardType={'default'}
                    value={userForm.role.value}
                    onChange={e => dispatch(onChangeAddUserInput(e, 'email'))}
                  />
                </View>
              )}
            </View>
          ) : null}

          {currentTab === 'Settings' ? (
            <View style={{flex: 1, alignItems: 'center'}}>
              <View>
                <Text style={{fontSize: 20, marginTop: 40}}>SETTINGS</Text>
                <Text style={{fontSize: 18, paddingVertical: 10}}>
                  Current Mode
                </Text>
              </View>

              <SettingButtons title={'Online Mode'} />
              <SettingButtons title={'Offline Mode'} />
              <SettingButtons title={'Mobile Mode'} />
            </View>
          ) : null}

          {currentTab === 'Locations' ? (
            <View style={{flex: 1, paddingBottom: 85, marginTop: 60}}>
              <View style={{...styles.scrollViewContainer}}>
                <View style={styles.statusBtn}>
                  <LocButton
                    title={'Online'}
                    btnBackgroundColor={
                      mode === 'online' ? '#19B403' : '#222E57'
                    }
                    txtColor={'#fff'}
                    styleProp={{width: '48%'}}
                    onPress={() => {
                      dispatch(onChangingMobileMode('online'));
                    }}
                  />

                  <LocButton
                    title={'Offline'}
                    btnBackgroundColor={
                      mode === 'offline' ? '#19B403' : '#222E57'
                    }
                    txtColor={'#fff'}
                    styleProp={{width: '48%'}}
                    onPress={() => {
                      dispatch(onChangingMobileMode('offline'));
                      dispatch(onFetchingGlobalIdentifiersOffline());
                    }}
                  />
                </View>

                <View style={styles.locContainer}>
                  <Text style={{textAlign: 'center', fontSize: 25}}>
                    Global Identifiers
                  </Text>
                  <View style={{width: '100%', paddingBottom: 100}}>
                    <ScrollView
                      style={{flexGrow: 1}}
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }>
                      {mode === 'offline' ? (
                        globalIdentifiersOfflineMode.length > 0 &&
                        globalIdentifiersOfflineMode.map(identifier => {
                          console.log('310', identifier);
                          return (
                            <TouchableCmp
                              key={identifier.gid}
                              style={
                                Platform.OS === 'ios'
                                  ? {width: '100%', alignItems: 'center'}
                                  : {}
                              }
                              onPress={() => {
                                dispatch(
                                  onSelectingIdentifierOfflineMode(
                                    identifier.gid,
                                  ),
                                );
                                props.navigation.navigate('projects');
                              }}>
                              <View
                                style={{
                                  width: '100%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <LocCmp
                                  props={props}
                                  LocTitle={identifier.name}
                                />
                              </View>
                            </TouchableCmp>
                          );
                        })
                      ) : loadFetchingGlobalIdentifiers ? (
                        <Spinner style={{paddingVertical: 10}} />
                      ) : error ? (
                        <View style={{marginTop: 20}}>
                          <Text style={{textAlign: 'center'}}>{errorMsg}</Text>
                        </View>
                      ) : globalIdentifiers && globalIdentifiers.length > 0 ? (
                        globalIdentifiers.map(identifier => {
                          return (
                            <TouchableCmp
                              key={identifier.gid}
                              style={
                                Platform.OS === 'ios'
                                  ? {width: '100%', alignItems: 'center'}
                                  : {}
                              }
                              onPress={() => {
                                dispatch(onSelectingIdentifier(identifier.gid));
                                props.navigation.navigate('projects');
                              }}>
                              <View
                                style={{
                                  width: '100%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <LocCmp
                                  props={props}
                                  LocTitle={identifier.name}
                                />
                              </View>
                            </TouchableCmp>
                          );
                        })
                      ) : (
                        <View>
                          <Text style={{textAlign: 'center'}}>
                            No Global Identifiers Added Yet.
                          </Text>
                        </View>
                      )}
                    </ScrollView>
                  </View>
                </View>
              </View>
            </View>
          ) : null}
        </View>
        <Footer bottom={0.1} backgroundColor={'#fff'} />
      </Animated.View>
    </Animated.View>
  );
}

export default OverlayView;

const styles = StyleSheet.create({
  overlayView: {
    flexGrow: 1,
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  btnMenu: {
    height: '100%',
  },
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  txtView: {marginTop: 30},
  txt: {textAlign: 'center', fontSize: 18, color: '#222E57'},
  centerScanLocContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  scanLocContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#48B8AC',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1.25,
    shadowRadius: 3.84,
    width: '60%',
    borderColor: '#48B8AC',
    borderRadius: 5,
    borderWidth: 0.5,
    elevation: 5,
  },
  scanLocImg: {width: '100%', resizeMode: 'contain'},
  scanLocTxtContainer: {
    width: '100%',
    // height: 50,
    elevation: 5,
    paddingVertical: 20,
  },
  scanLocTxt: {color: '#000', textAlign: 'center'},
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  scrollViewContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBtn: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
