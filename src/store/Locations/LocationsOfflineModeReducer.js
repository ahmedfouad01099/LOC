import {KeltechLocalDB} from '../../constants/LocalDB';
import {checkValidity, updateObject} from '../../util/utility';

const CHANGE_LOCATION_INPUT_HANDLER =
  'KELTECH/STORE/LOCATIONS_OFFLINEMODE/CHANGE_LOCATION_INPUT_HANDLER';

const START_FETCHING_LOCATIONS =
  'KELTECH/STORE/LOCATION_OFFLINE_MODE/START_FETCHING_LOCATIONS';
const FINISH_FETCHING_LOCATIONS =
  'KELTECH/STORE/LOCATION_OFFLINE_MODE/FINISH_FETCHING_LOCATIONS';

const SELECT_EDIT_LOCATION =
  'KELTECH/STORE/LOCATIONS_OFFLINEMODE/SELECT_EDIT_LOCATION';

const SEARCH_INPUT_CHANGE_HANDLER =
  'KELTECH/STORE/LOCATION_OFFLINE_MODE/SEARCH_INPUT_CHANGE_HANDLER';

const START_SEARCHING_LOCATION =
  'KELTECH/LOACTION/LOCATION_OFFLINE_MODE/START_SEARCH_LOCATION';
const FINISH_SEARCHING_LOCATION =
  'KELTECH/STORE/LOCATION_OFFLINE_MODE/FINISH_SEARCH_LOCATION';

const CHANGE_RENDERED_ITEM =
  'KELTECH/STORE/LOCATIONS_OFFLINEMODE/CHANGE_RENDER_ITEM';

const initialState = {
  offlineLocations: [],
  loadofflineLocations: false,

  selectedEditOfflineModeLocation: {},

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
  return updateObject(state, {loadofflineLocations: true});
};

export const onFetchingOfflineModeLocations = id => {
  console.log('96 offline location id', id);
  return dispatch => {
    dispatch(onStartFetchingLocations());
    KeltechLocalDB.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM location WHERE project_id='${id}'`,
        [],
        (tx, results) => {
          console.log('Query completed');
          console.log('121', results);

          // Get rows with Web SQL Database spec compliance.

          var len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let rows = results.rows.raw();
            console.log('112 location offline rows', rows);
            dispatch(onFinishFetchingLocations(rows));
          }
        },
        err => {
          console.log('128', err);
          dispatch(onFinishFetchingLocations([], 'something went worng '));
        },
      );
    });
  };
};

export const onFinishFetchingLocations = (locations, err) => {
  return {type: FINISH_FETCHING_LOCATIONS, locations, err};
};

const finishFetchingLocations = (state, action) => {
  if (action.err) {
    return updateObject(state, {
      loadofflineLocations: false,
      locationError: true,
      locationErrorMsg: action.err,
    });
  } else {
    return updateObject(state, {
      loadofflineLocations: false,
      offlineLocations: action.locations,
      locationError: false,
    });
  }
};
// =============================================================

export const onSelectingOfflineModeLocation = locationId => {
  return {type: SELECT_EDIT_LOCATION, locationId};
};

const selectingLocation = (state, action) => {
  console.log('151', action.locationId);
  if (state.offlineLocations) {
    const locations = [...state.offlineLocations];
    const selectedEditOfflineModeLocation = locations.find(
      location => location.id.toString() === action.locationId.toString(),
    );
    console.log('213', selectedEditOfflineModeLocation);
    return updateObject(state, {
      selectedEditOfflineModeLocation: selectedEditOfflineModeLocation,
    });
  } else {
    return state;
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

export default function LocationOfflineModeReducer(
  state = initialState,
  action,
) {
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

    default:
      return state;
  }
}
