import { createStore } from 'redux';
import alertRedux from './alert';

const authReducer = (state = {}, action) => {
  switch (action.type) {
  case 'LOGIN':
    alertRedux.dispatch({
      type: 'SNACKBAR',
      message: `Signed in as ${action.user.username}`
    });
    return action.user;
  case 'SIGNUP':
    alertRedux.dispatch({
      type: 'DIALOG',
      message: `Created user ${action.user.username}`
    });
    return {};
  case 'LOGOUT':
    alertRedux.dispatch({
      type: 'SNACKBAR',
      message: 'Signed Out!'
    });
    return {};

  default:
    return {};
  }
};

export default createStore(authReducer);
