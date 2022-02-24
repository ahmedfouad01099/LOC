import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {isAndroid} from '../../constants/IsAndroid';
import TouchableCmp from '../../constants/TouchableCmp';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {onFetchingLocs} from '../../store/Locs/LocsReducer';
import {
  onDownloadingLocationData,
  onSelectingLocation,
} from '../../store/Locations/LocationsReducers';
import {insertValues} from '../../Sql/Locations/LocationsSqlite';
import {onSelectingOfflineModeLocation} from '../../store/Locations/LocationsOfflineModeReducer';

function LocCmp({
  LocTitle,
  icon,
  plusIcon,
  props,
  locationId,
  assigned,
  download,
  locationNavigate,
  locationData,
}) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.login.token);
  const {downloadedData} = useSelector(state => state.locations);
  const {mode} = useSelector(state => state.mobileMode);
  console.log('28', props);
  return (
    <View
      style={
        Platform.OS === 'ios'
          ? styles.iosView
          : {width: '100%', alignItems: 'center'}
      }>
      <View
        style={
          isAndroid ? styles.androidContainerView : styles.iosContainerView
        }>
        {icon ? <View /> : null}
        {locationNavigate ? (
          <TouchableCmp
            onPress={() => {
              props.navigation.navigate('not_assigned_loc');
              mode === 'online'
                ? dispatch(onSelectingLocation(locationId))
                : dispatch(onSelectingOfflineModeLocation(locationId));
            }}>
            <Text style={{fontSize: 18, textAlign: 'center', color: '#222E57'}}>
              {LocTitle}
            </Text>
          </TouchableCmp>
        ) : (
          <Text style={{fontSize: 18, textAlign: 'center', color: '#222E57'}}>
            {LocTitle}
          </Text>
        )}
        {plusIcon ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {/* {plusIcon ? (
              <TouchableCmp
                onPress={() => props.navigation.navigate('not_assigned_loc')}>
                <AntDesign
                  name="plussquare"
                  size={20}
                  color={'#202020'}
                  style={{marginRight: 8}}
                  onPress={() => {
                    dispatch(onSelectingLocation(locationId));
                    props.navigation.navigate('not_assigned_loc');
                  }}
                />
              </TouchableCmp>
            ) : null} */}
            {icon ? (
              download ? (
                <TouchableCmp
                  onPress={async () => {
                    const download = await dispatch(
                      onDownloadingLocationData(locationId, token),
                    );

                    return download(), insert();
                  }}>
                  {icon}
                </TouchableCmp>
              ) : locationData.LOC_type === 'single' ? (
                <TouchableCmp
                  onPress={locationData.created ? () => {} : () => {}}>
                  {icon}
                </TouchableCmp>
              ) : (
                <TouchableCmp
                  onPress={locationData.created ? () => {} : () => {}}>
                  {icon}
                </TouchableCmp>
              )
            ) : null}
          </View>
        ) : (
          icon
        )}
      </View>
    </View>
  );
}

export default LocCmp;

const styles = StyleSheet.create({
  iosView: {
    width: '80%',
    borderColor: '#222E57',
    borderWidth: 2,
    padding: 10,
    paddingHorizontal: 5,
    borderRadius: 4,
    marginTop: 10,
  },
  androidContainerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
    borderColor: '#222E57',
    borderWidth: 2,
    padding: 14,
    borderRadius: 4,
    marginTop: 10,
  },
  iosContainerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
