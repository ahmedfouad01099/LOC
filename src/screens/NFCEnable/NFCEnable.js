import React, {useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Footer from '../../components/Footor/Footer';
import MainHeader from '../../components/MainHeader/MainHeader';
import TouchableCmp from '../../constants/TouchableCmp';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';
import {useDispatch} from 'react-redux';
import {onReadingNfcInfo} from '../../store/NfcInfo/NfcInfo';
import LottieView from 'lottie-react-native';

function NFCEnable(props) {
  const dispatch = useDispatch();
  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      console.log('try');
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.warn('Tag found', tag);
      console.warn('Tag found', tag.ndefMessage[0].payload);
      if (tag) {
        dispatch(onReadingNfcInfo(tag, props));
      }
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  async function readMifare() {
    let mifarePages = [];

    try {
      // STEP 1
      let reqMifare = await NfcManager.requestTechnology(
        NfcTech.MifareUltralight,
      );

      const readLength = 60;
      const mifarePagesRead = await Promise.all(
        [...Array(readLength).keys()].map(async (_, i) => {
          const pages = await NfcManager.mifareUltralightHandlerAndroid // STEP 2
            .mifareUltralightReadPages(i * 4); // STEP 3
          mifarePages.push(pages);
        }),
      );

      console.log('60', mifarePagesRead);
    } catch (ex) {
      console.warn(ex);
    } finally {
      // STEP 4
      NfcManager.cancelTechnologyRequest();
    }

    return mifarePages;
  }

  async function writeNdef({type, value}) {
    let result = false;

    try {
      // STEP 1
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const bytes = Ndef.encodeMessage([Ndef.textRecord('Hello NFC')]);

      if (bytes) {
        await NfcManager.ndefHandler // STEP 2
          .writeNdefMessage(bytes); // STEP 3
        result = true;
      }
    } catch (ex) {
      console.warn(ex);
    } finally {
      // STEP 4
      NfcManager.cancelTechnologyRequest();
    }

    return result;
  }
  const [state, setState] = useState({log: 'Ready...', text: ''});

  // Outside example
  const readData = async () => {
    try {
      let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
      let resp = await NfcManager.requestTechnology(tech, {
        alertMessage: 'Ready to do some custom Mifare cmd!',
      });

      let cmd =
        Platform.OS === 'ios'
          ? NfcManager.sendMifareCommandIOS
          : NfcManager.transceive;

      resp = await cmd([0x3a, 4, 4]);
      let payloadLength = parseInt(resp.toString().split(',')[1]);
      let payloadPages = Math.ceil(payloadLength / 4);
      let startPage = 5;
      let endPage = startPage + payloadPages - 1;

      resp = await cmd([0x3a, startPage, endPage]);
      bytes = resp.toString().split(',');
      let text = '';

      for (let i = 0; i < bytes.length; i++) {
        if (i < 5) {
          continue;
        }

        if (parseInt(bytes[i]) === 254) {
          break;
        }

        text = text + String.fromCharCode(parseInt(bytes[i]));
      }

      setState({
        log: text,
      });
    } catch (ex) {
      setState({
        log: ex.toString(),
      });
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  };

  const writeData = async () => {
    if (!state.text) {
      Alert.alert('Nothing to write');
      return;
    }
    try {
      let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
      let resp = await NfcManager.requestTechnology(tech, {
        alertMessage: 'Ready to do some custom Mifare cmd!',
      });

      let text = state.text;
      let fullLength = text.length + 7;
      let payloadLength = text.length + 3;

      let cmd =
        Platform.OS === 'ios'
          ? NfcManager.sendMifareCommandIOS
          : NfcManager.transceive;

      resp = await cmd([0xa2, 0x04, 0x03, fullLength, 0xd1, 0x01]); // 0x0C is the length of the entry with all the fluff (bytes + 7)
      resp = await cmd([0xa2, 0x05, payloadLength, 0x54, 0x02, 0x65]); // 0x54 = T = Text block, 0x08 = length of string in bytes + 3

      let currentPage = 6;
      let currentPayload = [0xa2, currentPage, 0x6e];

      for (let i = 0; i < text.length; i++) {
        currentPayload.push(text.charCodeAt(i));
        if (currentPayload.length == 6) {
          resp = await cmd(currentPayload);
          currentPage += 1;
          currentPayload = [0xa2, currentPage];
        }
      }

      // close the string and fill the current payload
      currentPayload.push(254);
      while (currentPayload.length < 6) {
        currentPayload.push(0);
      }

      resp = await cmd(currentPayload);

      setState({
        log: resp.toString(),
      });
    } catch (ex) {
      setState({
        log: ex.toString(),
      });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MainHeader {...props} />
      <View style={{...styles.txtsConatiner, paddingBottom: 100}}>
        <ScrollView style={{flexGrow: 1}}>
          <TextInput
            style={styles.textInput}
            onChangeText={txt => setState({text: txt})}
            autoCompleteType="off"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#888888"
            placeholder="Enter text here"
          />

          <TouchableOpacity
            style={styles.buttonWrite}
            onPress={() => writeNdef()}>
            <Text style={styles.buttonText}>Write</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonRead}
            onPress={() => readMifare()}>
            <Text style={styles.buttonText}>Read</Text>
          </TouchableOpacity>

          <View style={styles.log}>
            <Text>{state.log}</Text>
          </View>

          <View>
            <Text style={{...styles.txt, fontSize: 13, marginBottom: 15}}>
              Enable NFC on your mobile device
            </Text>
            <Text style={{...styles.txt, fontSize: 20}}>
              Hold LOC to Your Mobile Device
            </Text>
            <Text
              style={{
                ...styles.txt,
                fontSize: 16,
                fontWeight: 'normal',
                marginTop: 10,
              }}>
              Scanning will be automatically
            </Text>
          </View>

          <TouchableCmp onPress={() => readNdef()}>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {Platform.OS === 'android' ? (
                <View style={{width: '100%'}}>
                  <LottieView
                    style={{width: '100%'}}
                    source={require('../../../assets/animation.json')}
                    autoPlay
                    loop
                  />
                </View>
              ) : null}

              {Platform.OS === 'ios' ? (
                <Image source={require('../../../assets/images/LOCv2.png')} />
              ) : null}
            </View>
          </TouchableCmp>
        </ScrollView>
      </View>
      <Footer bottom={0.0001} backgroundColor={'#fff'} />
    </View>
  );
}

export default NFCEnable;

const styles = StyleSheet.create({
  txtsConatiner: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  txt: {textAlign: 'center', fontWeight: 'bold'},

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textInput: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    height: 50,
    textAlign: 'center',
    color: 'black',
  },
  buttonWrite: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#9D2235',
  },
  buttonRead: {
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#006C5B',
  },
  buttonText: {
    color: '#ffffff',
  },
  log: {
    marginTop: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
