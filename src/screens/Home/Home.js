import React, {useRef, useState} from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import TabButton from '../../components/TabBar/TabButton';
import TouchableCmp from '../../constants/TouchableCmp';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import OverlayView from './OverlayView/OverlayView';
// import {onLogout} from '../../store/Login/Login';
import {useDispatch} from 'react-redux';
// import Profile from '../Profile/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createIdentifierTable,
  dropIdentifierTable,
} from '../../Sql/Identifiers/IdentifiersSqlite';
import {
  createLocationTable,
  dropLocationTable,
} from '../../Sql/Locations/LocationsSqlite';
import {
  createProjectsTable,
  dropProjectTable,
} from '../../Sql/Porjects/PorjectsSqlite';
import {
  createDualLOCsTable,
  dropDualTable,
} from '../../Sql/DualLOCs/DualLOCsSqlite';
import {
  createSingleLOCsTable,
  dropSingleTable,
} from '../../Sql/SingleLOCs/SingleLOCsSqlite';

function Home(props) {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState('Home');
  const [showMenu, setShowMenu] = useState(false);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  const showMenuHandler = () => {
    Animated.timing(scaleValue, {
      toValue: showMenu ? 1 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(offsetValue, {
      toValue: showMenu ? 0 : 280,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(closeButtonOffset, {
      toValue: !showMenu ? 0 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setShowMenu(!showMenu);
  };

  console.log('43', currentTab);
  return (
    <View style={styles.container}>
      <View style={styles.kelTechImgContainer}>
        <View style={styles.colseBtnContainer}>
          <TouchableCmp onPress={() => showMenuHandler()}>
            <View style={styles.closeView}>
              <AntDesign name="close" color="#fff" size={25} />
            </View>
          </TouchableCmp>
        </View>
        <Image
          source={require('../../../assets/images/1.png')}
          style={styles.kelTechImg}
        />
        {/* Tab Bar Buttons */}
        <View style={styles.tabBarButtons}>
          <TabButton
            title={'Home'}
            txtColor={'#222E57'}
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
            Icon={
              <AntDesign
                color={currentTab === 'Home' ? '#fff' : '#222E57'}
                size={24}
                name="home"
                style={{marginRight: 5}}
              />
            }
            onPress={() => showMenuHandler()}
          />
          <TabButton
            title={'Settings'}
            txtColor={'#222E57'}
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
            Icon={
              <AntDesign
                color={currentTab === 'Settings' ? '#fff' : '#222E57'}
                size={24}
                name="setting"
                style={{marginRight: 5}}
              />
            }
            onPress={() => showMenuHandler()}
          />
          <TabButton
            title={'Locations'}
            txtColor={'#222E57'}
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
            Icon={
              <Entypo
                color={currentTab === 'Locations' ? '#fff' : '#222E57'}
                size={24}
                name="location"
                style={{marginRight: 5}}
              />
            }
            onPress={() => {
              AsyncStorage.getItem('locationTableCreated').then(res => {
                console.log('109', res);
                if (res === 'true') {
                  return;
                } else {
                  createLocationTable();
                  // dropLocationTable();
                }
              });
              AsyncStorage.getItem('identifierTableCreated').then(res => {
                console.log('117', res);
                if (res === 'true') {
                  return;
                } else {
                  createIdentifierTable();
                  // dropIdentifierTable();
                }
              });
              AsyncStorage.getItem('projectTableCreated').then(res => {
                if (res === 'true') {
                  return;
                } else {
                  createProjectsTable();
                  // dropProjectTable();
                }
              });
              AsyncStorage.getItem('dualTableCreated').then(res => {
                if (res === 'true') {
                  return;
                } else {
                  createDualLOCsTable();
                  // dropDualTable();
                }
              });
              AsyncStorage.getItem('singleTableCreated').then(res => {
                if (res === 'true') {
                  return;
                } else {
                  createSingleLOCsTable();
                  // dropSingleTable();
                }
              });

              showMenuHandler();
            }}
          />
          <TabButton
            title={'Profile'}
            txtColor={'#222E57'}
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
            Icon={
              <Ionicons
                color={currentTab === 'Profile' ? '#fff' : '#222E57'}
                size={24}
                name="person"
                style={{marginRight: 5}}
              />
            }
            onPress={() => showMenuHandler()}
          />

          <View style={styles.poweredByContainer}>
            <View style={{width: '100%', padding: 10}}>
              <TouchableCmp
                style={styles.logoutBtn}
                // onPress={() => dispatch(onLogout(props))}
              >
                <Text style={styles.logoutTxt}>Log out</Text>
              </TouchableCmp>
            </View>
          </View>

          <View style={styles.poweredBy}>
            <Text>Powered By</Text>
            <View style={{width: 100, height: 100}}>
              <Image
                source={require('../../../assets/images/1.png')}
                style={{width: '100%', height: '100%', resizeMode: 'contain'}}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Overlay View */}

      {/* {currentTab === 'Home' ? (
        <OverlayView
          showMenu={showMenu}
          scaleValue={scaleValue}
          offsetValue={offsetValue}
          closeButtonOffset={closeButtonOffset}
          showMenuHandler={showMenuHandler}
          currentTab={currentTab}
          props={props}
        />
      ) : null}

      {currentTab === 'Settings' ? (
        <OverlayView
          showMenu={showMenu}
          scaleValue={scaleValue}
          offsetValue={offsetValue}
          closeButtonOffset={closeButtonOffset}
          showMenuHandler={showMenuHandler}
          currentTab={currentTab}
          props={props}
        />
      ) : null}

      {currentTab === 'Profile' ? (
        <OverlayView
          showMenu={showMenu}
          scaleValue={scaleValue}
          offsetValue={offsetValue}
          closeButtonOffset={closeButtonOffset}
          showMenuHandler={showMenuHandler}
          currentTab={currentTab}
          props={props}
        />
      ) : null}

      {currentTab === 'Locations' ? (
        <OverlayView
          showMenu={showMenu}
          scaleValue={scaleValue}
          offsetValue={offsetValue}
          closeButtonOffset={closeButtonOffset}
          showMenuHandler={showMenuHandler}
          currentTab={currentTab}
          props={props}
        />
      ) : null} */}
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  logoutBtn: {
    backgroundColor: '#222E57',
    width: '100%',
    fontSize: 10,
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 4,
  },
  logoutTxt: {
    textAlign: 'center',
    color: '#fff',
  },
  colseBtnContainer: {
    width: '65%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  closeView: {
    padding: 5,
    backgroundColor: '#222E57',
    marginTop: 15,
    borderRadius: 5,
  },
  kelTechImgContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    width: '100%',
  },
  kelTechImg: {
    marginTop: 10,
    width: 180,
    resizeMode: 'contain',
    height: 100,
  },
  tabBarButtons: {
    width: '90%',
    marginTop: 20,
    flex: 1,
  },
  poweredByContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '15%',
  },
  poweredBy: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: '0%',
  },
});
