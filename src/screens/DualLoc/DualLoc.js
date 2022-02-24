import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import Footer from '../../components/Footor/Footer';
import LocButton from '../../components/LocButton/LocButton';
import LocInfo from '../../components/LocInfo/LocInfo';
import LocInfoOffline from '../../components/LocInfo/LOCsInfoOffline';
import LocText from '../../components/LocText/LocText';
import MainHeader from '../../components/MainHeader/MainHeader';
// import MainModal from '../../components/MainModal/MainModal';

function DualLoc(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const {mode} = useSelector(state => state.mobileMode);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <MainHeader {...props} />

        <LocText text={'Assigned Dual LOC'} />
        <View style={styles.scrollViewContainer}>
          {mode === 'online' ? <LocInfo /> : <LocInfoOffline />}
        </View>

        <View style={styles.mainBtnContainer}>
          <View style={styles.btnContainer}>
            <LocButton
              title={'Search origin'}
              btnBackgroundColor={'#0987B1'}
              txtColor={'#fff'}
              props={props}
              onPress={() => setModalVisible(true)}
            />

            <LocButton
              title={'show Destination'}
              btnBackgroundColor={'#222D58'}
              txtColor={'#fff'}
              props={props}
            />
          </View>
        </View>
        {/* <MainModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          message={'UNABLE TO CONNECT TO SERVER (CHECK NETWORK)'}
        /> */}
        <Footer bottom={0.000001} />
      </ScrollView>
    </View>
  );
}

export default DualLoc;

const styles = StyleSheet.create({
  scrollViewContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBtnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  btnContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
