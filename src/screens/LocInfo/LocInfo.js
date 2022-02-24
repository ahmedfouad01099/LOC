import React from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MainButton from '../../components/Button/MainButton';
import Footer from '../../components/Footor/Footer';
import LocText from '../../components/LocText/LocText';
import MainHeader from '../../components/MainHeader/MainHeader';
import {
  onFetchingOfflineLocs,
  onRenderAssignedOfflineScreen,
} from '../../store/Locs/LOCsOfflineReducer';
import {
  onFetchingLocs,
  onRenderAssignedScreen,
} from '../../store/Locs/LocsReducer';

function LocInfo(props) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.login.token);
  const {selectedEditLocation} = useSelector(state => state.locations);
  const locationOfflineId = useSelector(
    state =>
      state.loactionsOfflineMode &&
      state.loactionsOfflineMode.selectedEditOfflineModeLocation.id,
  );
  const {mode} = useSelector(state => state.mobileMode);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MainHeader {...props} />

      <LocText title={'View LOCs'} />

      <View style={{width: '100%'}}>
        <MainButton
          props={props}
          title={'View Assigned LOC'}
          txtColor={'#fff'}
          btnBackgroundColor={'#222E57'}
          styleProp={{width: '80%', marginVertical: 10}}
          txtStyle={{fontSize: 18}}
          onPress={
            mode === 'online'
              ? () => {
                  dispatch(onRenderAssignedScreen('assigned'));
                  dispatch(
                    onFetchingLocs(selectedEditLocation.id, token, 'assigned'),
                  );
                  props.navigation.navigate('view_single_dual_locs');
                }
              : () => {
                  dispatch(onRenderAssignedOfflineScreen('assigned'));
                  dispatch(
                    onFetchingOfflineLocs(locationOfflineId, 'assigned'),
                  );
                  props.navigation.navigate('view_single_dual_locs');
                }
          }
        />

        <MainButton
          props={props}
          title={'View UnAssigned LOC'}
          txtColor={'#fff'}
          btnBackgroundColor={'#222E57'}
          styleProp={{width: '80%', marginVertical: 10}}
          txtStyle={{fontSize: 18}}
          onPress={
            mode === 'online'
              ? () => {
                  dispatch(onRenderAssignedScreen('unassigned'));
                  dispatch(
                    onFetchingLocs(
                      selectedEditLocation.id,
                      token,
                      'unassigned',
                    ),
                  );
                  props.navigation.navigate('view_single_dual_locs');
                }
              : () => {
                  dispatch(onRenderAssignedOfflineScreen('unassigned'));
                  dispatch(
                    onFetchingOfflineLocs(locationOfflineId, 'unassigned'),
                  );
                  props.navigation.navigate('view_single_dual_locs');
                }
          }
        />
      </View>

      <Footer />
    </View>
  );
}

export default LocInfo;
