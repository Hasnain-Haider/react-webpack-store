import { createStore } from 'redux';

const alertReducer = (state = {}, action) => {
  const { body, type } = action;
  switch (action.type) {
  case 'SNACKBAR':
    return { ...state, ...action, snack: true };
  case 'DIALOG':
    return { ...state, ...action, dialog: true };
  default:
    return {};
  }
};

export default createStore(alertReducer);
