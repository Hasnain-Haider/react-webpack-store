import { createStore } from 'redux';
import alertRedux from './alert';

const loginReducer = (state = {}, action) => {
  let alertType;
  let alertMessage;

  switch (action.type) {
    case 'LOGIN':
      alertRedux.dispatch({
        type: 'SNACKBAR',
        message: `Signed in as ${action.user.username}`
      });
      return action.user;

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

export default createStore(loginReducer);
