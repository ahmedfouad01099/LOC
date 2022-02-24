import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import MainButton from '../../components/Button/MainButton';
import LocText from '../../components/LocText/LocText';
import MainHeader from '../../components/MainHeader/MainHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Footer from '../../components/Footor/Footer';
import {useSelector} from 'react-redux';

function NotAssignedLoc(props) {
  const {selectedEditLocation} = useSelector(state => state.locations);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MainHeader {...props} />

      <LocText
        title={selectedEditLocation && selectedEditLocation.name + ' LOC'}
        text={'Select How You Will Assign Your LOC'}
      />

      <View style={{width: '100%'}}>
        <MainButton
          props={props}
          title={'WRITE NEW LOC INFO'}
          txtColor={'#fff'}
          btnBackgroundColor={'#222E57'}
          styleProp={{width: '80%', marginVertical: 10}}
          txtStyle={{fontSize: 18}}
          btnIcon={
            <AntDesign
              name="edit"
              size={20}
              color={'#fff'}
              style={styles.Icon}
            />
          }
          onPress={() => props.navigation.navigate('write_loc')}
        />

        <MainButton
          props={props}
          title={'SELECT LOC INFO'}
          txtColor={'#fff'}
          btnBackgroundColor={'#222E57'}
          styleProp={{width: '80%', marginVertical: 10}}
          txtStyle={{fontSize: 18}}
          btnIcon={
            <Image
              source={require('../../../assets/images/select.png')}
              style={styles.Icon}
            />
          }
          onPress={() => props.navigation.navigate('loc_info')}
        />
      </View>

      <Footer />
    </View>
  );
}

export default NotAssignedLoc;

const styles = StyleSheet.create({
  Icon: {
    marginRight: 5,
  },
});
