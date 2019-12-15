import ApiUrls from '../../../utils/ApiUrls';
import Api from '../../../utils/Api';
import * as constants from './constants';

export function actionGetJson(jsonResp){
	return {
		type: constants.GET_JSON,
		jsonResp,
	};
}

export function actiongetAllVillaTypes(getAllVillaTypes){
	return{
		type: constants.GET_ALLVILLATYPES,
		getAllVillaTypes,
	}
}

// export function get_sortdata(jsonResp){
// 	return {
// 		type: constants.GET_SORTDATA,
// 		jsonResp,
// 	};
// }

export function dataIsLoading(jsonResp){
	return {
		type:constants.DATA_IS_LOADING,
	};
}

export function getJsonData(postData) { 
			
	var queryVars = {
		'PageNumber' : postData.PageNumber,
		'ItemCountPerPage' : postData.ItemCountPerPage,
		'Community' : postData.Community,
		'SortField' : postData.SortField,
		'IsSortDescending': postData.IsSortDescending,
		'IsReturnTotalItemCount': postData.IsReturnTotalItemCount 
	};	
	var queryStringParts = [];
	for(var key in queryVars) {
		queryStringParts.push(key + '=' + queryVars[key]);
	}
	var queryString = queryStringParts.join('&')
	// alert(queryString);
	const apiCall=ApiUrls.getJson+'?'+queryString;
	return dispatch => Api.post(apiCall,postData)
						.then(function (response) {							
							dispatch(dataIsLoading())
							dispatch(actionGetJson(response.results))
						})
						.catch(function (error) {
							// console.log(error);
						});
}

// export function getSortData(postData) {
// 	return dispatch => dispatch(get_sortdata(postData))
// }


// Get All Villa Types getAllVillaTypes

export function getAllVillaTypes(){
	
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			// body: JSON.stringify({ email, password })
		};
		// return fetch(`http://localhost:4000/api/auth/signin`, requestOptions)
		return dispatch => fetch(`http://localhost:4000/api/getallvillatypes`, requestOptions)
			.then(response=>response.json())
			.then(response => 
			{                    			
				return dispatch(actiongetAllVillaTypes(response));					
			})
}

