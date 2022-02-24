import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {Image, Modal, StyleSheet, Text, View} from 'react-native';
import TouchableCmp from '../../constants/TouchableCmp';
import AntDesign from 'react-native-vector-icons/AntDesign';

function MainModal({modalVisible, setModalVisible, message}) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                width: '100%',
              }}>
              <TouchableCmp
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
                onPress={() => setModalVisible(!modalVisible)}>
                <AntDesign name="closecircle" size={25} color={'222D58'} />
              </TouchableCmp>
            </View>
            <Image source={require('../../../assets/images/error-icon.png')} />
            <Text style={{marginVertical: 10, fontSize: 18, color: '222d58'}}>
              {message}
            </Text>

            <TouchableCmp>
              <View
                style={{
                  backgroundColor: '#222D58',
                  padding: 10,
                  borderRadius: 4,
                  width: 120,
                }}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                  home page
                </Text>
              </View>
            </TouchableCmp>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default MainModal;

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  modalView: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#222D58',
    borderWidth: 0.5,
    backgroundColor: '#fff',
    width: '80%',

    margin: 20,
    borderRadius: 20,
    padding: 35,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
});
