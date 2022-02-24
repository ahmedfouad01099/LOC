import React from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MainButton from '../../components/Button/MainButton';
import Footer from '../../components/Footor/Footer';
import LocText from '../../components/LocText/LocText';
import MainHeader from '../../components/MainHeader/MainHeader';

function ViewDualSingleLocs(props) {
  const {assigned} = useSelector(state => state.locs);
  const {mode} = useSelector(state => state.mobileMode);
  const {assignedOffline} = useSelector(state => state.locsOffline);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MainHeader {...props} />

      <LocText
        title={
          mode === 'online'
            ? assigned
              ? 'View Assigned LOCs'
              : 'View UnAssigned LOCs'
            : assignedOffline
            ? 'View Assigned LOCs'
            : 'View UnAssigned LOCs'
        }
      />

      <View style={{width: '100%'}}>
        <MainButton
          props={props}
          title={'View Single LOCs'}
          txtColor={'#fff'}
          btnBackgroundColor={'#222E57'}
          styleProp={{width: '80%', marginVertical: 10}}
          txtStyle={{fontSize: 18}}
          onPress={() => {
            props.navigation.navigate('view_single_locs');
          }}
        />

        <MainButton
          props={props}
          title={'View Dual LOCs'}
          txtColor={'#fff'}
          btnBackgroundColor={'#222E57'}
          styleProp={{width: '80%', marginVertical: 10}}
          txtStyle={{fontSize: 18}}
          onPress={() => {
            props.navigation.navigate('view_dual_locs');
          }}
        />
      </View>

      <Footer />
    </View>
  );
}

export default ViewDualSingleLocs;
