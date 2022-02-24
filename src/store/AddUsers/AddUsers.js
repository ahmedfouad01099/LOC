import {checkValidity, updateObject} from '../../util/utility';

const INPUT_CHANGE_HANDLER = 'KELTECH/STORE/ADDUSERS/INPUT_CHANGE_HANDLER';

const START_ADDING_USER = 'KELTECH/STORE/ADDUSERS/START_ADDING_USER';
const FINISH_ADDING_USER = 'KELTECH/STORE/ADDUSERS/FINISH_ADDING_USER';

const START_FETCHING_USERS = 'KELTECH/STORE/ADDUSERS/START_FETCHING_USERS';
const FINISH_FETCHING_USERS = 'KELTECH/STORE/ADDUSERS/FINISH_FETCHING_USERS';

const SELECT_EDIT_USER = 'KELTECH/ADDUSERS/SELECT_EDIT_USER';

const START_EDITING_USER = 'KELTECH/ADDADDRESS/START_SELECT_EDIT_USER';
const FINISH_EDITING_USER = 'KELTECH/ADDADDRESS/FINISH_SELECT_EDIT_USER';

const START_DELETING_USER = 'KELTECH/ADDUSERS/START_DELETE_USER';
const FINISH_DELETING_USER = 'KELTECH/ADDUSERS/FINISH_DELETE_USER';

const SEARCH_INPUT_CHANGE_HANDLER =
  'KELTECH/STORE/USERS/SEARCH_INPUT_CHANGE_HANDLER';

const START_FETCHING_SPECIFIC_USER =
  'KELTECH/USERS/START_FETCHING_SPECIFIC_USER';
const FINISH_FETCHING_SPECIFIC_USER =
  'KELTECH/USERS/FINISH_FETCHING_SPECIFIC_USER';

const START_SEARCHING_USER = 'KELTECH/STORE/USERS/START_SEARCH_USER';
const FINISH_SEARCHING_USER = 'KELTECH/STORE/USERS/FINISH_SEARCH_USER';

const initialState = {
  userForm: {
    firstName: {
      value: '',
      valid: false,
      validation: {
        required: true,
        // isEmail: true,
      },
      validationError: 'Required',
      touched: false,
    },
    lastName: {
      value: '',
      valid: false,
      validation: {
        required: true,
        // isEmail: true,
      },
      validationError: 'Required',
      touched: false,
    },
    email: {
      value: '',
      valid: false,
      validation: {
        required: true,
        isEmail: true,
      },
      validationError: 'Required',
      touched: false,
    },
    password: {
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      validationError: 'Required',
      touched: false,
    },
    role: {
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

  users: [],
  loadFetching: false,

  loadingDeleteUser: false,
  loadEditing: false,

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

  userError: false,
  userErrorMsg: '',
};

// =============================================================
export const onChangeAddUserInput = (text, inputIdentifier) => {
  return {
    type: INPUT_CHANGE_HANDLER,
    text: text,
    inputIdentifier,
  };
};

const changeInputHandler = (state, action) => {
  const updatedUserForm = updateObject(state.userForm, {
    [action.inputIdentifier]: updateObject(
      state.userForm[action.inputIdentifier],
      {
        value: action.text,
        valid: checkValidity(
          action.text,
          state.userForm[action.inputIdentifier] &&
            state.userForm[action.inputIdentifier].validation,
        ),
        touched: true,
      },
    ),
  });

  return updateObject(state, {
    ...state,
    userForm: updatedUserForm,
  });
};
// =============================================================

// =============================================================
export const onStartAddingUser = () => {
  return {type: START_ADDING_USER};
};

const startAddingUser = (state, action) => {
  return updateObject(state, {loading: true});
};

export const onAddingNewUser = ({
  e,
  token,
  firstName,
  lastName,
  email,
  password,
  role,
}) => {
  e.preventDefault();
  return dispatch => {
    dispatch(onStartAddingUser());
    fetch('http://18.189.156.89:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fullName: firstName + ' ' + lastName,
        email: email,
        password: password,
        role: role,
      }),
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        console.log('117', resData);
        dispatch(onFinishAddingUser(resData.user));

        if (resData.error) {
          alert(resData.error);
        }
        if (resData.message) {
          alert(resData.message);
        }
      });
  };
};

export const onFinishAddingUser = userInfo => {
  return {type: FINISH_ADDING_USER, userInfo};
};

const finishAddingUser = (state, action) => {
  const users = [...state.users];
  users.push(action.userInfo);
  return updateObject(state, {loading: false, users});
};
// =============================================================

export const onStartFetchingUsers = () => {
  return {type: START_FETCHING_USERS};
};

const startFetchingUsers = (state, action) => {
  return updateObject(state, {loadFetching: true});
};

export const onFetchingUsers = token => {
  return dispatch => {
    dispatch(onStartFetchingUsers());
    fetch('http://18.189.156.89:3000/api/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        console.log('api fetching users', resData);
        dispatch(onFinishFetchingUsers(resData.users));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const onFinishFetchingUsers = users => {
  return {type: FINISH_FETCHING_USERS, users};
};

const finishFetchingUsers = (state, action) => {
  return updateObject(state, {loadFetching: false, users: action.users});
};
// =============================================================

export const onSelectEditUser = userId => {
  return {type: SELECT_EDIT_USER, userId};
};

const selectEditUser = (state, action) => {
  const users = [...state.users];
  const selectedUser = users.find(user => user.user_id === action.userId);
  return updateObject(state, {selectedUser: selectedUser});
};
// =============================================================

export const onStartEditingUser = () => {
  return {type: START_EDITING_USER};
};

const startEditingUser = (state, action) => {
  return updateObject(state, {loadEditing: true});
};

export const onEditingUser = ({
  e,
  userId,
  token,
  firstName,
  lastName,
  email,
  // password,
  role,
}) => {
  e.preventDefault();
  return dispatch => {
    dispatch(onStartEditingUser());
    fetch('http://18.189.156.89:3000/api/users/' + userId, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: firstName + ' ' + lastName,
        email: email,
        role: role,
      }),
    })
      .then(res => res.json())
      .then(resData => {
        console.log('237', resData);
        dispatch(onFinishEditingUser());
        if (resData.error) {
          return alert(resData.error);
        }
        if (resData.error && resData.error[0]) {
          return alert(resData.error[0].message);
        }
        if (resData.message) {
          alert(resData.message);
        }
      });
  };
};

export const onFinishEditingUser = () => {
  return {type: FINISH_EDITING_USER};
};

const finishEditingUser = (state, action) => {
  return updateObject(state, {loadEditing: false});
};
// =============================================================

export const onStartDeletingUser = () => {
  return {type: START_DELETING_USER};
};

const startDeletingUser = (state, action) => {
  return updateObject(state, {loadingDeleteUser: true});
};

export const onDeletingUser = (e, userId, token) => {
  e.preventDefault();
  return dispatch => {
    dispatch(onStartDeletingUser());
    fetch('http://18.189.156.89:3000/api/users/' + userId, {
      method: 'DELETE',
      headers: {Authorization: `Bearer ${token}`},
    })
      .then(res => {
        console.log('235', res);
        if (res.status === 204) {
          alert('Deleting Success.');
          dispatch(onFinishDeletingUser(userId));
        }
      })
      .catch(err => {
        console.log('242', err);
      });
  };
};

export const onFinishDeletingUser = userId => {
  return {type: FINISH_DELETING_USER, userId};
};

const finishDeletingUser = (state, action) => {
  const users = [...state.users];
  const updatedUsersList = users.filter(user => user.user_id !== action.userId);
  return updateObject(state, {
    loadingDeleteUser: false,
    users: updatedUsersList,
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
export const onStartFetchingSpecificUser = () => {
  return {type: START_FETCHING_SPECIFIC_USER};
};

const startFetchingSpecificUser = (state, action) => {
  return updateObject(state, {loadSpecificUser: true});
};

export const onFetchingSpecificUser = (id, token) => {
  return dispatch => {
    dispatch(onStartFetchingSpecificUser());
    fetch('http://18.189.156.89:3000/api/users/' + id, {
      headers: {Authorization: `Bearer ${token}`},
    })
      .then(res => res.json())
      .then(resData => {
        console.log(resData);
        dispatch(onFinishFetchingSpecificUser(resData.user));
      })
      .catch(err => {
        dispatch(onFinishFetchingSpecificUser({}, 'Network request failed.'));
      });
  };
};

export const onFinishFetchingSpecificUser = (user, err) => {
  return {type: FINISH_FETCHING_SPECIFIC_USER, user, err};
};

const finishFetchingSpecificUser = (state, action) => {
  if (action.err) {
    return updateObject(state, {
      loadSpecificUser: false,
      userError: true,
      userErrorMsg: 'Network request failed.',
    });
  } else {
    return updateObject(state, {
      loadSpecificUser: false,
      specificUser: action.user,
    });
  }
};
// =============================================================

export const onStartSearchingUser = () => {
  return {type: START_SEARCHING_USER};
};

const startSearchingUser = (state, action) => {
  return updateObject(state, {loadSearch: true});
};

export const onSearchingUser = (text, token) => {
  console.log('390', token);
  return dispatch => {
    dispatch(onStartSearchingUser());
    fetch(`http://18.189.156.89:3000/api/users?fullName=${text}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        console.log('api fetching users', resData);
        dispatch(onFinishSearchingUser(resData.users));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const onFinishSearchingUser = users => {
  return {type: FINISH_SEARCHING_USER, users};
};

const finishSearchingUser = (state, action) => {
  return updateObject(state, {
    loadSearch: false,
    searchResult: action.users,
  });
};
// =============================================================

export default function AddUsersReducer(state = initialState, action) {
  switch (action.type) {
    case INPUT_CHANGE_HANDLER:
      return changeInputHandler(state, action);
    case START_ADDING_USER:
      return startAddingUser(state, action);
    case FINISH_ADDING_USER:
      return finishAddingUser(state, action);

    case START_FETCHING_USERS:
      return startFetchingUsers(state, action);
    case FINISH_FETCHING_USERS:
      return finishFetchingUsers(state, action);
    case SELECT_EDIT_USER:
      return selectEditUser(state, action);

    case START_EDITING_USER:
      return startEditingUser(state, action);
    case FINISH_EDITING_USER:
      return finishEditingUser(state, action);

    case START_DELETING_USER:
      return startDeletingUser(state, action);
    case FINISH_DELETING_USER:
      return finishDeletingUser(state, action);

    case SEARCH_INPUT_CHANGE_HANDLER:
      return searchInputChangeHandler(state, action);

    case START_FETCHING_SPECIFIC_USER:
      return startFetchingSpecificUser(state, action);
    case FINISH_FETCHING_SPECIFIC_USER:
      return finishFetchingSpecificUser(state, action);

    case START_SEARCHING_USER:
      return startSearchingUser(state, action);
    case FINISH_SEARCHING_USER:
      return finishSearchingUser(state, action);

    default:
      return state;
  }
}
