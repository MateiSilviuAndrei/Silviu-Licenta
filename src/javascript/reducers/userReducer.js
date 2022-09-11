export default function userReducer(state = {...defaultState}, action) {
  const newState = {...state};

  switch (action.type) {
    case 'ON_LOGIN': {
      newState.loggingIn = true;
      newState.loggedIn = false;
      newState.loginError = '';
      return newState;
    }
    case 'ON_LOGIN_FULFILLED': {
      const {user} = action.payload;
      newState.loggingIn = false;
      newState.loggedIn = true;
      newState.user = user;
      return newState;
    }
    case 'ON_LOGIN_REJECTED': {
      const {error} = action.payload;
      newState.loggingIn = false;
      newState.loggedIn = false;
      newState.loginError = error;
      return newState;
    }
    case 'ON_TOKEN_VALIDATE': {
      newState.validatingToken = true;
      newState.validatingTokenError = '';
      return newState;
    }
    case 'ON_TOKEN_VALIDATE_FULFILLED': {
      const {user} = action.payload;
      newState.loggedIn = true;
      newState.user = user;
      newState.validatingToken = false;
      newState.validatedToken = true;
      return newState;
    }
    case 'ON_TOKEN_VALIDATE_REJECTED': {
      const {error} = action.payload;
      newState.validatingTokenError = error;
      newState.validatingToken = false;
      newState.validatedToken = false;
      return newState;
    }
    case 'RESET_LOGIN': {
      newState.loggingIn = false;
      newState.loginError = '';
      return newState;
    }
    case 'LOGOUT': {
      newState.loggingOut = true;
      return newState;
    }
    case 'LOGOUT_FULFILLED': {
      newState.loggingIn = false;
      newState.loggedIn = false;
      newState.loggingOut = false;
      newState.user = {id: -1, email: ''};
      return newState;
    }
    default:
      return newState;
  }
}

const defaultState = {
  user: {},
  loggingIn: false,
  loggedIn: false,
  loginError: '',
  signingUp: false,
  signingUpError: '',
  signedUp: false,
  validatingToken: false,
  validatingTokenError: '',
  validatedToken: false,
  loggingOut: false,
  // any other helpful fields
};
