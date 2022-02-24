import React, {useCallback, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Footer from '../../components/Footor/Footer';
import InputText from '../../components/Inputs/InputText';
import LocCmp from '../../components/LocCmp/LocCmp';
import LocText from '../../components/LocText/LocText';
import MainHeader from '../../components/MainHeader/MainHeader';
import Spinner from '../../components/Spinner/Spinner';
import TouchableCmp from '../../constants/TouchableCmp';
import {
  onChangeRenderedOfflineItem,
  onFetchingOfflineLocs,
  onFetchingSpecificOfflineLoc,
  onSearchingOfflineLoc,
} from '../../store/Locs/LOCsOfflineReducer';
import {
  onChangeRenderedItem,
  onFetchingLocs,
  onFetchingSpecificLoc,
  onSearchingLoc,
} from '../../store/Locs/LocsReducer';

function ViewAssignedSingle(props) {
  const dispatch = useDispatch();
  const {
    singleLocs,
    assigned,
    renderedItem,
    searchSingleLocs,
    loadSearch,
    locsError,
    locsErrorMsg,
    loadingLocs,
  } = useSelector(state => state.locs);
  const {
    singleOfflineLocs,
    assignedOffline,
    renderedOfflineItem,
    searchSingleOfflineLocs,
    loadOfflineSearchSearch,
    // locsErrorMsg,
    // loadingLocs,
  } = useSelector(state => state.locsOffline);
  const token = useSelector(state => state.login.token);
  const {id} = useSelector(state => state.locations.selectedEditLocation);
  const locationOfflineId = useSelector(
    state => state.loactionsOfflineMode.selectedEditOfflineModeLocation.id,
  );
  const {mode} = useSelector(state => state.mobileMode);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      mode === 'online'
        ? assigned
          ? dispatch(onFetchingLocs(id, token, 'assigned'))
          : dispatch(onFetchingLocs(id, token, 'unassigned'))
        : assignedOffline
        ? dispatch(onFetchingOfflineLocs(locationOfflineId, 'assigned'))
        : dispatch(onFetchingOfflineLocs(locationOfflineId, 'unassigned'));
      setRefreshing(false);
    }, 500);
  }, [dispatch, refreshing]);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MainHeader
        {...props}
        onPress={
          mode === 'online'
            ? () => dispatch(onChangeRenderedItem('locs'))
            : () => dispatch(onChangeRenderedOfflineItem('locs'))
        }
      />

      <View style={{alignItems: 'center'}}>
        <LocText
          title={
            mode === 'online'
              ? assigned
                ? 'Assigned LOC Info'
                : 'UnAssigned LOC Info'
              : assignedOffline
              ? 'Assigned LOC Info'
              : 'UnAssigned LOC Info'
          }
        />
        <InputText
          styleProp={styles.TxtInput}
          placeholder={'Search'}
          imageSource={require('../../../assets/images/search_icon.png')}
          imgContainerStyle={{top: '45%'}}
          imgStyle={styles.imageStyle}
          borderColor={'#222E57'}
          onChange={
            mode === 'online'
              ? e => {
                  assigned
                    ? dispatch(onSearchingLoc(id, e, token, 'assigned'))
                    : dispatch(onSearchingLoc(id, e, token, 'unassigned'));
                }
              : e => {
                  assignedOffline
                    ? dispatch(
                        onSearchingOfflineLoc(
                          e,
                          'single',
                          'assigned',
                          locationOfflineId,
                        ),
                      )
                    : dispatch(
                        onSearchingOfflineLoc(
                          e,
                          'single',
                          'unassigned',
                          locationOfflineId,
                        ),
                      );
                }
          }
        />
      </View>
      <ScrollView
        style={{flexGrow: 1, paddingBottom: 100}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{...styles.scrollViewContainer, paddingBottom: 100, flex: 1}}>
          <View style={styles.rContainer}>
            {mode === 'online' ? (
              loadingLocs ? (
                <Spinner />
              ) : locsError ? (
                <View>
                  <Text>{locsErrorMsg}</Text>
                </View>
              ) : renderedItem === 'locs' ? (
                singleLocs && singleLocs.length > 0 ? (
                  singleLocs.map(loc => {
                    return (
                      <TouchableCmp
                        key={loc.loc_id}
                        style={{width: '100%', alignItems: 'center'}}
                        onPress={() => {
                          dispatch(onFetchingSpecificLoc(loc.loc_id, token));
                          props.navigation.navigate('single_loc_edit');
                        }}>
                        <View style={{width: '100%', alignItems: 'center'}}>
                          <LocCmp key={loc.loc_id} LocTitle={loc.route_id} />
                        </View>
                      </TouchableCmp>
                    );
                  })
                ) : (
                  <View>
                    <Text>No Locations Added Yet.</Text>
                  </View>
                )
              ) : loadSearch ? (
                <Spinner style={{paddingVertical: 10}} />
              ) : searchSingleLocs && searchSingleLocs.length > 0 ? (
                searchSingleLocs.map(loc => {
                  return (
                    <TouchableCmp
                      key={loc.loc_id}
                      style={
                        Platform.OS === 'ios'
                          ? {
                              width: '100%',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }
                          : {}
                      }
                      onPress={() => {
                        dispatch(onFetchingSpecificLoc(loc.loc_id, token));
                        props.navigation.navigate('dual_loc_edit');
                      }}>
                      <View
                        style={{
                          width: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <LocCmp key={loc.id} LocTitle={loc.route_id} />
                      </View>
                    </TouchableCmp>
                  );
                })
              ) : (
                <View>
                  <Text>LOCs Not found.</Text>
                </View>
              )
            ) : // ==> Offline View
            // loadingLocs ? (
            //   <Spinner />
            // ) : locsError ? (
            //   <View>
            //     <Text>{locsErrorMsg}</Text>
            //   </View>
            // ) :
            renderedOfflineItem === 'locs' ? (
              singleOfflineLocs && singleOfflineLocs.length > 0 ? (
                singleOfflineLocs.map(loc => {
                  return (
                    <TouchableCmp
                      key={loc.loc_id}
                      style={{width: '100%', alignItems: 'center'}}
                      onPress={() => {
                        dispatch(
                          onFetchingSpecificOfflineLoc(loc.loc_id, 'single'),
                        );
                        props.navigation.navigate('single_loc_edit');
                      }}>
                      <View style={{width: '100%', alignItems: 'center'}}>
                        <LocCmp key={loc.loc_id} LocTitle={loc.route_id} />
                      </View>
                    </TouchableCmp>
                  );
                })
              ) : (
                <View>
                  <Text>No Locations Added Yet.</Text>
                </View>
              )
            ) : // ===== Search View
            loadOfflineSearchSearch ? (
              <Spinner style={{paddingVertical: 10}} />
            ) : searchSingleOfflineLocs &&
              searchSingleOfflineLocs.length > 0 ? (
              searchSingleOfflineLocs.map(loc => {
                return (
                  <TouchableCmp
                    key={loc.loc_id}
                    style={
                      Platform.OS === 'ios'
                        ? {
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }
                        : {}
                    }
                    onPress={() => {
                      dispatch(
                        onFetchingSpecificOfflineLoc(loc.loc_id, 'single'),
                      );
                      props.navigation.navigate('dual_loc_edit');
                    }}>
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <LocCmp key={loc.id} LocTitle={loc.route_id} />
                    </View>
                  </TouchableCmp>
                );
              })
            ) : (
              <View>
                <Text>LOCs Not found.</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <Footer backgroundColor={'#fff'} bottom={0.0001} />
    </View>
  );
}

export default ViewAssignedSingle;

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
