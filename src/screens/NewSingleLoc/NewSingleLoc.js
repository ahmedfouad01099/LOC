import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Footer from '../../components/Footor/Footer';
import LocButton from '../../components/LocButton/LocButton';
import LocInput from '../../components/LocInptut/LocInput';
import LocText from '../../components/LocText/LocText';
import MainHeader from '../../components/MainHeader/MainHeader';
import {onAddingSingleLoc} from '../../store/Locs/LocsReducer';
import {useDispatch, useSelector} from 'react-redux';
import LocInfo from '../../components/LocInfo/LocInfo';
import {onAddingSingleOfflineLoc} from '../../store/Locs/LOCsOfflineReducer';
import LocInfoOffline from '../../components/LocInfo/LOCsInfoOffline';

function NewSingleLoc(props) {
  const dispatch = useDispatch();
  const {token, userId} = useSelector(state => state.login);
  const {id} = useSelector(state => state.locations.selectedEditLocation);
  const locationOfflineId = useSelector(
    state => state.loactionsOfflineMode.selectedEditOfflineModeLocation.id,
  );
  const {loading, singleLocForm} = useSelector(state => state.locs);
  const {loadingAddingOfflineLoc, singleLocOfflineForm} = useSelector(
    state => state.locsOffline,
  );
  const {mode} = useSelector(state => state.mobileMode);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MainHeader {...props} />

      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}>
        <LocText
          title={'ASSIGN SINGLE LOC'}
          text={'Select How You Will Assign Your LOC'}
        />

        <View style={styles.inputsContainer}>
          {mode === 'online' ? (
            <LocInfo singleLoc={true} hasStatus={true} />
          ) : (
            <LocInfoOffline singleLoc={true} hasStatus={true} />
          )}

          <View style={{...styles.assignBtn}}>
            <LocButton
              title={'ASSIGN SINGLE LOC'}
              loading={loading}
              disabled={
                mode === 'online'
                  ? !(
                      singleLocForm.routeId.valid &&
                      singleLocForm.origin.valid &&
                      singleLocForm.MISC.valid &&
                      singleLocForm.filed1.valid &&
                      singleLocForm.filed2.valid &&
                      singleLocForm.filed3.valid
                    )
                  : !(
                      singleLocOfflineForm.routeId.valid &&
                      singleLocOfflineForm.origin.valid &&
                      singleLocOfflineForm.MISC.valid &&
                      singleLocOfflineForm.filed1.valid &&
                      singleLocOfflineForm.filed2.valid &&
                      singleLocOfflineForm.filed3.valid
                    )
              }
              btnBackgroundColor={'#222E57'}
              txtColor={'#fff'}
              styleProp={{width: '50%'}}
              onPress={() => {
                mode === 'online'
                  ? dispatch(
                      onAddingSingleLoc(
                        token,
                        singleLocForm.routeId.value,
                        singleLocForm.origin.value,
                        singleLocForm.filed1.value,
                        singleLocForm.filed2.value,
                        singleLocForm.filed3.value,
                        singleLocForm.MISC.value,
                        'single',
                        id,
                        singleLocForm.status.value,
                        props,
                      ),
                    )
                  : dispatch(
                      onAddingSingleOfflineLoc(
                        userId,
                        singleLocOfflineForm.routeId.value,
                        singleLocOfflineForm.origin.value,
                        singleLocOfflineForm.filed1.value,
                        singleLocOfflineForm.filed2.value,
                        singleLocOfflineForm.filed3.value,
                        singleLocOfflineForm.MISC.value,
                        'single',
                        locationOfflineId,
                        singleLocOfflineForm.status.value,
                        props,
                      ),
                    );
              }}
            />
          </View>
        </View>
      </ScrollView>
      <Footer bottom={0.000001} backgroundColor={'#fff'} />
    </View>
  );
}

export default NewSingleLoc;

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
