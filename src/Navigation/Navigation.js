import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppIntro from '../screens/AppIntro/AppIntro';
import Login from '../screens/Login/Login';
import Home from '../screens/Home/Home';
// import Home from '../screens/Home/Home';
// import NFCEnable from '../screens/NFCEnable/NFCEnable';
// import Profile from '../screens/Profile/Profile';
// import SingleLoc from '../screens/SingleLoc/SingleLoc';
// import SingleLocEdit from '../screens/SingleLocEdit/SingleLocEdit';
// import DualLoc from '../screens/DualLoc/DualLoc';
// import DualLocEdit from '../screens/DualLocEdit/DualLocEdit';
// import NotAssignedLoc from '../screens/NotAssignedLoc/NotAssignedLoc';
// import WriteLoc from '../screens/WriteLoc/WriteLoc';
// import SelectLoc from '../screens/SelectLoc/SelectLoc';
// import NewSingleLoc from '../screens/NewSingleLoc/NewSingleLoc';
// import LocAssignInfo from '../screens/LocAssignInfo/LocAssignInfo';
// import LocationStatus from '../screens/LocationStatus/LocationStatus';
// import {useDispatch, useSelector} from 'react-redux';
// import {authCheckState} from '../store/Login/Login';
// import Settings from '../screens/settings/Settings';
// import Projects from '../screens/Projects/Projects';
// import LocInfo from '../screens/LocInfo/LocInfo';
// import ViewAssigned from '../screens/ViewAssigned/ViewAssigned';
// import ViewUnAssigned from '../screens/ViewUnAssigned/ViewUnAssigned';
// import ViewDualSingleLocs from '../screens/ViewDualSingleLocs/ViewDualLocs';
// import ViewAssignedSingle from '../screens/ViewAssigned/ViewAssignedSingle';
// import NewDualLoc from '../screens/NewDualLoc/NewDualLoc';
// import NFC from '../screens/NFC/NFC';

const Stack = createNativeStackNavigator();

function Navigation() {
  // const dispatch = useDispatch();
  // const token = useSelector(state => state.login.token);

  // useEffect(() => {
  //   dispatch(authCheckState());
  // }, [dispatch, token]);

  // console.log('33', token);
  console.log('42 =====');
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName={token ? 'home' : 'app_intro'}
        initialRouteName={'app_intro'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="app_intro" component={AppIntro} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="home" component={Home} />

        {/* {false ? (
          <React.Fragment>
            <Stack.Screen name="app_intro" component={AppIntro} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="settings" component={Settings} />
            <Stack.Screen name="nfc_enable" component={NFCEnable} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="single_loc" component={SingleLoc} />
            <Stack.Screen name="single_loc_edit" component={SingleLocEdit} />
            <Stack.Screen name="dual_loc" component={DualLoc} />
            <Stack.Screen name="dual_loc_edit" component={DualLocEdit} />
            <Stack.Screen name="not_assigned_loc" component={NotAssignedLoc} />
            <Stack.Screen name="write_loc" component={WriteLoc} />
            <Stack.Screen name="select_loc" component={SelectLoc} />
            <Stack.Screen name="new_single_loc" component={NewSingleLoc} />
            <Stack.Screen name="new_dual_loc" component={NewDualLoc} />
            <Stack.Screen name="loc_assign_info" component={LocAssignInfo} />
            <Stack.Screen name="projects" component={Projects} />
            <Stack.Screen name="location_status" component={LocationStatus} />
            <Stack.Screen name="loc_info" component={LocInfo} />
            <Stack.Screen
              name="view_single_dual_locs"
              component={ViewDualSingleLocs}
            />
            <Stack.Screen
              name="view_single_locs"
              component={ViewAssignedSingle}
            />
            <Stack.Screen name="view_dual_locs" component={ViewAssigned} />
            <Stack.Screen name="nfc" component={NFC} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Stack.Screen name="app_intro" component={AppIntro} />
            <Stack.Screen name="login" component={Login} />
          </React.Fragment>
        )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
