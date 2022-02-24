import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Footer from '../../components/Footor/Footer';
import LocButton from '../../components/LocButton/LocButton';
import LocInput from '../../components/LocInptut/LocInput';
import LocText from '../../components/LocText/LocText';
import MainHeader from '../../components/MainHeader/MainHeader';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {onAddingDualLoc} from '../../store/Locs/LocsReducer';
import {useDispatch, useSelector} from 'react-redux';
import LocInfo from '../../components/LocInfo/LocInfo';
import LocInfoOffline from '../../components/LocInfo/LOCsInfoOffline';
import {onAddingDualOfflineLoc} from '../../store/Locs/LOCsOfflineReducer';

function NewDualLoc(props) {
  const dispatch = useDispatch();
  const {loading, dualLocForm} = useSelector(state => state.locs);
  const {loadingAddingOfflineLoc, dualLocOfflineForm} = useSelector(
    state => state.locsOffline,
  );
  const {token, userId} = useSelector(state => state.login);
  const {id} = useSelector(state => state.locations.selectedEditLocation);
  const locationOfflineId = useSelector(
    state => state.loactionsOfflineMode.selectedEditOfflineModeLocation.id,
  );
  const {mode} = useSelector(state => state.mobileMode);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MainHeader {...props} />

      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}>
        <LocText
          title={'ASSIGN Dual LOC'}
          text={'Select How You Will Assign Your LOC'}
        />

        <View style={styles.inputsContainer}>
          {mode === 'online' ? (
            <LocInfo hasStatus={true} />
          ) : (
            <LocInfoOffline hasStatus={true} />
          )}
        </View>

        <View style={styles.assignBtn}>
          <LocButton
            title={'ASSIGN Dual LOC'}
            loading={loading}
            disabled={
              mode === 'online'
                ? !(
                    dualLocForm.routeId.valid &&
                    dualLocForm.MISC.valid &&
                    dualLocForm.cableOrigin.valid &&
                    dualLocForm.filed1Origin.valid &&
                    dualLocForm.filed2Origin.valid &&
                    dualLocForm.filed3Origin.valid &&
                    dualLocForm.cableDestination.valid &&
                    dualLocForm.filed1Destination.valid &&
                    dualLocForm.filed2Destination.valid &&
                    dualLocForm.filed3Destination.valid
                  )
                : !(
                    dualLocOfflineForm.routeId.valid &&
                    dualLocOfflineForm.MISC.valid &&
                    dualLocOfflineForm.cableOrigin.valid &&
                    dualLocOfflineForm.filed1Origin.valid &&
                    dualLocOfflineForm.filed2Origin.valid &&
                    dualLocOfflineForm.filed3Origin.valid &&
                    dualLocOfflineForm.cableDestination.valid &&
                    dualLocOfflineForm.filed1Destination.valid &&
                    dualLocOfflineForm.filed2Destination.valid &&
                    dualLocOfflineForm.filed3Destination.valid
                  )
            }
            btnBackgroundColor={'#222E57'}
            txtColor={'#fff'}
            styleProp={{width: '50%'}}
            onPress={() => {
              mode === 'online'
                ? dispatch(
                    onAddingDualLoc(
                      token,
                      dualLocForm.routeId.value,
                      dualLocForm.cableOrigin.value,
                      dualLocForm.filed1Origin.value,
                      dualLocForm.filed2Origin.value,
                      dualLocForm.filed3Origin.value,
                      dualLocForm.MISC.value,
                      'dual',
                      id,
                      dualLocForm.status.value,
                      dualLocForm.cableDestination.value,
                      dualLocForm.filed1Destination.value,
                      dualLocForm.filed2Destination.value,
                      dualLocForm.filed3Destination.value,
                    ),
                  )
                : dispatch(
                    onAddingDualOfflineLoc(
                      userId,
                      dualLocOfflineForm.routeId.value,
                      dualLocOfflineForm.cableOrigin.value,
                      dualLocOfflineForm.filed1Origin.value,
                      dualLocOfflineForm.filed2Origin.value,
                      dualLocOfflineForm.filed3Origin.value,
                      dualLocOfflineForm.MISC.value,
                      'dual',
                      locationOfflineId,
                      dualLocOfflineForm.status.value,
                      dualLocOfflineForm.cableDestination.value,
                      dualLocOfflineForm.filed1Destination.value,
                      dualLocOfflineForm.filed2Destination.value,
                      dualLocOfflineForm.filed3Destination.value,
                    ),
                  );
            }}
          />
        </View>
      </ScrollView>
      <Footer bottom={0.00001} backgroundColor={'#fff'} />
    </View>
  );
}

export default NewDualLoc;

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
  map: {width: '80%', height: 300},
  latLongInputs: {
    width: '80%',
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
});
