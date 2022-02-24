import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Footer from '../../components/Footor/Footer';
import LocButton from '../../components/LocButton/LocButton';
import LocCmp from '../../components/LocCmp/LocCmp';
import MainHeader from '../../components/MainHeader/MainHeader';
import Spinner from '../../components/Spinner/Spinner';
import {KeltechLocalDB} from '../../constants/LocalDB';
import TouchableCmp from '../../constants/TouchableCmp';
import {createProjectsTable} from '../../Sql/Porjects/PorjectsSqlite';
import {onChangingMobileMode} from '../../store/MobileMode/MobileModeReducer';
import {
  onFetchingProjectsOfflineMode,
  onSelectingIdentifierOfflineId,
  onSelectingProjectOffline,
} from '../../store/Projects/ProjectsOfflineModeReducer';
import {
  onFetchingProjects,
  onSelectingProject,
} from '../../store/Projects/ProjectsReducer';

function Projects(props) {
  const dispatch = useDispatch();

  const {selectedIdentifier} = useSelector(state => state.globalIdentifier);
  const {selectedIdentifierOfflineMode} = useSelector(
    state => state.globalIdentifierOffline,
  );
  const {token} = useSelector(state => state.login);
  const {projects, loadFetchingProjects, projectError, projectErrorMsg} =
    useSelector(state => state.projects);
  const {
    projectsOfflineMode,
    loadFetchingProjectsOfflineMode,
    // projectError,
    // projectErrorMsg,
  } = useSelector(state => state.projectsOffline);
  const {mode} = useSelector(state => state.mobileMode);
  useEffect(() => {
    selectedIdentifier &&
      dispatch(onFetchingProjects(selectedIdentifier.gid, token));
  }, []);

  useEffect(() => {
    dispatch(onFetchingProjectsOfflineMode(selectedIdentifierOfflineMode.gid));
  }, [mode]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      selectedIdentifier &&
        dispatch(onFetchingProjects(selectedIdentifier.gid, token));
      setRefreshing(false);
    }, 500);
  }, [dispatch, refreshing]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MainHeader title={'Projects'} {...props} />

      <View style={{flex: 1, width: '100%'}}>
        <View
          style={{
            ...styles.scrollViewContainer,
            // marginTop: 60,
            flex: 1,
            justifyContent: 'flex-start',
          }}>
          <View style={styles.statusBtn}>
            <LocButton
              title={'Online'}
              btnBackgroundColor={mode === 'online' ? '#19B403' : '#222E57'}
              txtColor={'#fff'}
              styleProp={{width: '48%'}}
              onPress={() => {
                dispatch(onChangingMobileMode('online'));
              }}
            />

            <LocButton
              title={'Offline'}
              btnBackgroundColor={mode === 'offline' ? '#19B403' : '#222E57'}
              txtColor={'#fff'}
              styleProp={{width: '48%'}}
              onPress={() => {
                dispatch(onChangingMobileMode('offline'));
                dispatch(onFetchingProjectsOfflineMode(selectedIdentifier.gid));
              }}
            />
          </View>

          <ScrollView
            style={{flexGrow: 1, width: '100%'}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.locContainer}>
              <Text
                style={{textAlign: 'center', fontSize: 18, marginBottom: 10}}>
                {selectedIdentifier ? selectedIdentifier.name : 'Projects'}
              </Text>
              {mode === 'offline' ? (
                projectsOfflineMode &&
                projectsOfflineMode.length > 0 &&
                projectsOfflineMode.map(project => {
                  console.log('124 project data', project);
                  return (
                    <TouchableCmp
                      key={project.id}
                      style={
                        Platform.OS === 'ios'
                          ? {width: '100%', alignItems: 'center'}
                          : {}
                      }
                      onPress={() => {
                        mode === 'online'
                          ? dispatch(onSelectingProject(project.id))
                          : dispatch(onSelectingProjectOffline(project.id));
                        props.navigation.navigate('location_status');
                      }}>
                      <View
                        style={{
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <LocCmp LocTitle={project.name} />
                      </View>
                    </TouchableCmp>
                  );
                })
              ) : loadFetchingProjects ? (
                <Spinner style={{paddingVertical: 10}} />
              ) : projectError ? (
                <View>
                  <Text>{projectErrorMsg}</Text>
                </View>
              ) : projects && projects.length > 0 ? (
                projects.map(project => {
                  return (
                    <TouchableCmp
                      key={project.id}
                      style={
                        Platform.OS === 'ios'
                          ? {width: '100%', alignItems: 'center'}
                          : {}
                      }
                      onPress={() => {
                        dispatch(onSelectingProject(project.id));
                        props.navigation.navigate('location_status');
                      }}>
                      <View
                        style={{
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <LocCmp LocTitle={project.name} />
                      </View>
                    </TouchableCmp>
                  );
                })
              ) : (
                <View>
                  <Text style={{textAlign: 'center'}}>
                    No Projects Added Yet.
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
      <Footer backgroundColor={'#fff'} position={'relative'} bottom={0} />
    </View>
  );
}

export default Projects;

const styles = StyleSheet.create({
  scrollViewContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBtn: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
