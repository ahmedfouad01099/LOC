import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Footer from '../../components/Footor/Footer';
import LocButton from '../../components/LocButton/LocButton';
import LocInfo from '../../components/LocInfo/LocInfo';
import LocInfoOffline from '../../components/LocInfo/LOCsInfoOffline';
import LocText from '../../components/LocText/LocText';
import MainHeader from '../../components/MainHeader/MainHeader';
import {onEditingDualOfflineLoc} from '../../store/Locs/LOCsOfflineReducer';
import {onEditingDualLoc} from '../../store/Locs/LocsReducer';

function DualLocEdit(props) {
  const dispatch = useDispatch();
  const {token, userId} = useSelector(state => state.login);
  const {selectedEditLocation} = useSelector(state => state.locations);
  const locationOfflineId = useSelector(
    state => state.loactionsOfflineMode.selectedEditOfflineModeLocation.id,
  );
  const {assigned, dualLocForm, specificLoc, loadEdit} = useSelector(
    state => state.locs,
  );
  const {
    loadingAddingOfflineLoc,
    dualLocOfflineForm,
    assignedOffline,
    specificOfflineLoc,
  } = useSelector(state => state.locsOffline);
  const {mode} = useSelector(state => state.mobileMode);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <MainHeader {...props} />

        <LocText
          text={
            mode === 'online'
              ? assigned
                ? 'Assigned Dual LOC'
                : 'UnAssigned Dual LOC'
              : assignedOffline
              ? 'Assigned Dual LOC'
              : 'UnAssigned Dual LOC'
          }
        />
        <View style={styles.scrollViewConatiner}>
          {mode === 'online' ? (
            <LocInfo hasStatus={true} />
          ) : (
            <LocInfoOffline hasStatus={true} />
          )}
          <View style={styles.mainBtnContainer}>
            <View style={styles.btnContainer}>
              <LocButton
                title={'Confirm'}
                loading={loadEdit}
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
                btnBackgroundColor={'#0987B1'}
                txtColor={'#fff'}
                props={props}
                onPress={
                  mode === 'online'
                    ? () => {
                        dispatch(
                          onEditingDualLoc(
                            token,
                            specificLoc.loc_id,
                            dualLocForm.routeId.value,
                            dualLocForm.cableOrigin.value,
                            dualLocForm.filed1Origin.value,
                            dualLocForm.filed2Origin.value,
                            dualLocForm.filed3Origin.value,
                            dualLocForm.MISC.value,
                            'dual',
                            selectedEditLocation.id,
                            dualLocForm.status.value,
                            dualLocForm.cableDestination.value,
                            dualLocForm.filed1Destination.value,
                            dualLocForm.filed2Destination.value,
                            dualLocForm.filed3Destination.value,
                            dualLocForm.lat.value,
                            dualLocForm.long.value,
                            dualLocForm.radius.value,
                            props,
                          ),
                        );
                      }
                    : () => {
                        dispatch(
                          onEditingDualOfflineLoc(
                            userId,
                            specificOfflineLoc.loc_id,
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
                            dualLocOfflineForm.lat.value,
                            dualLocOfflineForm.long.value,
                            dualLocOfflineForm.radius.value,
                            props,
                          ),
                        );
                      }
                }
              />

              <LocButton
                title={'Discard'}
                btnBackgroundColor={'#222D58'}
                txtColor={'#fff'}
                props={props}
                onPress={() => props.navigation.goBack()}
              />
            </View>
          </View>
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}

export default DualLocEdit;

const styles = StyleSheet.create({
  scrollViewConatiner: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 90,
  },
  mainBtnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  btnContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
