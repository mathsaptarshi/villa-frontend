import createReducer from '../../../global/createReducer';
import * as constants from '../../action/appActions/constants';

const intialState = {
  jsonResp:[],

};

export const tariffReducer = createReducer(intialState, {

	[constants.GET_JSON](state, action) {		
		return Object.assign({}, state, {
			jsonResp: action,
		});
	},
	[constants.DATA_IS_LOADING](state, action) {    
		return Object.assign({}, state, {
			jsonResp: [],			
		});
	},
	[constants.GET_ALLVILLATYPES](state, action) {    
		// alert(JSON.stringify(action));
		return Object.assign({}, state, {
			getAllVillaTypes: action,			
		});
	},
	// [constants.GET_SORTDATA](state, action) {
	// 	// console.log('inside reducer',action.jsonResp)
	// 	return Object.assign({}, state, {
	// 		jsonResp: action.jsonResp,
	// 	});
	// },
});
