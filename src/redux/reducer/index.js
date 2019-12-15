import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import * as appReducers from './appReducers/appReducers';
import * as authReducer from './appReducers/authReducers';
import * as villaReducer from './appReducers/villaReducers';
import * as tariffReducer from './appReducers/tariffReducers';
import * as bookingReducer from './appReducers/bookingReducers';

const formReducers = {
  form: formReducer
}
const appReducer = combineReducers(Object.assign({},
  appReducers,
  formReducers,
  authReducer,
  villaReducer,
  tariffReducer,
  bookingReducer
  ));
export default appReducer;

// const villaReducer = combineReducers(Object.assign({},
//   villaReducer,
//   authReducer
//   ));
// export default villaReducer;