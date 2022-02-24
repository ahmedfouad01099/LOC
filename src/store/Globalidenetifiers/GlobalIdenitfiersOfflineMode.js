import {KeltechLocalDB} from '../../constants/LocalDB';
import {checkValidity, updateObject} from '../../util/utility';

const CHNAGE_GLOBAL_IDENTIFIER_INPUT =
  'KELTECH/STORE/GLOBALIDENTIFIER_OFFLINE/CHANG_GLOBAL_IDENTIFIER_INPUT';

const START_FETCHIHNG_GLOBAL_IDENTIFIER =
  'KELTECH/STORE/GLOBALIDENTIFIER_OFFLINE/START_FETCHIHNG_GLOBAL_IDENTIFIER';
const FINISH_FETCHIHNG_GLOBAL_IDENTIFIER =
  'KELTECH/STORE/GLOBALIDENTIFIER_OFFLINE/FINISH_FETCHIHNG_GLOBAL_IDENTIFIER';

const SELECT_IDENTIFIER =
  'KELTECH/STORE/GLOBALIDENTIFIER_OFFLINE/SELECT_IDENTIFIER';

const SEARCH_INPUT_CHANGE_HANDLER =
  'KELTECH/STORE/IDENTIFIER_OFFLINE/SEARCH_INPUT_CHANGE_HANDLER';

const START_SEARCHING_IDENTIFIER =
  'KELTECH/STORE/IDENTIFIER_OFFLINE/START_SEARCH_IDENTIFIER';
const FINISH_SEARCHING_IDENTIFIER =
  'KELTECH/STORE/IDENTIFIER_OFFLINE/FINISH_SEARCH_IDENTIFIER';

const CHANGE_RENDERED_ITEM =
  'KELTECH/STORE/IDENTIFIER_OFFLINE/CHANGE_RENDER_ITEM';

const initialState = {
  selectedIdentifierOfflineMode: {},

  globalIdentifiersOfflineMode: [],
  loadFetchingIdentifiersOfflineMode: false,

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

  renderedItem: 'identifier',

  error: false,
  errorMsg: '',
};

// =============================================================

export const onChangeAddGlobalIdentifierInput = (text, inputIdentifier) => {
  return {
    type: CHNAGE_GLOBAL_IDENTIFIER_INPUT,
    text: text,
    inputIdentifier,
  };
};

const changeGlobalIdentifierInputHandler = (state, action) => {
  const updatedGlobalIdentifierName = updateObject(state.globalIdentifierName, {
    [action.inputIdentifier]: updateObject(
      state.globalIdentifierName[action.inputIdentifier],
      {
        value: action.text,
        valid: checkValidity(
          action.text,
          state.globalIdentifierName[action.inputIdentifier] &&
            state.globalIdentifierName[action.inputIdentifier].validation,
        ),
        touched: true,
      },
    ),
  });

  return updateObject(state, {
    ...state,
    globalIdentifierName: updatedGlobalIdentifierName,
  });
};

// =============================================================
// Fetching Global Identifier
export const onStartFetchingGlobalIdentifiers = () => {
  return {type: START_FETCHIHNG_GLOBAL_IDENTIFIER};
};

const startFetchingGlobalIdentifiers = (state, action) => {
  return updateObject(state, {loadFetchingIdentifiersOfflineMode: true});
};

export const onFetchingGlobalIdentifiersOffline = () => {
  return dispatch => {
    dispatch(onStartFetchingGlobalIdentifiers());
    KeltechLocalDB.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM identifiers',
        [],
        (tx, results) => {
          console.log('110', results);

          // Get rows with Web SQL Database spec compliance.

          var len = results.rows.length;
          console.log('117', len);
          for (let i = 0; i < len; i++) {
            let rows = results.rows.raw();
            console.log('113', rows);
            dispatch(onFinishFetchingGlobalIdentifiers(rows));
          }

          // Alternatively, you can use the non-standard raw method.

          /*
                let rows = results.rows.raw(); // shallow copy of rows Array
        
                rows.map(row => console.log(`Employee name: ${row.name}, Dept Name: ${row.deptName}`));
              */
        },
        err => {
          console.log('123 fetching offline identifiers err', err);
          dispatch(
            onFinishFetchingGlobalIdentifiers([], 'something went wrong.'),
          );
        },
      );
    });
  };
};

export const onFinishFetchingGlobalIdentifiers = (globalIdentifiers, err) => {
  console.log('136', globalIdentifiers);
  return {type: FINISH_FETCHIHNG_GLOBAL_IDENTIFIER, globalIdentifiers, err};
};

const finishFetchingGlobalIdentifiers = (state, action) => {
  console.log('141', action.err);
  if (action.err) {
    return updateObject(state, {
      loadFetchingIdentifiersOfflineMode: false,
      error: true,
      errorMsg: action.err,
    });
  } else {
    console.log('success!!!');
    return updateObject(state, {
      loadFetchingIdentifiersOfflineMode: false,
      globalIdentifiersOfflineMode: action.globalIdentifiers,
      error: false,
    });
  }
};
// =============================================================
// select an Identifier

export const onSelectingIdentifierOfflineMode = selectedIdentifierId => {
  return {type: SELECT_IDENTIFIER, selectedIdentifierId};
};

const selectIdentifier = (state, action) => {
  const selectedIdentifier = [...state.globalIdentifiersOfflineMode].find(
    identifier => identifier.gid === action.selectedIdentifierId,
  );
  return updateObject(state, {
    selectedIdentifierOfflineMode: selectedIdentifier,
  });
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

export const onStartSearchingIdentifier = () => {
  return {type: START_SEARCHING_IDENTIFIER};
};

const startSearchingIdentifier = (state, action) => {
  return updateObject(state, {loadSearch: true});
};

export const onSearchingIdentifier = (text, token, id) => {
  return dispatch => {
    dispatch(onStartSearchingIdentifier());
    fetch(
      `http://18.189.156.89:3000/api/globalIdentifiers?name=${text}`,
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
        console.log('api searching identifier', resData);
        dispatch(onFinishSearchingIdentifier(resData.globalIdentifiers));
        if (text === '') {
          dispatch(onChangeRenderedItem('identifier'));
        } else {
          dispatch(onChangeRenderedItem('searchResult'));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const onFinishSearchingIdentifier = GID => {
  return {type: FINISH_SEARCHING_IDENTIFIER, GID};
};

const finishSearchingIdentifier = (state, action) => {
  return updateObject(state, {
    loadSearch: false,
    searchResult: action.GID,
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

export default function GlobalIdenetifierOfflineReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case CHNAGE_GLOBAL_IDENTIFIER_INPUT:
      return changeGlobalIdentifierInputHandler(state, action);

    case START_FETCHIHNG_GLOBAL_IDENTIFIER:
      return startFetchingGlobalIdentifiers(state, action);
    case FINISH_FETCHIHNG_GLOBAL_IDENTIFIER:
      return finishFetchingGlobalIdentifiers(state, action);

    case SELECT_IDENTIFIER:
      return selectIdentifier(state, action);

    case SEARCH_INPUT_CHANGE_HANDLER:
      return searchInputChangeHandler(state, action);

    case START_SEARCHING_IDENTIFIER:
      return startSearchingIdentifier(state, action);
    case FINISH_SEARCHING_IDENTIFIER:
      return finishSearchingIdentifier(state, action);

    case CHANGE_RENDERED_ITEM:
      return changeReneredItem(state, action);

    default:
      return state;
  }
}
