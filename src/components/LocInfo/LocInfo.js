import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  onChangeLocsDualInputs,
  onChangeLocsInputs,
} from '../../store/Locs/LocsReducer';
import LocInput from '../LocInptut/LocInput';
// import {Picker} from '@react-native-picker/picker';
import MapView, {Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import LocButton from '../LocButton/LocButton';

function LocInfo({singleLoc, hasStatus}) {
  const dispatch = useDispatch();
  const {specificLoc, singleLocForm, dualLocForm} = useSelector(
    state => state.locs,
  );
  const {selectedEditLocation} = useSelector(state => state.locations);
  const [showLocation, setShowLocation] = useState(false);

  useEffect(() => {
    if (singleLoc && specificLoc.route_id) {
      dispatch(onChangeLocsInputs(specificLoc.route_id, 'routeId'));
      dispatch(onChangeLocsInputs(specificLoc.MISC, 'MISC'));
      dispatch(onChangeLocsInputs(specificLoc.origin, 'origin'));
      dispatch(onChangeLocsInputs(specificLoc.field_1, 'filed1'));
      dispatch(onChangeLocsInputs(specificLoc.field_2, 'filed2'));
      dispatch(onChangeLocsInputs(specificLoc.field_3, 'filed3'));
      dispatch(onChangeLocsInputs(specificLoc.cable_status, 'status'));
    }
    if (!singleLoc && specificLoc.LOCDestination) {
      dispatch(onChangeLocsDualInputs(specificLoc.route_id, 'routeId'));
      dispatch(onChangeLocsDualInputs(specificLoc.MISC, 'MISC'));
      dispatch(onChangeLocsDualInputs(specificLoc.cable_status, 'status'));
      dispatch(onChangeLocsDualInputs(specificLoc.origin, 'cableOrigin'));
      dispatch(onChangeLocsDualInputs(specificLoc.field_1, 'filed1Origin'));
      dispatch(onChangeLocsDualInputs(specificLoc.field_2, 'filed2Origin'));
      dispatch(onChangeLocsDualInputs(specificLoc.field_3, 'filed3Origin'));
      dispatch(
        onChangeLocsDualInputs(
          specificLoc.LOCDestination.destination,
          'cableDestination',
        ),
      );
      dispatch(
        onChangeLocsDualInputs(
          specificLoc.LOCDestination.destination_field_1,
          'filed1Destination',
        ),
      );
      dispatch(
        onChangeLocsDualInputs(
          specificLoc.LOCDestination.destination_field_2,
          'filed2Destination',
        ),
      );
      dispatch(
        onChangeLocsDualInputs(
          specificLoc.LOCDestination.destination_field_3,
          'filed3Destination',
        ),
      );
      dispatch(onChangeLocsDualInputs(selectedEditLocation.latitude, 'lat'));
      dispatch(onChangeLocsDualInputs(selectedEditLocation.longitude, 'long'));
      dispatch(onChangeLocsDualInputs(selectedEditLocation.radius, 'radius'));
    }
  }, [specificLoc, showLocation]);
  return (
    <View style={{width: '80%'}}>
      <LocInput
        label={'ID'}
        placeholder={'Route ID'}
        value={
          singleLoc ? singleLocForm.routeId.value : dualLocForm.routeId.value
        }
        onChange={e =>
          singleLoc
            ? dispatch(onChangeLocsInputs(e, 'routeId'))
            : dispatch(onChangeLocsDualInputs(e, 'routeId'))
        }
        valid={
          singleLoc ? singleLocForm.routeId.valid : dualLocForm.routeId.valid
        }
        validationMsg={
          singleLoc
            ? singleLocForm.routeId.validationError
            : dualLocForm.routeId.validationError
        }
      />
      <LocInput
        label={'MISC'}
        placeholder={'MISC'}
        value={singleLoc ? singleLocForm.MISC.value : dualLocForm.MISC.value}
        onChange={e =>
          singleLoc
            ? dispatch(onChangeLocsInputs(e, 'MISC'))
            : dispatch(onChangeLocsDualInputs(e, 'MISC'))
        }
        valid={singleLoc ? singleLocForm.MISC.valid : dualLocForm.MISC.valid}
        validationMsg={
          singleLoc
            ? singleLocForm.MISC.validationError
            : dualLocForm.MISC.validationError
        }
      />

      <LocInput
        label={'Origin'}
        placeholder={'Origin'}
        value={
          singleLoc ? singleLocForm.origin.value : dualLocForm.cableOrigin.value
        }
        onChange={e =>
          singleLoc
            ? dispatch(onChangeLocsInputs(e, 'origin'))
            : dispatch(onChangeLocsDualInputs(e, 'cableOrigin'))
        }
        valid={
          singleLoc ? singleLocForm.origin.valid : dualLocForm.cableOrigin.valid
        }
        validationMsg={
          singleLoc
            ? singleLocForm.origin.validationError
            : dualLocForm.cableOrigin.validationError
        }
      />
      <LocInput
        label={'field 1'}
        placeholder={'field 1'}
        value={
          singleLoc
            ? singleLocForm.filed1.value
            : dualLocForm.filed1Origin.value
        }
        onChange={e =>
          singleLoc
            ? dispatch(onChangeLocsInputs(e, 'filed1'))
            : dispatch(onChangeLocsDualInputs(e, 'filed1Origin'))
        }
        valid={
          singleLoc
            ? singleLocForm.filed1.valid
            : dualLocForm.filed1Origin.valid
        }
        validationMsg={
          singleLoc
            ? singleLocForm.filed1.validationError
            : dualLocForm.filed1Origin.validationError
        }
      />
      <LocInput
        label={'field 2'}
        placeholder={'field 2'}
        value={
          singleLoc
            ? singleLocForm.filed2.value
            : dualLocForm.filed2Origin.value
        }
        onChange={e =>
          singleLoc
            ? dispatch(onChangeLocsInputs(e, 'filed2'))
            : dispatch(onChangeLocsDualInputs(e, 'filed2Origin'))
        }
        valid={
          singleLoc
            ? singleLocForm.filed2.valid
            : dualLocForm.filed2Origin.valid
        }
        validationMsg={
          singleLoc
            ? singleLocForm.filed2.validationError
            : dualLocForm.filed2Origin.validationError
        }
      />
      <LocInput
        label={'field 3'}
        placeholder={'field 3'}
        value={
          singleLoc
            ? singleLocForm.filed3.value
            : dualLocForm.filed3Origin.value
        }
        onChange={e =>
          singleLoc
            ? dispatch(onChangeLocsInputs(e, 'filed3'))
            : dispatch(onChangeLocsDualInputs(e, 'filed3Origin'))
        }
        valid={
          singleLoc
            ? singleLocForm.filed3.valid
            : dualLocForm.filed3Origin.valid
        }
        validationMsg={
          singleLoc
            ? singleLocForm.filed3.validationError
            : dualLocForm.filed3Origin.validationError
        }
      />

      {!singleLoc ? (
        <LocInput
          label={'Destination'}
          placeholder={'Destination'}
          value={dualLocForm.cableDestination.value}
          onChange={e =>
            dispatch(onChangeLocsDualInputs(e, 'cableDestination'))
          }
          valid={dualLocForm.cableDestination.valid}
          validationMsg={dualLocForm.cableDestination.validationError}
        />
      ) : null}

      {!singleLoc ? (
        <LocInput
          label={'Field 1'}
          placeholder={'Field 1'}
          value={dualLocForm.filed1Destination.value}
          onChange={e =>
            dispatch(onChangeLocsDualInputs(e, 'filed1Destination'))
          }
          valid={dualLocForm.filed1Destination.valid}
          validationMsg={dualLocForm.filed1Destination.validationError}
        />
      ) : null}

      {!singleLoc ? (
        <LocInput
          label={'Field 2'}
          placeholder={'Field 2'}
          value={dualLocForm.filed2Destination.value}
          onChange={e =>
            dispatch(onChangeLocsDualInputs(e, 'filed2Destination'))
          }
          valid={dualLocForm.filed2Destination.valid}
          validationMsg={dualLocForm.filed2Destination.validationError}
        />
      ) : null}

      {!singleLoc ? (
        <LocInput
          label={'Field 3'}
          placeholder={'Field 3'}
          value={dualLocForm.filed3Destination.value}
          onChange={e =>
            dispatch(onChangeLocsDualInputs(e, 'filed3Destination'))
          }
          valid={dualLocForm.filed3Destination.valid}
          validationMsg={dualLocForm.filed3Destination.validationError}
        />
      ) : null}

      {/* {hasStatus ? (
        <View style={{width: '100%', alignItems: 'center', marginBottom: 100}}>
          <Picker
            selectedValue={
              singleLoc ? singleLocForm.status.value : dualLocForm.status.value
            }
            style={{height: 60, width: '100%'}}
            onValueChange={val =>
              singleLoc
                ? dispatch(onChangeLocsInputs(val, 'status'))
                : dispatch(onChangeLocsDualInputs(val, 'status'))
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
                dualLocForm.lat.value !== ''
                  ? {
                      latitude: dualLocForm.lat.value,
                      longitude: dualLocForm.long.value,
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
                  dualLocForm.lat.value !== ''
                    ? {
                        latitude: dualLocForm.lat.value,
                        longitude: dualLocForm.long.value,
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
                    ? singleLocForm.lat.value.toString()
                    : dualLocForm.lat.value.toString()
                }
                onChange={e =>
                  singleLoc
                    ? dispatch(onChangeLocsInputs(e, 'lat'))
                    : dispatch(onChangeLocsDualInputs(parseFloat(e), 'lat'))
                }
                valid={
                  singleLoc ? singleLocForm.lat.valid : dualLocForm.lat.valid
                }
                validationMsg={
                  singleLoc
                    ? singleLocForm.lat.validationError
                    : dualLocForm.lat.validationError
                }
              />
              <LocInput
                label={'Longitude'}
                placeholder={'Longitude'}
                width={'48%'}
                value={
                  singleLoc
                    ? singleLocForm.long.value &&
                      singleLocForm.long.value.toString()
                    : dualLocForm.long.value &&
                      dualLocForm.long.value.toString()
                }
                onChange={e =>
                  singleLoc
                    ? dispatch(onChangeLocsInputs(e, 'long'))
                    : dispatch(onChangeLocsDualInputs(parseFloat(e), 'long'))
                }
                valid={
                  singleLoc ? singleLocForm.long.valid : dualLocForm.long.valid
                }
                validationMsg={
                  singleLoc
                    ? singleLocForm.long.validationError
                    : dualLocForm.long.validationError
                }
              />
            </View>
            <LocInput
              label={'Raduis'}
              placeholder={'Radius'}
              width={'48%'}
              value={
                singleLoc
                  ? singleLocForm.radius.value &&
                    singleLocForm.radius.value.toString()
                  : dualLocForm.radius.value &&
                    dualLocForm.radius.value.toString()
              }
              onChange={e =>
                singleLoc
                  ? dispatch(onChangeLocsInputs(e, 'raduis'))
                  : dispatch(onChangeLocsDualInputs(e, 'radius'))
              }
              valid={
                singleLoc
                  ? singleLocForm.radius.valid
                  : dualLocForm.radius.valid
              }
              validationMsg={
                singleLoc
                  ? singleLocForm.radius.validationError
                  : dualLocForm.radius.validationError
              }
            />
          </View>
        ) : null
      ) : null}
    </View>
  );
}

export default LocInfo;

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
