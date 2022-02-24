import React from 'react';
import {ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Footer from '../../components/Footor/Footer';
import LocButton from '../../components/LocButton/LocButton';
import LocInfo from '../../components/LocInfo/LocInfo';
import LocInfoOffline from '../../components/LocInfo/LOCsInfoOffline';
import LocText from '../../components/LocText/LocText';
import MainHeader from '../../components/MainHeader/MainHeader';
import {onEditingSingleOfflineLoc} from '../../store/Locs/LOCsOfflineReducer';
import {onEditingSingleLoc} from '../../store/Locs/LocsReducer';

function SingleLocEdit(props) {
  const dispatch = useDispatch();

  const {token, userId} = useSelector(state => state.login);
  const {specificLoc, singleLocForm, assigned, loadEdit} = useSelector(
    state => state.locs,
  );

  const {
    singleLocOfflineForm,
    singleOfflineLocs,
    assignedOffline,
    specificOfflineLoc,
    // renderedItem,
    // searchSingleLocs,
    // loadSearch,
    // locsError,
    // locsErrorMsg,
    // loadingLocs,
  } = useSelector(state => state.locsOffline);
  const {id} = useSelector(state => state.locations.selectedEditLocation);
  const locationOfflineId = useSelector(
    state => state.loactionsOfflineMode.selectedEditOfflineModeLocation.id,
  );
  const {mode} = useSelector(state => state.mobileMode);
  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <MainHeader {...props} />

        <LocText
          text={
            mode === 'online'
              ? assigned
                ? 'Assigned Single LOC'
                : 'UnAssigned Single LOC'
              : assignedOffline
              ? 'Assigned Single LOC'
              : 'UnAssigned Single LOC'
          }
        />
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 90,
          }}>
          {mode === 'online' ? (
            <LocInfo singleLoc={true} hasStatus={true} />
          ) : (
            <LocInfoOffline singleLoc={true} hasStatus={true} />
          )}
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LocButton
              title={'Edit LOC Info'}
              loading={loadEdit}
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
              btnBackgroundColor={'#222D58'}
              txtColor={'#fff'}
              onPress={
                mode === 'online'
                  ? () =>
                      dispatch(
                        onEditingSingleLoc(
                          token,
                          specificLoc.loc_id,
                          singleLocForm.routeId.value,
                          singleLocForm.origin.value,
                          singleLocForm.filed1.value,
                          singleLocForm.filed2.value,
                          singleLocForm.filed3.value,
                          singleLocForm.MISC.value,
                          'single',
                          id,
                          singleLocForm.status.value,
                        ),
                      )
                  : () =>
                      dispatch(
                        onEditingSingleOfflineLoc(
                          userId,
                          specificOfflineLoc.loc_id,
                          singleLocOfflineForm.routeId.value,
                          singleLocOfflineForm.origin.value,
                          singleLocOfflineForm.filed1.value,
                          singleLocOfflineForm.filed2.value,
                          singleLocOfflineForm.filed3.value,
                          singleLocOfflineForm.MISC.value,
                          'single',
                          locationOfflineId,
                          singleLocOfflineForm.status.value,
                        ),
                      )
              }
            />
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}

export default SingleLocEdit;
