import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import MainButton from '../../components/Button/MainButton';
import LocText from '../../components/LocText/LocText';
import MainHeader from '../../components/MainHeader/MainHeader';
import Footer from '../../components/Footor/Footer';
import {
  onResetDualLocForm,
  onResetSingleLocForm,
} from '../../store/Locs/LocsReducer';
import {useDispatch, useSelector} from 'react-redux';
import {
  onResetDualLocOfflineForm,
  onResetSingleLocOfflineForm,
} from '../../store/Locs/LOCsOfflineReducer';

function WriteLoc(props) {
  const dispatch = useDispatch();
  const {mode} = useSelector(state => state.mobileMode);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MainHeader {...props} />

      <LocText
        title={'write loc info'}
        text={'Select How You Will Assign Your LOC'}
      />

      <View style={{width: '100%'}}>
        <MainButton
          props={props}
          title={'ASSIGN SINGLE LOC'}
          txtColor={'#fff'}
          btnBackgroundColor={'#222E57'}
          styleProp={{width: '80%', marginVertical: 10}}
          txtStyle={{fontSize: 18}}
          onPress={() => {
            mode === 'online'
              ? dispatch(onResetSingleLocForm())
              : dispatch(onResetSingleLocOfflineForm());
            props.navigation.navigate('new_single_loc');
          }}
        />

        <MainButton
          props={props}
          title={'ASSIGN Dual LOC'}
          txtColor={'#fff'}
          btnBackgroundColor={'#222E57'}
          styleProp={{width: '80%', marginVertical: 10}}
          txtStyle={{fontSize: 18}}
          onPress={() => {
            mode === 'online'
              ? dispatch(onResetDualLocForm())
              : dispatch(onResetDualLocOfflineForm());
            props.navigation.navigate('new_dual_loc');
          }}
        />
      </View>

      <Footer />
    </View>
  );
}

export default WriteLoc;

const styles = StyleSheet.create({
  Icon: {
    marginRight: 5,
  },
});
