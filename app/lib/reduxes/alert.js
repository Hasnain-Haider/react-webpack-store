import { createStore } from 'redux';

const alertReducer = (state = {}, action) => {
  const { body, type } = action;
  switch (action.type) {
  case 'SNACKBAR':
    return {  message: state.message, ...action, snack: true };
  case 'DIALOG':
    return {  message: state.message, ...action, dialog: true };
  default:
    return {};
  }
};

export default createStore(alertReducer);
