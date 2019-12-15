import createReducer from '../../../global/createReducer';
import * as constants from '../../action/appActions/constants';

const intialState = {
  token:'',
  loginResponse:'',
  isAuthenticated: false,
  totalRecords:0,
  jsonResp:[]
};
export const authReducer = createReducer(intialState, {
  [constants.LOGIN_REQUEST](state, action) {      
    return Object.assign({}, state, {
      loginResponse: action.loginResponse,
      token : action.token,
      isAuthenticated: action.isAuthenticated
    });
  },
  [constants.USERS_LOGOUT](state, action) {    
    return Object.assign({}, state, {   
      loginResponse:'',
      token: null,
      isAuthenticated: action.isAuthenticated,
    });
  },

  // [constants.GET_JSON](state, action) {
  //   return Object.assign({}, state, {
  //     token: action.token,
  //   });
  // },
});


