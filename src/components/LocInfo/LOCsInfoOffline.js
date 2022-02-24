import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  onChangeLocsDualOfflineInputs,
  onChangeLocsOfflineInputs,
} from '../../store/Locs/LOCsOfflineReducer';
import LocInput from '../LocInptut/LocInput';
// import {Picker} from '@react-native-picker/picker';
import MapView, {Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import LocButton from '../LocButton/LocButton';

function LocInfoOffline({singleLoc, hasStatus}) {
  const dispatch = useDispatch();
  const {specificOfflineLoc, singleLocOfflineForm, dualLocOfflineForm} =
    useSelector(state => state.locsOffline);
  const {selectedEditOfflineModeLocation} = useSelector(
    state => state.loactionsOfflineMode,
  );
  const [showLocation, setShowLocation] = useState(false);

  useEffect(() => {
    if (singleLoc && specificOfflineLoc.route_id) {
      dispatch(
        onChangeLocsOfflineInputs(specificOfflineLoc.route_id, 'routeId'),
      );
      dispatch(onChangeLocsOfflineInputs(specificOfflineLoc.MISC, 'MISC'));
      dispatch(onChangeLocsOfflineInputs(specificOfflineLoc.origin, 'origin'));
      dispatch(onChangeLocsOfflineInputs(specificOfflineLoc.field_1, 'filed1'));
      dispatch(onChangeLocsOfflineInputs(specificOfflineLoc.field_2, 'filed2'));
      dispatch(onChangeLocsOfflineInputs(specificOfflineLoc.field_3, 'filed3'));
      dispatch(
        onChangeLocsOfflineInputs(specificOfflineLoc.cable_status, 'status'),
      );
    }
    if (!singleLoc && specificOfflineLoc.route_id) {
      dispatch(
        onChangeLocsDualOfflineInputs(specificOfflineLoc.route_id, 'routeId'),
      );
      dispatch(onChangeLocsDualOfflineInputs(specificOfflineLoc.MISC, 'MISC'));
      dispatch(
        onChangeLocsDualOfflineInputs(
          specificOfflineLoc.cable_status,
          'status',
        ),
      );
      dispatch(
        onChangeLocsDualOfflineInputs(specificOfflineLoc.origin, 'cableOrigin'),
      );
      dispatch(
        onChangeLocsDualOfflineInputs(
          specificOfflineLoc.field_1,
          'filed1Origin',
        ),
      );
      dispatch(
        onChangeLocsDualOfflineInputs(
          specificOfflineLoc.field_2,
          'filed2Origin',
        ),
      );
      dispatch(
        onChangeLocsDualOfflineInputs(
          specificOfflineLoc.field_3,
          'filed3Origin',
        ),
      );
      dispatch(
        onChangeLocsDualOfflineInputs(
          specificOfflineLoc.destination,
          'cableDestination',
        ),
      );
      dispatch(
        onChangeLocsDualOfflineInputs(
          specificOfflineLoc.destination_field_1,
          'filed1Destination',
        ),
      );
      dispatch(
        onChangeLocsDualOfflineInputs(
          specificOfflineLoc.destination_field_2,
          'filed2Destination',
        ),
      );
      dispatch(
        onChangeLocsDualOfflineInputs(
          specificOfflineLoc.destination_field_3,
          'filed3Destination',
        ),
      );
      dispatch(
        onChangeLocsDualOfflineInputs(
          selectedEditOfflineModeLocation.latitude,
          'lat',
        ),
      );
      dispatch(
        onChangeLocsDualOfflineInputs(
          selectedEditOfflineModeLocation.longitude,
          'long',
        ),
      );
      dispatch(
        onChangeLocsDualOfflineInputs(
          selectedEditOfflineModeLocation.radius,
          'radius',
        ),
      );
    }
  }, [specificOfflineLoc, showLocation]);

  return (
    <View style={{width: '80%'}}>
      <LocInput
        label={'ID'}
        placeholder={'Route ID'}
        value={
          singleLoc
            ? singleLocOfflineForm.routeId.value
            : dualLocOfflineForm.routeId.value
        }
        onChange={e =>
          singleLoc
            ? dispatch(onChangeLocsOfflineInputs(e, 'routeId'))
            : dispatch(onChangeLocsDualOfflineInputs(e, 'routeId'))
        }
        valid={
          singleLoc
            ? singleLocOfflineForm.routeId.valid
            : dualLocOfflineForm.routeId.valid
        }
        validationMsg={
          singleLoc
            ? singleLocOfflineForm.routeId.validationError
            : dualLocOfflineForm.routeId.validationError
        }
      />
      <LocInput
        label={'MISC'}
        placeholder={'MISC'}
        value={
          singleLoc
            ? singleLocOfflineForm.MISC.value
            : dualLocOfflineForm.MISC.value
        }
        onChange={e =>
          singleLoc
            ? dispatch(onChangeLocsOfflineInputs(e, 'MISC'))
            : dispatch(onChangeLocsDualOfflineInputs(e, 'MISC'))
        }
        valid={
          singleLoc
            ? singleLocOfflineForm.MISC.valid
            : dualLocOfflineForm.MISC.valid
        }
        validationMsg={
          singleLoc
            ? singleLocOfflineForm.MISC.validationError
            : dualLocOfflineForm.MISC.validationError
        }
      />

      <LocInput
        label={'Origin'}
        placeholder={'Origin'}
        value={
          singleLoc
            ? singleLocOfflineForm.origin.value
            : dualLocOfflineForm.cableOrigin.value
        }
        onChange={e =>
          singleLoc
            ? dispatch(onChangeLocsOfflineInputs(e, 'origin'))
            : dispatch(onChangeLocsDualOfflineInputs(e, 'cableOrigin'))
        }
        valid={
          singleLoc
            ? singleLocOfflineForm.origin.valid
            : dualLocOfflineForm.cableOrigin.valid
        }
        validationMsg={
          singleLoc
            ? singleLocOfflineForm.origin.validationError
            : dualLocOfflineForm.cableOrigin.validationError
        }
      />
      <LocInput
        label={'field 1'}
        placeholder={'field 1'}
        value={
          singleLoc
            ? singleLocOfflineForm.filed1.value
            : dualLocOfflineForm.filed1Origin.value
        }
        onChange={e =>
          singleLoc
            ? dispatch(onChangeLocsOfflineInputs(e, 'filed1'))
            : dispatch(onChangeLocsDualOfflineInputs(e, 'filed1Origin'))
        }
        valid={
          singleLoc
            ? singleLocOfflineForm.filed1.valid
            : dualLocOfflineForm.filed1Origin.valid
        }
        validationMsg={
          singleLoc
            ? singleLocOfflineForm.filed1.validationError
            : dualLocOfflineForm.filed1Origin.validationError
        }
      />
      <LocInput
        label={'field 2'}
        placeholder={'field 2'}
        value={
          singleLoc
            ? singleLocOfflineForm.filed2.value
            : dualLocOfflineForm.filed2Origin.value
        }
        onChange={e =>
          singleLoc
            ? dispatch(onChangeLocsOfflineInputs(e, 'filed2'))
            : dispatch(onChangeLocsDualOfflineInputs(e, 'filed2Origin'))
        }
        valid={
          singleLoc
            ? singleLocOfflineForm.filed2.valid
            : dualLocOfflineForm.filed2Origin.valid
        }
        validationMsg={
          singleLoc
            ? singleLocOfflineForm.filed2.validationError
            : dualLocOfflineForm.filed2Origin.validationError
        }
      />
      <LocInput
        label={'field 3'}
        placeholder={'field 3'}
        value={
          singleLoc
            ? singleLocOfflineForm.filed3.value
            : dualLocOfflineForm.filed3Origin.value
        }
        onChange={e =>
          singleLoc
            ? dispatch(onChangeLocsOfflineInputs(e, 'filed3'))
            : dispatch(onChangeLocsDualOfflineInputs(e, 'filed3Origin'))
        }
        valid={
          singleLoc
            ? singleLocOfflineForm.filed3.valid
            : dualLocOfflineForm.filed3Origin.valid
        }
        validationMsg={
          singleLoc
            ? singleLocOfflineForm.filed3.validationError
            : dualLocOfflineForm.filed3Origin.validationError
        }
      />

      {!singleLoc ? (
        <LocInput
          label={'Destination'}
          placeholder={'Destination'}
          value={dualLocOfflineForm.cableDestination.value}
          onChange={e =>
            dispatch(onChangeLocsDualOfflineInputs(e, 'cableDestination'))
          }
          valid={dualLocOfflineForm.cableDestination.valid}
          validationMsg={dualLocOfflineForm.cableDestination.validationError}
        />
      ) : null}

      {!singleLoc ? (
        <LocInput
          label={'Field 1'}
          placeholder={'Field 1'}
          value={dualLocOfflineForm.filed1Destination.value}
          onChange={e =>
            dispatch(onChangeLocsDualOfflineInputs(e, 'filed1Destination'))
          }
          valid={dualLocOfflineForm.filed1Destination.valid}
          validationMsg={dualLocOfflineForm.filed1Destination.validationError}
        />
      ) : null}

      {!singleLoc ? (
        <LocInput
          label={'Field 2'}
          placeholder={'Field 2'}
          value={dualLocOfflineForm.filed2Destination.value}
          onChange={e =>
            dispatch(onChangeLocsDualOfflineInputs(e, 'filed2Destination'))
          }
          valid={dualLocOfflineForm.filed2Destination.valid}
          validationMsg={dualLocOfflineForm.filed2Destination.validationError}
        />
      ) : null}

      {!singleLoc ? (
        <LocInput
          label={'Field 3'}
          placeholder={'Field 3'}
          value={dualLocOfflineForm.filed3Destination.value}
          onChange={e =>
            dispatch(onChangeLocsDualOfflineInputs(e, 'filed3Destination'))
          }
          valid={dualLocOfflineForm.filed3Destination.valid}
          validationMsg={dualLocOfflineForm.filed3Destination.validationError}
        />
      ) : null}

      {/* {hasStatus ? (
        <View style={{width: '100%', alignItems: 'center', marginBottom: 100}}>
          <Picker
            selectedValue={
              singleLoc
                ? singleLocOfflineForm.status.value
                : dualLocOfflineForm.status.value
            }
            style={{height: 60, width: '100%'}}
            onValueChange={val =>
              singleLoc
                ? dispatch(onChangeLocsOfflineInputs(val, 'status'))
                : dispatch(onChangeLocsDualOfflineInputs(val, 'status'))
            }>
            <Picker.Item label="assigned" value="assigned" />
            <Picker.Item label="unassigned" value="unassigned" />
          </Picker>
        </View>
      ) : null} */}

      {!singleLoc ? (
        <View style={{...styles.inputsContainer, marginTop: 100}}>
          <View style={{width: '100%'}}>
            <View style={{...styles.showHideBtn}}>
              <LocButton
                title={
                  !showLocation
                    ? 'show location (optional)'
                    : 'Hide location (optional)'
                }
                btnBackgroundColor={'#222E57'}
                txtColor={'#fff'}
                styleProp={{width: '100%'}}
                onPress={() => setShowLocation(!showLocation)}
              />
            </View>
          </View>
        </View>
      ) : null}

      {!singleLoc ? (
        showLocation ? (
          <View style={{...styles.locationContainer}}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              region={
                dualLocOfflineForm.lat.value !== ''
                  ? {
                      latitude: dualLocOfflineForm.lat.value,
                      longitude: dualLocOfflineForm.long.value,
                      latitudeDelta: 0.015,
                      longitudeDelta: 0.0121,
                    }
                  : {
                      latitude: 53.349804,
                      longitude: -6.26031,
                      latitudeDelta: 0.015,
                      longitudeDelta: 0.0121,
                    }
              }>
              <Circle
                radius={300}
                center={
                  dualLocOfflineForm.lat.value !== ''
                    ? {
                        latitude: dualLocOfflineForm.lat.value,
                        longitude: dualLocOfflineForm.long.value,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                      }
                    : {latitude: 53.349804, longitude: -6.26031}
                }
              />
            </MapView>
            <View style={styles.latLongInputs}>
              <LocInput
                label={'Latitude'}
                placeholder={'Latitude'}
                width={'48%'}
                value={
                  singleLoc
                    ? singleLocOfflineForm.lat.value.toString()
                    : dualLocOfflineForm.lat.value.toString()
                }
                onChange={e =>
                  singleLoc
                    ? dispatch(onChangeLocsOfflineInputs(e, 'lat'))
                    : dispatch(
                        onChangeLocsDualOfflineInputs(parseFloat(e), 'lat'),
                      )
                }
                valid={
                  singleLoc
                    ? singleLocOfflineForm.lat.valid
                    : dualLocOfflineForm.lat.valid
                }
                validationMsg={
                  singleLoc
                    ? singleLocOfflineForm.lat.validationError
                    : dualLocOfflineForm.lat.validationError
                }
              />
              <LocInput
                label={'Longitude'}
                placeholder={'Longitude'}
                width={'48%'}
                value={
                  singleLoc
                    ? singleLocOfflineForm.long.value &&
                      singleLocOfflineForm.long.value.toString()
                    : dualLocOfflineForm.long.value &&
                      dualLocOfflineForm.long.value.toString()
                }
                onChange={e =>
                  singleLoc
                    ? dispatch(onChangeLocsOfflineInputs(e, 'long'))
                    : dispatch(
                        onChangeLocsDualOfflineInputs(parseFloat(e), 'long'),
                      )
                }
                valid={
                  singleLoc
                    ? singleLocOfflineForm.long.valid
                    : dualLocOfflineForm.long.valid
                }
                validationMsg={
                  singleLoc
                    ? singleLocOfflineForm.long.validationError
                    : dualLocOfflineForm.long.validationError
                }
              />
            </View>
            <LocInput
              label={'Raduis'}
              placeholder={'Radius'}
              width={'48%'}
              value={
                singleLoc
                  ? singleLocOfflineForm.radius.value &&
                    singleLocOfflineForm.radius.value.toString()
                  : dualLocOfflineForm.radius.value &&
                    dualLocOfflineForm.radius.value.toString()
              }
              onChange={e =>
                singleLoc
                  ? dispatch(onChangeLocsOfflineInputs(e, 'raduis'))
                  : dispatch(onChangeLocsDualOfflineInputs(e, 'radius'))
              }
              valid={
                singleLoc
                  ? singleLocOfflineForm.radius.valid
                  : dualLocOfflineForm.radius.valid
              }
              validationMsg={
                singleLoc
                  ? singleLocOfflineForm.radius.validationError
                  : dualLocOfflineForm.radius.validationError
              }
            />
          </View>
        ) : null
      ) : null}
    </View>
  );
}

export default LocInfoOffline;

const styles = StyleSheet.create({
  inputsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  showHideBtn: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {width: '100%', height: 400},
  latLongInputs: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assignBtn: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  documintationMapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
});
