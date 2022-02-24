import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import Footer from '../../components/Footor/Footer';
import InputText from '../../components/Inputs/InputText';
import LocCmp from '../../components/LocCmp/LocCmp';
import LocText from '../../components/LocText/LocText';
import MainHeader from '../../components/MainHeader/MainHeader';

function ViewUnAssigned(props) {
  const {locations} = useSelector(state => state.locations);
  console.log('12', props);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MainHeader {...props} />

      <ScrollView style={{flexGrow: 1, marginBottom: 100}}>
        <LocText title={'Unassigned LOC Info'} />

        <View style={styles.scrollViewContainer}>
          {/* <InputText
            styleProp={styles.TxtInput}
            placeholder={'Search'}
            imageSource={require('../../../assets/images/search_icon.png')}
            imgContainerStyle={{top: '45%'}}
            imgStyle={styles.imageStyle}
            borderColor={'#222E57'}
          /> */}

          <View style={styles.rContainer}>
            {locations && locations.length > 0 ? (
              locations.map(location => {
                return <LocCmp key={location.id} LocTitle={location.name} />;
              })
            ) : (
              <View>
                <Text>No Locations Added Yet.</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}

export default ViewUnAssigned;

const styles = StyleSheet.create({
  scrollViewContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TxtInput: {
    borderColor: '#707070',
    width: '80%',
    borderWidth: 1,
    padding: 25,
    paddingVertical: 13,
    borderRadius: 4,
    marginTop: 9,
    paddingLeft: 30,
    fontSize: Platform.OS === 'ios' ? 18 : 15,
  },
  rContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  imageStyle: {width: 20, height: 20, padding: 10, marginLeft: 15},
});
