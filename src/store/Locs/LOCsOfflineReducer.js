import {
  dualLocOfflineForm,
  singleLocOfflineForm,
} from '../../constants/LocsForms';
import {inserSingleLOCsValues} from '../../Sql/SingleLOCs/SingleLOCsSqlite';
import {checkValidity, updateObject} from '../../util/utility';
import uuid from 'react-native-uuid';
import {inserDualLOCsValues} from '../../Sql/DualLOCs/DualLOCsSqlite';
import {KeltechLocalDB} from '../../constants/LocalDB';

const CHANGE_LOCS_INPUT_HANDLER =
  'KELTECH/STORE/LOCS_OFFLine_MODE/CHANGE_LOCS_INPUT_HANDLER';
const CHANGE_DUAL_LOCS_INPUT_HANDLER =
  'KELTECH/STORE/LOCS_OFFLine_MODE/CHANGE_DUAL_LOCS_INPUT_HANDLER';

const RESET_SINGLE_FORM_HANDLER =
  'KELTECH/STORE/LOCS_OFFLine_MODE/RESET_SINGLE_FORM_HANDLER';
const RESET_DUAL_FORM_HANDLER =
  'KELTECH/STORE/LOCS_OFFLine_MODE/RESET_DUAL_FORM_HANDLER';

const START_ADDING_SINGLE_LOG =
  'KELTECH/STORE/LOCS_OFFLine_MODE/START_ADDING_SINGLE_LOC';
const FINISH_ADDING_SINGLE_LOG =
  'KELTECH/STORE/LOCS_OFFLine_MODE/FINISH_ADDING_SINGLE_LOC';

const START_ADDING_DUAL_LOG =
  'KELTECH/STORE/LOCS_OFFLine_MODE/START_ADDING_DUAL_LOC';
const FINISH_ADDING_DUAL_LOG =
  'KELTECH/STORE/LOCS_OFFLine_MODE/FINISH_ADDING_DUAL_LOC';

const START_FETCHING_LOC = 'KELTECH/STORE/LOCS_OFFLine_MODE/START_FETCHING_LOC';
const FINISH_FETCHING_LOC =
  'KELTECH/STORE/LOCS_OFFLine_MODE/FINISH_FETCHING_LOC';

const START_FETCH_SPECIFIC_LOC =
  'KELTECH/STORE/LOCS_OFFLine_MODE/START_FETCHING_SPECIFIC_LOC';
const FINISH_FETCH_SPECIFIC_LOC =
  'KELTECH/STORE/LOCS_OFFLine_MODE/FINISH_FETCHING_SPECIFIC_LOC';

const START_EDITING_SINGLE_LOC =
  'KELTECH/STORE/LOCS_OFFLine_MODE/START_EDITING_SINGLE_LOC';
const FINISH_EDITING_SINGLE_LOC =
  'KELTECH/STORE/LOCS_OFFLine_MODE/FINISH_EDITING_SINGLE_LOC';

const START_EDITING_LOC = 'KELTECH/STORE/LOCS_OFFLine_MODE/START_EDITING_LOC';
const FINISH_EDITING_LOC = 'KELTECH/STORE/LOCS_OFFLine_MODE/FINISH_EDITING_LOC';

const SHOW_ASSIGNED_UNASSIGNED_SCREENS =
  'KELTECH/STORE/LOCS_OFFLine_MODE/SHOW_ASSIGNED_UNASSIGNED_SCREENS';

const CHANGE_RENDERED_ITEM =
  'KELTECH/STORE/LOCS_OFFLine_MODE/CHANGE_RENDER_ITEM';

const START_SEARCHING_LOC =
  'KELTECH/STORE/LOCS_OFFLine_MODE/START_SEARCHING_LOC';
const FINISH_SEARCHING_LOC =
  'KELTECH/STORE/LOCS_OFFLine_MODE/FINISH_SEARCHING_LOC';

const initialState = {
  singleLocOfflineForm: {
    routeId: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },
    origin: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },
    MISC: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },
    filed1: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },
    filed2: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },
    filed3: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },
    status: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },
    lat: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },
    long: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },
    radius: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },
  },

  dualLocOfflineForm: {
    routeId: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },
    status: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },
    MISC: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },
    cableOrigin: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },
    filed1Origin: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },
    filed2Origin: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },
    filed3Origin: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },

    cableDestination: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },
    filed1Destination: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },
    filed2Destination: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },
    filed3Destination: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },

    lat: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },
    long: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },
    radius: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },
  },

  loadingAddingOfflineLoc: false,

  singleOfflineLocs: [],
  dualOfflineLocs: [],
  loadingLocs: false,

  loadDelete: false,

  specificOfflineLoc: {},
  loadSpecificOfflineLoc: false,

  loadEditOffline: false,

  assignedOffline: false,

  searchSingleOfflineLocs: [],
  searchDualOfflineLocs: [],
  loadOfflineSearchSearch: false,

  renderedOfflineItem: 'locs',

  locsError: false,
  locsErrorMsg: '',

  created: false,
  updated: false,
};
// =============================================================

export const onResetSingleLocOfflineForm = () => {
  return {type: RESET_SINGLE_FORM_HANDLER};
};

const resetSingleLocOfflineForm = (state, action) => {
  return updateObject(state, {
    ['singleLocOfflineForm']: updateObject(
      state['singleLocOfflineForm'],
      singleLocOfflineForm,
    ),
    specificOfflineLoc: {},
  });
};
// =============================================================

export const onResetDualLocOfflineForm = () => {
  return {type: RESET_DUAL_FORM_HANDLER};
};

const resetDualLocOfflineForm = (state, action) => {
  return updateObject(state, {
    ['dualLocOfflineForm']: updateObject(
      state['dualLocOfflineForm'],
      dualLocOfflineForm,
    ),
    specificOfflineLoc: {},
  });
};
// =============================================================
export const onChangeLocsOfflineInputs = (text, inputIdentifier) => {
  return {type: CHANGE_LOCS_INPUT_HANDLER, text, inputIdentifier};
};

const changeLocInputs = (state, action) => {
  const updatedSingleLocOfflineForm = updateObject(state.singleLocOfflineForm, {
    [action.inputIdentifier]: updateObject(
      state.singleLocOfflineForm[action.inputIdentifier],
      {
        value: action.text,
        valid: checkValidity(
          action.text,
          state.singleLocOfflineForm[action.inputIdentifier] &&
            state.singleLocOfflineForm[action.inputIdentifier].validation,
        ),
        touched: true,
      },
    ),
  });

  return updateObject(state, {
    ...state,
    singleLocOfflineForm: updatedSingleLocOfflineForm,
  });
};
// =============================================================

export const onChangeLocsDualOfflineInputs = (text, inputIdentifier) => {
  return {type: CHANGE_DUAL_LOCS_INPUT_HANDLER, text, inputIdentifier};
};

const changeLocDualInputs = (state, action) => {
  const updatedDualLocOfflineForm = updateObject(state.dualLocOfflineForm, {
    [action.inputIdentifier]: updateObject(
      state.dualLocOfflineForm[action.inputIdentifier],
      {
        value: action.text,
        valid: checkValidity(
          action.text,
          state.dualLocOfflineForm[action.inputIdentifier] &&
            state.dualLocOfflineForm[action.inputIdentifier].validation,
        ),
        touched: true,
      },
    ),
  });

  return updateObject(state, {
    ...state,
    dualLocOfflineForm: updatedDualLocOfflineForm,
  });
};
// =============================================================

const onStartAddingSingleLoc = () => {
  return {type: START_ADDING_SINGLE_LOG};
};

const startAddingSingleLoc = (state, action) => {
  return updateObject(state, {loadingAddingOfflineLoc: true});
};

export const onAddingSingleOfflineLoc = (
  userId,
  route_id,
  origin,
  field_1,
  field_2,
  field_3,
  MISC,
  LOC_type,
  location_id,
  cable_status,
  props,
) => {
  return dispatch => {
    console.log({route_id, origin});
    dispatch(onStartAddingSingleLoc());
    inserSingleLOCsValues(
      uuid.v4(),
      route_id,
      origin,
      field_1,
      field_2,
      field_3,
      MISC,
      cable_status ? cable_status : 'assigned',
      LOC_type,
      true,
      new Date().toISOString(),
      new Date().toISOString(),
      userId,
      location_id,
      false,
      true,
    );
    dispatch(onFinishAddingSingleLoc());
  };
};

const onFinishAddingSingleLoc = () => {
  return {type: FINISH_ADDING_SINGLE_LOG};
};

const finishAddingSingleLoc = (state, action) => {
  return updateObject(state, {loadingAddingOfflineLoc: false});
};
// =============================================================

const onStartAddingDualLoc = () => {
  return {type: START_ADDING_DUAL_LOG};
};

const startAddingDualLoc = (state, action) => {
  return updateObject(state, {loadingAddingOfflineLoc: true});
};

export const onAddingDualOfflineLoc = (
  userId,
  route_id,
  origin,
  field_1,
  field_2,
  field_3,
  MISC,
  LOC_type,
  location_id,
  cable_status,
  destination,
  destination_field_1,
  destination_field_2,
  destination_field_3,
  lat,
  long,
  radius,
  navigate,
) => {
  return dispatch => {
    console.log({route_id, origin});
    dispatch(onStartAddingDualLoc());
    inserDualLOCsValues(
      uuid.v4(),
      route_id,
      origin,
      field_1,
      field_2,
      field_3,
      MISC,
      cable_status ? cable_status : 'assigned',
      LOC_type,
      true,
      new Date().toISOString(),
      new Date().toISOString(),
      userId,
      location_id,
      uuid.v4(),
      uuid.v4(),
      destination,
      destination_field_1,
      destination_field_2,
      destination_field_3,
      true,
      new Date().toISOString(),
      new Date().toISOString(),
      lat,
      long,
      radius,
      false,
      true,
    );
    dispatch(onFinishAddingDualLoc());
  };
};

const onFinishAddingDualLoc = () => {
  return {type: FINISH_ADDING_DUAL_LOG};
};

const finishAddingDualLoc = (state, action) => {
  return updateObject(state, {loadingAddingOfflineLoc: false});
};
// =============================================================

const onStartFetchingLocs = () => {
  return {type: START_FETCHING_LOC};
};

const startFetchingLocs = (state, action) => {
  return updateObject(state, {loadingLocs: true});
};

export const onFetchingOfflineLocs = (id, assigned) => {
  console.log('534', {id, assigned});
  return dispatch => {
    dispatch(onStartFetchingLocs());
    KeltechLocalDB.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM dual WHERE location_id='${id}' AND cable_status='${assigned}'`,
        [],
        (tx, results) => {
          // Get rows with Web SQL Database spec compliance.

          var len = results.rows.length;
          console.log('544', len);
          let dualRows;
          for (let i = 0; i < len; i++) {
            dualRows = results.rows.raw();
            console.log('549 locs offline rows', dualRows);
            dispatch(onFinishFetchingLocs(dualRows));
          }

          // ===== fetching Single locs =====
          txn.executeSql(
            `SELECT * FROM single WHERE location_id='${id}' AND cable_status='${assigned}'`,
            [],
            (tx, results) => {
              // Get rows with Web SQL Database spec compliance.

              var len = results.rows.length;
              console.log('544', len);
              let singleRows;
              for (let i = 0; i < len; i++) {
                singleRows = results.rows.raw();
                console.log('549 locs offline rows', singleRows);
                dispatch(onFinishFetchingLocs(dualRows, singleRows));
              }
            },
            err => {
              console.log('128', err);
              dispatch(onFinishFetchingLocs([], 'something went worng '));
            },
          );
        },
        err => {
          console.log('128', err);
          dispatch(onFinishFetchingLocs([], 'something went worng '));
        },
      );
    });
  };
};

const onFinishFetchingLocs = (dualLOCs, singleLOCs, error) => {
  return {type: FINISH_FETCHING_LOC, dualLOCs, singleLOCs, error};
};

const finishFetchingLocs = (state, action) => {
  if (action.error) {
    return updateObject(state, {
      loadingLocs: false,
      locsError: true,
      locsErrorMsg: action.error,
    });
  } else {
    return updateObject(state, {
      loadingLocs: false,
      singleOfflineLocs: action.singleLOCs,
      dualOfflineLocs: action.dualLOCs,
      locsError: false,
    });
  }
};
// =============================================================

const onStartFetchingSpecificLoc = () => {
  return {type: START_FETCH_SPECIFIC_LOC};
};

const startFetchingSpecificLoc = (state, action) => {
  return updateObject(state, {loadSpecificOfflineLoc: true});
};

export const onFetchingSpecificOfflineLoc = (id, locType) => {
  return dispatch => {
    dispatch(onStartFetchingSpecificLoc());

    if (locType === 'dual') {
      KeltechLocalDB.transaction(txn => {
        txn.executeSql(
          ` SELECT * FROM dual WHERE loc_id='${id}' `,
          [],
          (tx, results) => {
            var len = results.rows.length;
            console.log('544', len);
            let specificLocRow;
            for (let i = 0; i < len; i++) {
              specificLocRow = results.rows.raw();
              console.log('549 locs offline rows', specificLocRow);
              dispatch(onFinishFetchingSpecificLoc(specificLocRow[0]));
            }
          },
          err => {
            console.log('631 fetching specific loc err', err);
          },
        );
      });
    } else {
      KeltechLocalDB.transaction(txn => {
        txn.executeSql(
          ` SELECT * FROM single WHERE loc_id='${id}' `,
          [],
          (tx, results) => {
            var len = results.rows.length;
            console.log('544', len);
            let specificLocRow;
            for (let i = 0; i < len; i++) {
              specificLocRow = results.rows.raw();
              console.log('549 locs offline rows', specificLocRow);
              dispatch(onFinishFetchingSpecificLoc(specificLocRow[0]));
            }
          },
          err => {
            console.log('651 fetching specific loc err', err);
          },
        );
      });
    }
  };
};

const onFinishFetchingSpecificLoc = loc => {
  return {type: FINISH_FETCH_SPECIFIC_LOC, loc};
};

const finishFetchingSpecificLoc = (state, action) => {
  return updateObject(state, {
    loadSpecificOfflineLoc: false,
    specificOfflineLoc: action.loc,
  });
};

// =============================================================

const onStartEditingSingleLoc = () => {
  return {type: START_EDITING_SINGLE_LOC};
};

const startEditingSingleLoc = (state, action) => {
  return updateObject(state, {loadEdit: true});
};

export const onEditingSingleOfflineLoc = (
  userId,
  locId,
  route_id,
  origin,
  field_1,
  field_2,
  field_3,
  MISC,
  LOC_type,
  location_id,
  cable_status,
  props,
) => {
  console.log({cable_status});
  return dispatch => {
    dispatch(onStartEditingSingleLoc());
    KeltechLocalDB.transaction(txn => {
      txn.executeSql(
        ` UPDATE single SET 
            route_id='${route_id}', origin='${origin}',
            field_1='${field_1}', field_2='${field_2}', field_3='${field_3}', 
            MISC='${MISC}', cable_status='${cable_status}', LOC_type='${LOC_type}',
            sync='${true}', updatedAt='${new Date().toISOString()}',
            user_id='${userId}', location_id='${location_id}', updated='${true}'
            WHERE loc_id='${locId}'
        `,
        [],
        (tx, results) => {
          alert('Edit success.');
          console.log('712 update single loc success');
          console.log('712', results);

          txn.executeSql(
            ` SELECT * from single WHERE loc_id='${locId}' `,
            [],
            (tx, results) => {
              console.log('720 fetching after update single loc success');

              var len = results.rows.length;
              console.log('544', len);
              let loc;
              for (let i = 0; i < len; i++) {
                loc = results.rows.raw();
                console.log('729 fetching after update locs offline rows', loc);
              }
              dispatch(onFinishEditingSingleLoc(loc[0]));
            },
            err => {
              console.log('651 update single loc err', err);
            },
          );
        },
        err => {
          console.log('651 update single loc err', err);
        },
      );
    });
  };
};

const onFinishEditingSingleLoc = loc => {
  return {type: FINISH_EDITING_SINGLE_LOC, loc};
};

const finishEditingSingleLoc = (state, action) => {
  const updatedSelectedLoc = {...state.specificOfflineLoc, ...action.loc};
  const singleOfflineLocs = [...state.singleOfflineLocs];

  let updatedSingleOfflineList = [];
  if (singleOfflineLocs.length > 0) {
    const updatedSingleOfflineLocIndex = singleOfflineLocs.findIndex(
      loc => loc.loc_id === action.loc.loc_id,
    );
    singleOfflineLocs[updatedSingleOfflineLocIndex] = action.loc;
    updatedSingleOfflineList = singleOfflineLocs;

    return updateObject(state, {
      loadEdit: false,
      specificOfflineLoc: updatedSelectedLoc,
      singleOfflineLocs: updatedSingleOfflineList,
    });
  } else {
    return updateObject(state, {
      loadEdit: false,
      specificOfflineLoc: updatedSelectedLoc,
    });
  }
};
// =============================================================

const onStartEditingDualLoc = () => {
  return {type: START_EDITING_LOC};
};

const startEditingDualLoc = (state, action) => {
  return updateObject(state, {loadEdit: true});
};

export const onEditingDualOfflineLoc = (
  userId,
  locId,
  route_id,
  origin,
  field_1,
  field_2,
  field_3,
  MISC,
  LOC_type,
  location_id,
  cable_status,
  destination,
  destination_field_1,
  destination_field_2,
  destination_field_3,
  latitude,
  longitude,
  radius,
  props,
) => {
  console.log({LOC_type});
  return dispatch => {
    dispatch(onStartEditingDualLoc());
    KeltechLocalDB.transaction(txn => {
      txn.executeSql(
        ` UPDATE dual SET 
            route_id='${route_id}', origin='${origin}', field_1='${field_1}',
            field_2='${field_2}', field_3='${field_3}', MISC='${MISC}', 
            cable_status='${cable_status}', LOC_type='${LOC_type}', sync='${true}',
            updatedAt='${new Date().toISOString()}', user_id='${userId}', location_id='${location_id}',
            destination='${destination}', destination_field_1='${destination_field_1}',
            destination_field_2='${destination_field_2}', destination_field_3='${destination_field_3}',
            syncDestination='${true}', destination_updatedAt='${new Date().toISOString()}',
            longitude='${longitude}', latitude='${latitude}',
            radius='${radius}', updated='${true}'
          WHERE loc_id='${locId}'
          `,
        [],
        (tx, results) => {
          alert('Edit success.');
          console.log('712 update dual loc success');
          console.log('712', results);

          txn.executeSql(
            ` SELECT * from dual WHERE loc_id='${locId}' `,
            [],
            (tx, results) => {
              console.log('720 fetching after update dual loc success');

              var len = results.rows.length;
              console.log('544', len);
              let loc;
              for (let i = 0; i < len; i++) {
                loc = results.rows.raw();
                console.log('833 fetching after update locs offline rows', loc);
              }
              dispatch(onFinishEditingDualLoc(loc[0]));
            },
            err => {
              console.log('651 update dual loc err', err);
            },
          );
        },
        err => {
          console.log('651 update dual loc err', err);
        },
      );
    });
  };
};

const onFinishEditingDualLoc = loc => {
  return {type: FINISH_EDITING_LOC, loc};
};

const finishEditingDualLoc = (state, action) => {
  const updatedSelectedLoc = {...state.specificLoc, ...action.loc};
  const dualOfflineLocs = [...state.dualOfflineLocs];
  let updatedDualOfflineList = [];
  if (dualOfflineLocs.length > 0) {
    const updatedDualLocIndex = dualOfflineLocs.findIndex(
      loc => loc.loc_id === action.loc.loc_id,
    );

    dualOfflineLocs[updatedDualLocIndex] = action.loc;
    updatedDualOfflineList = dualOfflineLocs;

    return updateObject(state, {
      loadEdit: false,
      specificOfflineLoc: updatedSelectedLoc,
      dualOfflineLocs: updatedDualOfflineList,
    });
  } else {
    return updateObject(state, {
      loadEdit: false,
      specificOfflineLoc: updatedSelectedLoc,
    });
  }
};
// =============================================================

export const onRenderAssignedOfflineScreen = assigned => {
  return {type: SHOW_ASSIGNED_UNASSIGNED_SCREENS, assigned};
};

const renderAssignedScreen = (state, action) => {
  if (action.assigned === 'assigned') {
    return updateObject(state, {assignedOffline: true});
  } else {
    return updateObject(state, {assignedOffline: false});
  }
};

// =============================================================
export const onChangeRenderedOfflineItem = item => {
  return {type: CHANGE_RENDERED_ITEM, item};
};

const changeReneredItem = (state, action) => {
  return updateObject(state, {renderedOfflineItem: action.item});
};

// =============================================================

const onStartSearchingLoc = () => {
  return {type: START_SEARCHING_LOC};
};

const startSearchingLoc = (state, action) => {
  return updateObject(state, {
    loadOfflineSearchSearch: true,
    renderedOfflineItem: 'searchResult',
  });
};

export const onSearchingOfflineLoc = (text, locType, type, locationId) => {
  return dispatch => {
    dispatch(onStartSearchingLoc());
    let singleSearchLocs = [],
      dualSearchLocs = [];
    if (text === '') {
      dispatch(onChangeRenderedOfflineItem('locs'));
    }
    if (locType === 'single' && type) {
      KeltechLocalDB.transaction(txn => {
        txn.executeSql(
          ` SELECT * FROM single 
            WHERE cable_status='${type}'
            AND location_id='${locationId}'
            AND route_id LIKE '%${text}%'
         `,
          [],
          (tx, results) => {
            var len = results.rows.length;
            console.log('544', len);
            for (let i = 0; i < len; i++) {
              singleSearchLocs = results.rows.raw();
              console.log('928 single search rows', singleSearchLocs);
            }
            dispatch(onFinishSearchingLoc(dualSearchLocs, singleSearchLocs));
          },
          err => {
            console.log('924 searching single err', err);
            dispatch(onFinishSearchingLoc(dualSearchLocs, singleSearchLocs));
          },
        );
      });
    } else {
      KeltechLocalDB.transaction(txn => {
        txn.executeSql(
          ` SELECT * FROM dual
            WHERE cable_status='${type}' 
            AND location_id='${locationId}'
            AND route_id LIKE '%${text}%'
        `,
          [],
          (tx, results) => {
            var len = results.rows.length;
            console.log('544', len);
            for (let i = 0; i < len; i++) {
              dualSearchLocs = results.rows.raw();
              console.log('928 dual search rows', dualSearchLocs);
            }
            dispatch(onFinishSearchingLoc(dualSearchLocs, singleSearchLocs));
          },
          err => {
            console.log('953 searching dual err', err);
            dispatch(onFinishSearchingLoc(dualSearchLocs, singleSearchLocs));
          },
        );
      });
    }
  };
};

const onFinishSearchingLoc = (dualLocs, singleLocs) => {
  return {type: FINISH_SEARCHING_LOC, singleLocs, dualLocs};
};

const finishSearchingLoc = (state, action) => {
  return updateObject(state, {
    loadOfflineSearchSearch: false,
    searchSingleOfflineLocs: action.singleLocs,
    searchDualOfflineLocs: action.dualLocs,
  });
};
// =============================================================

export default function LocsOfflineModeReducers(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCS_INPUT_HANDLER:
      return changeLocInputs(state, action);
    case CHANGE_DUAL_LOCS_INPUT_HANDLER:
      return changeLocDualInputs(state, action);

    case RESET_SINGLE_FORM_HANDLER:
      return resetSingleLocOfflineForm(state, action);
    case RESET_DUAL_FORM_HANDLER:
      return resetDualLocOfflineForm(state, action);

    case START_ADDING_SINGLE_LOG:
      return startAddingSingleLoc(state, action);
    case FINISH_ADDING_SINGLE_LOG:
      return finishAddingSingleLoc(state, action);

    case START_ADDING_DUAL_LOG:
      return startAddingDualLoc(state, action);
    case FINISH_ADDING_DUAL_LOG:
      return finishAddingDualLoc(state, action);

    case START_FETCHING_LOC:
      return startFetchingLocs(state, action);
    case FINISH_FETCHING_LOC:
      return finishFetchingLocs(state, action);

    case START_FETCH_SPECIFIC_LOC:
      return startFetchingSpecificLoc(state, action);
    case FINISH_FETCH_SPECIFIC_LOC:
      return finishFetchingSpecificLoc(state, action);

    case START_EDITING_LOC:
      return startEditingDualLoc(state, action);
    case FINISH_EDITING_LOC:
      return finishEditingDualLoc(state, action);

    case START_EDITING_SINGLE_LOC:
      return startEditingSingleLoc(state, action);
    case FINISH_EDITING_SINGLE_LOC:
      return finishEditingSingleLoc(state, action);

    case SHOW_ASSIGNED_UNASSIGNED_SCREENS:
      return renderAssignedScreen(state, action);

    case START_SEARCHING_LOC:
      return startSearchingLoc(state, action);
    case FINISH_SEARCHING_LOC:
      return finishSearchingLoc(state, action);

    case CHANGE_RENDERED_ITEM:
      return changeReneredItem(state, action);

    default:
      return state;
  }
}
