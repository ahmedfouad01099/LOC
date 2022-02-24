import {checkValidity, updateObject} from '../../util/utility';

const CHNAGE_GLOBAL_IDENTIFIER_INPUT =
  'KELTECH/STORE/GLOBALIDENTIFIER/CHANG_GLOBAL_IDENTIFIER_INPUT';

const START_FETCHIHNG_GLOBAL_IDENTIFIER =
  'KELTECH/STORE/GLOBALIDENTIFIER/START_FETCHIHNG_GLOBAL_IDENTIFIER';
const FINISH_FETCHIHNG_GLOBAL_IDENTIFIER =
  'KELTECH/STORE/GLOBALIDENTIFIER/FINISH_FETCHIHNG_GLOBAL_IDENTIFIER';

const SELECT_IDENTIFIER = 'KELTECH/STORE/GLOBALIDENTIFIER/SELECT_IDENTIFIER';

const SEARCH_INPUT_CHANGE_HANDLER =
  'KELTECH/STORE/IDENTIFIER/SEARCH_INPUT_CHANGE_HANDLER';

const START_SEARCHING_IDENTIFIER =
  'KELTECH/STORE/IDENTIFIER/START_SEARCH_IDENTIFIER';
const FINISH_SEARCHING_IDENTIFIER =
  'KELTECH/STORE/IDENTIFIER/FINISH_SEARCH_IDENTIFIER';

const CHANGE_RENDERED_ITEM = 'KELTECH/STORE/IDENTIFIER/CHANGE_RENDER_ITEM';

const initialState = {
  selectedIdentifier: {},

  globalIdentifiers: [],
  loadFetchingGlobalIdentifiers: false,

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
  return updateObject(state, {loadFetchingGlobalIdentifiers: true});
};

export const onFetchingGlobalIdentifiers = token => {
  return dispatch => {
    dispatch(onStartFetchingGlobalIdentifiers());
    fetch('http://18.189.156.89:3000/api/globalIdentifiers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        console.log('191', resData);
        dispatch(
          onFinishFetchingGlobalIdentifiers(resData.globalIdentifiers, false),
        );
      })
      .catch(err => {
        dispatch(
          onFinishFetchingGlobalIdentifiers([], 'Network Request Failed.'),
        );
        console.log('194', err);
      });
  };
};

export const onFinishFetchingGlobalIdentifiers = (globalIdentifiers, err) => {
  return {type: FINISH_FETCHIHNG_GLOBAL_IDENTIFIER, globalIdentifiers, err};
};

const finishFetchingGlobalIdentifiers = (state, action) => {
  if (action.err) {
    return updateObject(state, {
      loadFetchingGlobalIdentifiers: false,
      error: true,
      errorMsg: action.err,
    });
  } else {
    return updateObject(state, {
      loadFetchingGlobalIdentifiers: false,
      globalIdentifiers: action.globalIdentifiers,
      error: false,
    });
  }
};
// =============================================================
// select an Identifier

export const onSelectingIdentifier = selectedIdentifierId => {
  return {type: SELECT_IDENTIFIER, selectedIdentifierId};
};

const selectIdentifier = (state, action) => {
  const selectedIdentifier = [...state.globalIdentifiers].find(
    identifier => identifier.gid === action.selectedIdentifierId,
  );
  return updateObject(state, {selectedIdentifier: selectedIdentifier});
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

export default function GlobalIdenetifierReducer(state = initialState, action) {
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
