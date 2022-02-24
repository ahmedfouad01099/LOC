import {checkValidity, updateObject} from '../../util/utility';
import AsyncStorage from '@react-native-async-storage/async-storage';

const START_LOGIN_HANDLER = 'TONYMOLY/STORE/LOGIN/START_LOGIN_HANDLER';
const FINISH_LOGIN_HANDLER = 'TONYMOLY/STORE/LOGIN/FINISH_LOGIN_HANDLER';

const ON_LOGIN_SUCCESS = 'TONYMOLY/LOGIN/ON_LOGIN_SUCCESS';
const REDIRECT_TO_HOME = 'TONYMOLY/STROE/LOGIN/REDIRECT_TO_HOME';
const ON_LOGOUT_HANDLER = 'TONYMOLY/STORE/LOGIN/ON_LOGOUT_HANDLER';
const ON_FINISH_LOGOUT = 'TONYMOLY/STORE/LOGIN/ON_FINISH_LOGOUT';

const CHANGE_LOGIN_INPUT_HANDLER =
  'TONYMOLY/STORE/LOGIN/CHANGE_LOGIN_INPUT_HANDLER';

const initialState = {
  token: null,
  userId: null,
  role: null,
  loginForm: {
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
  },
  loading: false,
  redirectToHome: false,

  error: false,
  errorMsg: '',
};

export const onChangeLoginInput = (text, inputIdentifier) => {
  return {
    type: CHANGE_LOGIN_INPUT_HANDLER,
    text: text,
    inputIdentifier,
  };
};

const changeLoginInput = (state, action) => {
  const updatedLoginForm = updateObject(state.loginForm, {
    [action.inputIdentifier]: updateObject(
      state.loginForm[action.inputIdentifier],
      {
        value: action.text,
        valid: checkValidity(
          action.text,
          state.loginForm[action.inputIdentifier] &&
            state.loginForm[action.inputIdentifier].validation,
        ),
        touched: true,
      },
    ),
  });

  return updateObject(state, {
    ...state,
    loginForm: updatedLoginForm,
  });
};

export const redirectToHome = () => {
  return {
    type: REDIRECT_TO_HOME,
  };
};

const onRedirectToHome = (state, action) => {
  return updateObject(state, {
    redirectToHome: true,
  });
};

export const onStartLogin = () => {
  return {
    type: START_LOGIN_HANDLER,
  };
};

const startLogin = (state, action) => {
  return updateObject(state, {loading: true});
};

export const onLoginHandler = (email, pass, props) => {
  const authData = {
    email: email,
    password: pass,
  };
  console.log('44', authData);
  return dispatch => {
    dispatch(onStartLogin());
    fetch('http://18.189.156.89:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData),
    })
      .then(res => {
        console.log('110', res);
        return res.json();
      })
      .then(resData => {
        // login successfully!
        console.log('116', resData);
        dispatch(onLoginSuccess());
        if (resData.error) {
          dispatch(onFinishLogin(resData.error));
          return alert(resData.error);
        }
        console.log(resData);

        if (resData.token !== undefined) {
          AsyncStorage.setItem('token', resData.token);
          AsyncStorage.setItem('userId', resData.user.user_id);
          AsyncStorage.setItem('role', resData.user.role);
        }
        return resData;
      })
      .then(resData => {
        console.log('128', resData);
        dispatch(
          resData.user &&
            onLoginSuccess(
              resData.token,
              resData.user.user_id,
              resData.user.role,
            ),
        );
        return resData;
      })
      .then(resData => {
        if (resData.token) {
          return props.navigation.navigate('home');
        }
      });
  };
};

export const onLoginSuccess = (token, userId, role) => {
  return {type: ON_LOGIN_SUCCESS, token, userId, role};
};

const loginHandlerSuccess = (state, action) => {
  if (action.token) {
    return updateObject(state, {
      token: action.token,
      userId: action.userId,
      role: action.role,
      loading: false,
    });
  } else {
    return updateObject(state, {loading: false});
  }
};

export const onFinishLogin = err => {
  return {type: FINISH_LOGIN_HANDLER, err};
};

const finishLogin = (state, action) => {
  return updateObject(state, {error: true, errorMsg: action.err});
};

export const authCheckState = navigate => {
  return dispatch => {
    AsyncStorage.getItem('token').then(token => {
      AsyncStorage.getItem('userId').then(userId => {
        AsyncStorage.getItem('role').then(role => {
          if (!token) {
            dispatch(onSubmitLogout());
          } else {
            dispatch(onLoginSuccess(token, userId, role));
          }
        });
      });
    });
  };
};

export const onLogout = props => {
  AsyncStorage.removeItem('token');
  AsyncStorage.removeItem('userId');
  AsyncStorage.removeItem('role');

  return {
    type: ON_LOGOUT_HANDLER,
    props,
  };
};

const logoutHandler = (state, action) => {
  if (action.props) {
    action.props.navigation.navigate('login');
  }
  return updateObject(state, {
    token: null,
    userId: null,
    role: null,
    redirectToLogin: true,
  });
};

export const onFinishLogout = () => {
  return {type: ON_FINISH_LOGOUT};
};

const finishLogoutHandler = (state, action) => {
  return updateObject(state, {redirectToLogin: false});
};

// anonymous logout action
export const onSubmitLogout = () => {
  return dispatch => {
    dispatch(onLogout());
    setTimeout(() => {
      dispatch(onFinishLogout());
    }, 2000);
  };
};

export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOGIN_HANDLER:
      return startLogin(state, action);
    case ON_LOGIN_SUCCESS:
      return loginHandlerSuccess(state, action);
    case REDIRECT_TO_HOME:
      return onRedirectToHome(state, action);
    case ON_LOGOUT_HANDLER:
      return logoutHandler(state, action);
    case ON_FINISH_LOGOUT:
      return finishLogoutHandler(state, action);

    case CHANGE_LOGIN_INPUT_HANDLER:
      return changeLoginInput(state, action);
    default:
      return state;
  }
}
