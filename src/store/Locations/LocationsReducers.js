import {inserDualLOCsValues} from '../../Sql/DualLOCs/DualLOCsSqlite';
import {inserIdentifierValues} from '../../Sql/Identifiers/IdentifiersSqlite';
import {inserLocationtValues} from '../../Sql/Locations/LocationsSqlite';
import {inserProjectsValues} from '../../Sql/Porjects/PorjectsSqlite';
import {inserSingleLOCsValues} from '../../Sql/SingleLOCs/SingleLOCsSqlite';
import {checkValidity, updateObject} from '../../util/utility';

const CHANGE_LOCATION_INPUT_HANDLER =
  'KELTECH/STORE/LOCATIONS/CHANGE_LOCATION_INPUT_HANDLER';

const START_FETCHING_LOCATIONS =
  'KELTECH/STORE/LOCATION/START_FETCHING_LOCATIONS';
const FINISH_FETCHING_LOCATIONS =
  'KELTECH/STORE/LOCATION/FINISH_FETCHING_LOCATIONS';

const SELECT_EDIT_LOCATION = 'KELTECH/STORE/LOCATIONS/SELECT_EDIT_LOCATION';

const SEARCH_INPUT_CHANGE_HANDLER =
  'KELTECH/STORE/LOCATION/SEARCH_INPUT_CHANGE_HANDLER';

const START_SEARCHING_LOCATION =
  'KELTECH/LOACTION/LOCATION/START_SEARCH_LOCATION';
const FINISH_SEARCHING_LOCATION =
  'KELTECH/STORE/LOCATION/FINISH_SEARCH_LOCATION';

const CHANGE_RENDERED_ITEM = 'KELTECH/STORE/LOCATIONS/CHANGE_RENDER_ITEM';

// /api/locations/:id/download
const START_DOWNLOADING_LOCATION_INFO =
  'KELTECH/STORE/LOACTIONS/START_DOWNLOADING_LOACTION_INFO';
const FINISH_DOWNLOADING_LOCATION_INFO =
  'KELTECH/STORE/LOACTIONS/FINISH_DOWNLOADING_LOACTION_INFO';

const ADD_OFFLINE_LOCATIONS = 'KELTECH/STORE/LOCATIONS/ADD_OFFLINE_LOCATIONS';

const initialState = {
  locations: [],
  loadLocations: false,

  selectedEditLocation: {},

  loadDelete: false,

  searchForm: {
    textVal: {
      value: '',
      valid: false,
      validation: {
        // required: true,
        isEmail: true,
      },
      validationError: 'Required',
      touched: false,
    },
  },

  searchResult: [],
  loadSearch: false,

  renderedItem: 'locations',

  locationError: false,
  locationErrorMsg: '',

  downloadedData: {},
  loadDownloadingData: false,

  offlineLocation: [],
  loadingOfflineLocation: false,
};

export const onChangeLocationInputs = (text, inputIdentifier) => {
  return {type: CHANGE_LOCATION_INPUT_HANDLER, text, inputIdentifier};
};

const changeLocationInputs = (state, action) => {
  const updatedLocationForm = updateObject(state.locationForm, {
    [action.inputIdentifier]: updateObject(
      state.locationForm[action.inputIdentifier],
      {
        value: action.text,
        valid: checkValidity(
          action.text,
          state.locationForm[action.inputIdentifier] &&
            state.locationForm[action.inputIdentifier].validation,
        ),
        touched: true,
      },
    ),
  });

  return updateObject(state, {
    ...state,
    locationForm: updatedLocationForm,
  });
};

// =============================================================
export const onStartFetchingLocations = () => {
  return {type: START_FETCHING_LOCATIONS};
};

const startFetchingLocations = (state, action) => {
  return updateObject(state, {loadLocations: true});
};

export const onFetchingLocations = (id, token) => {
  return dispatch => {
    dispatch(onStartFetchingLocations());
    fetch(`http://18.189.156.89:3000/api/projects/${id}/locations`, {
      headers: {Authorization: `Bearer ${token}`},
    })
      .then(res => res.json())
      .then(resData => {
        console.log(resData);
        dispatch(onFinishFetchingLocations(resData.locations));
      })
      .catch(err => {
        dispatch(onFinishFetchingLocations([], 'Netwrok request failed.'));
      });
  };
};

export const onFinishFetchingLocations = (locations, err) => {
  return {type: FINISH_FETCHING_LOCATIONS, locations, err};
};

const finishFetchingLocations = (state, action) => {
  if (action.err) {
    return updateObject(state, {
      loadLocations: false,
      locationError: true,
      locationErrorMsg: action.err,
    });
  } else {
    return updateObject(state, {
      loadLocations: false,
      locations: action.locations,
      locationError: false,
    });
  }
};
// =============================================================

export const onSelectingLocation = locationId => {
  return {type: SELECT_EDIT_LOCATION, locationId};
};

const selectingLocation = (state, action) => {
  if (state.locations) {
    const locations = [...state.locations];
    const selectedEditLocation = locations.find(
      location => location.id.toString() === action.locationId.toString(),
    );
    console.log('213', selectedEditLocation);
    return updateObject(state, {selectedEditLocation: selectedEditLocation});
  } else {
    return 'null';
  }
};
// =============================================================

export const onChangeSearchVal = (text, inputIdentifier) => {
  return {
    type: SEARCH_INPUT_CHANGE_HANDLER,
    text: text,
    inputIdentifier,
  };
};

const searchInputChangeHandler = (state, action) => {
  const updatedSearchForm = updateObject(state.searchForm, {
    [action.inputIdentifier]: updateObject(
      state.searchForm[action.inputIdentifier],
      {
        value: action.text,
        valid: checkValidity(
          action.text,
          state.searchForm[action.inputIdentifier] &&
            state.searchForm[action.inputIdentifier].validation,
        ),
        touched: true,
      },
    ),
  });

  return updateObject(state, {
    ...state,
    searchForm: updatedSearchForm,
  });
};
// =============================================================

export const onStartSearchingLocation = () => {
  return {type: START_SEARCHING_LOCATION};
};

const startSearchingLocation = (state, action) => {
  return updateObject(state, {loadSearch: true});
};

export const onSearchingLocation = (text, token, id) => {
  console.log('390', token);
  return dispatch => {
    dispatch(onStartSearchingLocation());
    fetch(
      `http://18.189.156.89:3000/api/projects/${id}/locations?name=${text}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then(res => {
        return res.json();
      })
      .then(resData => {
        console.log('api searching location', resData);
        dispatch(onFinishSearchingLocation(resData.locations));
        console.log('396', text);
        if (text === '') {
          dispatch(onChangeRenderedItem('locations'));
        } else {
          dispatch(onChangeRenderedItem('searchResult'));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const onFinishSearchingLocation = location => {
  return {type: FINISH_SEARCHING_LOCATION, location};
};

const finishSearchingLocation = (state, action) => {
  return updateObject(state, {
    loadSearch: false,
    searchResult: action.location,
  });
};
// =============================================================

export const onChangeRenderedItem = item => {
  return {type: CHANGE_RENDERED_ITEM, item};
};

const changeReneredItem = (state, action) => {
  return updateObject(state, {renderedItem: action.item});
};

// =============================================================

const onStartDownloadingLoactionInfo = () => {
  return {type: START_DOWNLOADING_LOCATION_INFO};
};

const startDownloadingLocationInfo = (state, action) => {
  return updateObject(state, {loadDownloadingData: true});
};

export const onDownloadingLocationData = (locationId, token) => {
  console.log('location id', locationId);
  return dispatch => {
    dispatch(onStartDownloadingLoactionInfo());
    fetch(
      `http://18.189.156.89:3000/api/locations/${locationId}/download`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then(res => {
        return res.json();
      })
      .then(resData => {
        console.log('470', resData);
        dispatch(onFinishDownloadingLocationInfo(resData));

        if (resData.globalIdentifier) {
          inserIdentifierValues(
            resData.globalIdentifier.gid,
            resData.globalIdentifier.name,
            resData.globalIdentifier.sync,
            resData.globalIdentifier.createdAt,
            resData.globalIdentifier.updatedAt,
          );

          inserLocationtValues(
            resData.location.id,
            resData.location.name,
            resData.location.longitude,
            resData.location.latitude,
            resData.location.radius,
            resData.location.sync,
            resData.location.createdAt,
            resData.location.updatedAt,
            resData.location.project_id,
          );

          inserProjectsValues(
            resData.project.id,
            resData.project.name,
            resData.project.longitude,
            resData.project.latitude,
            resData.project.radius,
            resData.project.sync,
            resData.project.createdAt,
            resData.project.updatedAt,
            resData.project.gid,
          );

          resData.singleLOCs &&
            resData.singleLOCs.map(loc => {
              inserSingleLOCsValues(
                loc.loc_id,
                loc.route_id,
                loc.origin,
                loc.field_1,
                loc.field_2,
                loc.field_3,
                loc.MISC,
                loc.cable_status,
                loc.LOC_type,
                loc.sync,
                loc.createdAt,
                loc.updatedAt,
                loc.user_id,
                loc.location_id,
                (loc.updated = false),
                (loc.created = false),
              );
            });

          resData.dualLOCs &&
            resData.dualLOCs.map(loc => {
              inserDualLOCsValues(
                loc.loc_id,
                loc.route_id,
                loc.origin,
                loc.field_1,
                loc.field_2,
                loc.field_3,
                loc.MISC,
                loc.cable_status,
                loc.LOC_type,
                loc.sync,
                loc.createdAt,
                loc.updatedAt,
                loc.user_id,
                loc.location_id,
                loc.LOCDestination.destination_id,
                loc.LOCDestination.loc_id,
                loc.LOCDestination.destination,
                loc.LOCDestination.destination_field_1,
                loc.LOCDestination.destination_field_2,
                loc.LOCDestination.destination_field_3,
                loc.LOCDestination.destination_sync,
                loc.LOCDestination.createdAt,
                loc.LOCDestination.updatedAt,
                loc.LOCDestination.longitude,
                loc.LOCDestination.latitude,
                loc.LOCDestination.radius,
                (loc.updated = false),
                (loc.created = false),
              );
            });
        }
      })
      .catch(err => {
        dispatch(
          onFinishDownloadingLocationInfo({}, 'Network request failed.'),
        );
        console.log('473', err);
      });
  };
};

const onFinishDownloadingLocationInfo = info => {
  return {type: FINISH_DOWNLOADING_LOCATION_INFO, info};
};

const finishDownloadingLocationInfo = (state, action) => {
  return updateObject(state, {
    loadDownloadingData: false,
    downloadedData: action.info,
  });
};
// =============================================================
export const onAddingOfflineLocations = offlineLocations => {
  return {type: ADD_OFFLINE_LOCATIONS, offlineLocations};
};

const addOfflineLocations = (state, action) => {
  return updateObject(state, {offlineLocation: action.offlineLocation});
};

// =============================================================

export default function LocationReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCATION_INPUT_HANDLER:
      return changeLocationInputs(state, action);

    case START_FETCHING_LOCATIONS:
      return startFetchingLocations(state, action);
    case FINISH_FETCHING_LOCATIONS:
      return finishFetchingLocations(state, action);

    case SELECT_EDIT_LOCATION:
      return selectingLocation(state, action);

    case SEARCH_INPUT_CHANGE_HANDLER:
      return searchInputChangeHandler(state, action);

    case START_SEARCHING_LOCATION:
      return startSearchingLocation(state, action);
    case FINISH_SEARCHING_LOCATION:
      return finishSearchingLocation(state, action);

    case CHANGE_RENDERED_ITEM:
      return changeReneredItem(state, action);

    case START_DOWNLOADING_LOCATION_INFO:
      return startDownloadingLocationInfo(state, action);
    case FINISH_DOWNLOADING_LOCATION_INFO:
      return finishDownloadingLocationInfo(state, action);

    case ADD_OFFLINE_LOCATIONS:
      return addOfflineLocations(state, action);
    default:
      return state;
  }
}
