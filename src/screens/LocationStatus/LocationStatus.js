import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Footer from '../../components/Footor/Footer';
import LocButton from '../../components/LocButton/LocButton';
import LocCmp from '../../components/LocCmp/LocCmp';
import MainHeader from '../../components/MainHeader/MainHeader';
import {onFetchingLocations} from '../../store/Locations/LocationsReducers';
import DownloadIcon from '../../../assets/images/download-icon.png';
import ArrowIcon from '../../../assets/images/arrow-loading.png';
import Spinner from '../../components/Spinner/Spinner';
import {
  createLocationTable,
  readLocationTable,
} from '../../Sql/Locations/LocationsSqlite';
import {KeltechLocalDB} from '../../constants/LocalDB';
import {onChangingMobileMode} from '../../store/MobileMode/MobileModeReducer';
import {onFetchingOfflineModeLocations} from '../../store/Locations/LocationsOfflineModeReducer';

function LocationStatus(props) {
  const dispatch = useDispatch();
  const {selectedEditProject} = useSelector(state => state.projects);
  const {selectedEditProjectOffline} = useSelector(
    state => state.projectsOffline,
  );
  const {token} = useSelector(state => state.login);
  const {mode} = useSelector(state => state.mobileMode);
  const {locations, loadLocations, locationError, locationErrorMsg} =
    useSelector(state => state.locations);

  const {offlineLocations, selectedEditOfflineModeLocation} = useSelector(
    state => state.loactionsOfflineMode,
  );

  useEffect(() => {
    selectedEditProject &&
      dispatch(onFetchingLocations(selectedEditProject.id, token));
  }, []);

  useEffect(() => {
    selectedEditProjectOffline &&
      dispatch(onFetchingOfflineModeLocations(selectedEditProjectOffline.id));

    if (mode === 'offline') {
      dispatch(
        onFetchingOfflineModeLocations(selectedEditOfflineModeLocation.id),
      );
    }
  }, [mode]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      selectedEditProject &&
        dispatch(onFetchingLocations(selectedEditProject.id, token));
      setRefreshing(false);
    }, 500);
  }, [dispatch, refreshing]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MainHeader title={'Locations'} {...props} />

      <ScrollView style={{flexGrow: 1}}>
        <View
          style={{
            ...styles.scrollViewContainer,
            justifyContent: 'flex-start',
            paddingBottom: 100,
          }}>
          <View style={styles.statusBtn}>
            <LocButton
              title={'Online'}
              btnBackgroundColor={mode === 'online' ? '#19B403' : '#222E57'}
              txtColor={'#fff'}
              styleProp={{width: '48%'}}
              onPress={() => {
                dispatch(onChangingMobileMode('online'));
              }}
            />

            <LocButton
              title={'Offline'}
              btnBackgroundColor={mode === 'offline' ? '#19B403' : '#222E57'}
              txtColor={'#fff'}
              styleProp={{width: '48%'}}
              onPress={() => {
                dispatch(onChangingMobileMode('offline'));
              }}
            />
          </View>

          <View style={styles.locContainer}>
            <Text style={{textAlign: 'center', fontSize: 18, marginBottom: 10}}>
              Locations
            </Text>
            <ScrollView
              contentContainerStyle={{alignItems: 'center'}}
              style={{flexGrow: 1, width: '100%'}}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              {mode === 'offline' ? (
                offlineLocations.length > 0 &&
                offlineLocations.map(location => {
                  console.log('145', location);
                  return (
                    <LocCmp
                      key={location.id}
                      LocTitle={location.name}
                      locationData={location}
                      icon={<Image source={ArrowIcon} />}
                      locationNavigate={true}
                      props={props}
                      locationId={location.id}
                    />
                  );
                })
              ) : loadLocations ? (
                <Spinner style={{paddingVertical: 10}} />
              ) : locationError ? (
                <View>
                  <Text>{locationErrorMsg}</Text>
                </View>
              ) : locations && locations.length > 0 ? (
                mode === 'online' ? (
                  locations.map(location => {
                    return (
                      <LocCmp
                        key={location.id}
                        LocTitle={location.name}
                        icon={<Image source={DownloadIcon} />}
                        plusIcon={true}
                        props={props}
                        locationId={location.id}
                        download={true}
                        locationNavigate={true}
                      />
                    );
                  })
                ) : null
              ) : (
                <View>
                  <Text style={{textAlign: 'center'}}>
                    No Locations Added Yet.
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <Footer backgroundColor={'#fff'} position={'relative'} bottom={0} />
    </View>
  );
}

export default LocationStatus;

const styles = StyleSheet.create({
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
