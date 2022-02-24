import {dualLocForm, singleLocForm} from '../../constants/LocsForms';
import {checkValidity, updateObject} from '../../util/utility';

const CHANGE_LOCS_INPUT_HANDLER =
  'KELTECH/STORE/LOCS/CHANGE_LOCS_INPUT_HANDLER';
const CHANGE_DUAL_LOCS_INPUT_HANDLER =
  'KELTECH/STORE/LOCS/CHANGE_DUAL_LOCS_INPUT_HANDLER';

const RESET_SINGLE_FORM_HANDLER =
  'KELTECH/STORE/LOCS/RESET_SINGLE_FORM_HANDLER';
const RESET_DUAL_FORM_HANDLER = 'KELTECH/STORE/LOCS/RESET_DUAL_FORM_HANDLER';

const START_ADDING_SINGLE_LOG = 'KELTECH/STORE/LOCS/START_ADDING_SINGLE_LOC';
const FINISH_ADDING_SINGLE_LOG = 'KELTECH/STORE/LOCS/FINISH_ADDING_SINGLE_LOC';

const START_ADDING_DUAL_LOG = 'KELTECH/STORE/LOCS/START_ADDING_DUAL_LOC';
const FINISH_ADDING_DUAL_LOG = 'KELTECH/STORE/LOCS/FINISH_ADDING_DUAL_LOC';

const START_FETCHING_LOC = 'KELTECH/STORE/LOCS/START_FETCHING_LOC';
const FINISH_FETCHING_LOC = 'KELTECH/STORE/LOCS/FINISH_FETCHING_LOC';

const START_FETCH_SPECIFIC_LOC =
  'KELTECH/STORE/LOCS/START_FETCHING_SPECIFIC_LOC';
const FINISH_FETCH_SPECIFIC_LOC =
  'KELTECH/STORE/LOCS/FINISH_FETCHING_SPECIFIC_LOC';

const START_EDITING_SINGLE_LOC = 'KELTECH/STORE/LOCS/START_EDITING_SINGLE_LOC';
const FINISH_EDITING_SINGLE_LOC =
  'KELTECH/STORE/LOCS/FINISH_EDITING_SINGLE_LOC';

const START_EDITING_LOC = 'KELTECH/STORE/LOCS/START_EDITING_LOC';
const FINISH_EDITING_LOC = 'KELTECH/STORE/LOCS/FINISH_EDITING_LOC';

const START_DELETING_LOC = 'KELTECH/STORE/LOCS/START_DELETING_LOC';
const FINISH_DELETING_LOC = 'KELTECH/STORE/LOCS/FINISH_DELETING_LOC';

const SHOW_ASSIGNED_UNASSIGNED_SCREENS =
  'KELTECH/STORE/LOCS/SHOW_ASSIGNED_UNASSIGNED_SCREENS';

const CHANGE_RENDERED_ITEM = 'KELTECH/STORE/LOCS/CHANGE_RENDER_ITEM';

const START_SEARCHING_LOC = 'KELTECH/STORE/LOCS/START_SEARCHING_LOC';
const FINISH_SEARCHING_LOC = 'KELTECH/STORE/LOCS/FINISH_SEARCHING_LOC';

const initialState = {
  singleLocForm: {
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

  dualLocForm: {
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

  loading: false,

  singleLocs: [],
  dualLocs: [],
  loadingLocs: false,

  loadDelete: false,

  specificLoc: {},
  loadSpecificLoc: false,

  loadEdit: false,

  assigned: false,

  searchSingleLocs: [],
  searchDualLocs: [],
  loadSearch: false,

  renderedItem: 'locs',

  locsError: false,
  locsErrorMsg: '',
};
// =============================================================

export const onResetSingleLocForm = () => {
  return {type: RESET_SINGLE_FORM_HANDLER};
};

const resetSingleLocForm = (state, action) => {
  return updateObject(state, {
    ['singleLocForm']: updateObject(state['singleLocForm'], singleLocForm),
    specificLoc: {},
  });
};
// =============================================================

export const onResetDualLocForm = () => {
  return {type: RESET_DUAL_FORM_HANDLER};
};

const resetDualLocForm = (state, action) => {
  return updateObject(state, {
    ['dualLocForm']: updateObject(state['dualLocForm'], dualLocForm),
    specificLoc: {},
  });
};
// =============================================================
export const onChangeLocsInputs = (text, inputIdentifier) => {
  return {type: CHANGE_LOCS_INPUT_HANDLER, text, inputIdentifier};
};

const changeLocInputs = (state, action) => {
  const updatedSingleLocForm = updateObject(state.singleLocForm, {
    [action.inputIdentifier]: updateObject(
      state.singleLocForm[action.inputIdentifier],
      {
        value: action.text,
        valid: checkValidity(
          action.text,
          state.singleLocForm[action.inputIdentifier] &&
            state.singleLocForm[action.inputIdentifier].validation,
        ),
        touched: true,
      },
    ),
  });

  return updateObject(state, {
    ...state,
    singleLocForm: updatedSingleLocForm,
  });
};
// =============================================================

export const onChangeLocsDualInputs = (text, inputIdentifier) => {
  return {type: CHANGE_DUAL_LOCS_INPUT_HANDLER, text, inputIdentifier};
};

const changeLocDualInputs = (state, action) => {
  const updatedDualLocForm = updateObject(state.dualLocForm, {
    [action.inputIdentifier]: updateObject(
      state.dualLocForm[action.inputIdentifier],
      {
        value: action.text,
        valid: checkValidity(
          action.text,
          state.dualLocForm[action.inputIdentifier] &&
            state.dualLocForm[action.inputIdentifier].validation,
        ),
        touched: true,
      },
    ),
  });

  return updateObject(state, {
    ...state,
    dualLocForm: updatedDualLocForm,
  });
};
// =============================================================

const onStartAddingSingleLoc = () => {
  return {type: START_ADDING_SINGLE_LOG};
};

const startAddingSingleLoc = (state, action) => {
  return updateObject(state, {loading: true});
};

export const onAddingSingleLoc = (
  token,
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
    fetch('http://18.189.156.89:3000/api/LOCs', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        route_id,
        origin,
        field_1,
        field_2,
        field_3,
        MISC,
        LOC_type,
        location_id,
        cable_status: cable_status ? cable_status : 'assigned',
      }),
    })
      .then(res => res.json())
      .then(resData => {
        console.log(resData);
        dispatch(onFinishAddingSingleLoc());
        if (resData.error) {
          return alert(resData.error);
        }
        if (resData.error && resData.error[0]) {
          return alert(resData.error[0].message);
        }
        if (resData.message) {
          alert(resData.message);
          props.navigation.goBack();
        }
      });
  };
};

const onFinishAddingSingleLoc = () => {
  return {type: FINISH_ADDING_SINGLE_LOG};
};

const finishAddingSingleLoc = (state, action) => {
  return updateObject(state, {loading: false});
};
// =============================================================

const onStartAddingDualLoc = () => {
  return {type: START_ADDING_DUAL_LOG};
};

const startAddingDualLoc = (state, action) => {
  return updateObject(state, {loading: true});
};

export const onAddingDualLoc = (
  token,
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
  navigate,
) => {
  return dispatch => {
    console.log({route_id, origin});
    dispatch(onStartAddingDualLoc());
    fetch('http://18.189.156.89:3000/api/LOCs', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
      }),
    })
      .then(res => res.json())
      .then(resData => {
        console.log(resData);
        dispatch(onFinishAddingDualLoc());
        if (resData.error) {
          return alert(resData.error);
        }
        if (resData.error && resData.error[0]) {
          return alert(resData.error[0].message);
        }
        if (resData.message) {
          alert(resData.message);
          navigate(-1);
        }
      });
  };
};

const onFinishAddingDualLoc = () => {
  return {type: FINISH_ADDING_DUAL_LOG};
};

const finishAddingDualLoc = (state, action) => {
  return updateObject(state, {loading: false});
};
// =============================================================

const onStartFetchingLocs = () => {
  return {type: START_FETCHING_LOC};
};

const startFetchingLocs = (state, action) => {
  return updateObject(state, {loadingLocs: true});
};

export const onFetchingLocs = (id, token, assigned) => {
  return dispatch => {
    dispatch(onStartFetchingLocs());
    fetch('http://18.189.156.89:3000/api/LOCs/' + id + '/' + assigned, {
      headers: {Authorization: `Bearer ${token}`},
    })
      .then(res => res.json())
      .then(resData => {
        console.log(resData);
        dispatch(onFinishFetchingLocs(resData.dualLOCs, resData.singleLOCs));
      })
      .catch(err => {
        dispatch(onFinishFetchingLocs([], [], 'Network request failed.'));
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
      singleLocs: action.singleLOCs,
      dualLocs: action.dualLOCs,
      locsError: false,
    });
  }
};
// =============================================================

const onStartFetchingSpecificLoc = () => {
  return {type: START_FETCH_SPECIFIC_LOC};
};

const startFetchingSpecificLoc = (state, action) => {
  return updateObject(state, {loadSpecificLoc: true});
};

export const onFetchingSpecificLoc = (id, token) => {
  return dispatch => {
    dispatch(onStartFetchingSpecificLoc());
    fetch('http://18.189.156.89:3000/api/LOCs/' + id, {
      headers: {Authorization: `Bearer ${token}`},
    })
      .then(res => res.json())
      .then(resData => {
        console.log(resData);
        dispatch(onFinishFetchingSpecificLoc(resData.loc));
      });
  };
};

const onFinishFetchingSpecificLoc = loc => {
  return {type: FINISH_FETCH_SPECIFIC_LOC, loc};
};

const finishFetchingSpecificLoc = (state, action) => {
  return updateObject(state, {
    loadSpecificLoc: false,
    specificLoc: action.loc,
  });
};

// =============================================================

const onStartEditingSingleLoc = () => {
  return {type: START_EDITING_SINGLE_LOC};
};

const startEditingSingleLoc = (state, action) => {
  return updateObject(state, {loadEdit: true});
};

export const onEditingSingleLoc = (
  token,
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
    fetch('http://18.189.156.89:3000/api/LOCs/' + locId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        route_id,
        origin,
        field_1,
        field_2,
        field_3,
        MISC,
        LOC_type,
        location_id,
        cable_status,
      }),
    })
      .then(res => res.json())
      .then(resData => {
        console.log(resData);
        dispatch(onFinishEditingSingleLoc(resData.loc));
        if (resData.error) {
          return alert(resData.error);
        }
        if (resData.error && resData.error[0]) {
          return alert(resData.error[0].message);
        }
        if (resData.message) {
          alert(resData.message);
          props.navigation.goBack();
        }
      });
  };
};

const onFinishEditingSingleLoc = loc => {
  return {type: FINISH_EDITING_LOC, loc};
};

const finishEditingSingleLoc = (state, action) => {
  const updatedSelectedLoc = {...state.specificLoc, ...action.loc};
  return updateObject(state, {
    loadEdit: false,
    specificLoc: updatedSelectedLoc,
  });
};
// =============================================================

const onStartEditingDualLoc = () => {
  return {type: START_EDITING_LOC};
};

const startEditingDualLoc = (state, action) => {
  return updateObject(state, {loadEdit: true});
};

export const onEditingDualLoc = (
  token,
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
    fetch('http://18.189.156.89:3000/api/LOCs/' + locId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
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
      }),
    })
      .then(res => res.json())
      .then(resData => {
        console.log(resData);
        dispatch(onFinishEditingDualLoc(resData.loc));
        if (resData.error) {
          return alert(resData.error);
        }
        if (resData.error && resData.error[0]) {
          return alert(resData.error[0].message);
        }
        if (resData.message) {
          alert(resData.message);
          props.navigation.goBack();
        }
      });
  };
};

const onFinishEditingDualLoc = loc => {
  return {type: FINISH_EDITING_LOC, loc};
};

const finishEditingDualLoc = (state, action) => {
  const updatedSelectedLoc = {...state.specificLoc, ...action.loc};
  return updateObject(state, {
    loadEdit: false,
    specificLoc: updatedSelectedLoc,
  });
};

// =============================================================
export const onRenderAssignedScreen = assigned => {
  return {type: SHOW_ASSIGNED_UNASSIGNED_SCREENS, assigned};
};

const renderAssignedScreen = (state, action) => {
  if (action.assigned === 'assigned') {
    return updateObject(state, {assigned: true});
  } else {
    return updateObject(state, {assigned: false});
  }
};

// =============================================================
export const onChangeRenderedItem = item => {
  return {type: CHANGE_RENDERED_ITEM, item};
};

const changeReneredItem = (state, action) => {
  return updateObject(state, {renderedItem: action.item});
};

// =============================================================

const onStartSearchingLoc = () => {
  return {type: START_SEARCHING_LOC};
};

const startSearchingLoc = (state, action) => {
  return updateObject(state, {loadSearch: true, renderedItem: 'searchResult'});
};

export const onSearchingLoc = (id, text, token, type) => {
  return dispatch => {
    dispatch(onStartSearchingLoc());
    fetch(
      `http://18.189.156.89:3000/api/LOCs/${id}/${type}?route_id=${text}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then(res => res.json())
      .then(resData => {
        dispatch(onFinishSearchingLoc(resData.dualLOCs, resData.singleLOCs));
        if (text === '') {
          dispatch(onChangeRenderedItem('locs'));
        }
      });
  };
};

const onFinishSearchingLoc = (dualLocs, singleLocs) => {
  return {type: FINISH_SEARCHING_LOC, singleLocs, dualLocs};
};

const finishSearchingLoc = (state, action) => {
  return updateObject(state, {
    loadSearch: false,
    searchSingleLocs: action.singleLocs,
    searchDualLocs: action.dualLocs,
  });
};
// =============================================================

export default function LocsReducers(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCS_INPUT_HANDLER:
      return changeLocInputs(state, action);
    case CHANGE_DUAL_LOCS_INPUT_HANDLER:
      return changeLocDualInputs(state, action);

    case RESET_SINGLE_FORM_HANDLER:
      return resetSingleLocForm(state, action);
    case RESET_DUAL_FORM_HANDLER:
      return resetDualLocForm(state, action);

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
