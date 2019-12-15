import * as constants from './constants';
import axios from 'axios';



export function actionGetAllTariff(response){    
	return {
        type: constants.GET_ALL_TARIFF,
        response
	};
}
export function actionGetTariffById(response){
    return {
		type: constants.GET_TARIFF_BY_ID,
		response
	};
}
export function actionGetTarifByVillaType(response){    
	return {
        type: constants.GET_ALL_TARIFF,
        response
	};
}
export function actionInsertTariff(response){
    return {
		type: constants.INSERT_TARIFF,
		response
	};
}
export function actionUpdateTariff(response){
    return {
		type: constants.UPDATE_TARIFF,
		response
	};
}

export function getalltariff() {    
    return dispatch => {        
        return axios.get('http://localhost:4000/api/tarif')		
        .then(response => 
        {            
            if(response){
                if(response.status === 200 && response.statusText === "OK"){                  
                    dispatch(actionGetAllTariff(response));
                    return response                
                }
                else{
                    // console.log("SignIn Failed Response::",response);                    
                    return "Err"
                }                
            }            			
        })
        .catch((response)=>{
            console.log("I am in catch block",response)
        })
    }
}

export function getalltariffbyid(id) {    
    let url="http://localhost:4000/api/tarif/gettarifbyid/"+id;
    return dispatch => {        
        return axios.get(url)		
        .then(response => 
        {            
            if(response){
                if(response.status === 200 && response.statusText === "OK"){                  
                    dispatch(actionGetTariffById(response));
                    return response                
                }
                else{
                    // console.log("SignIn Failed Response::",response);                    
                    return "Err"
                }                
            }            			
        })
        .catch((response)=>{
            console.log("I am in catch block",response)
        })
    }
}

export function gettarifbyvillatype(villatype) {        
    let url="http://localhost:4000/api/tarif/gettarifbyvillatype/"+villatype;
    return dispatch => {        
        return axios.get(url)		
        .then(response => 
        {            
            if(response){
                if(response.status === 200 && response.statusText === "OK"){                  
                    dispatch(actionGetTarifByVillaType(response));
                    return response                
                }
                else{
                    // console.log("SignIn Failed Response::",response);                    
                    return "Err"
                }                
            }            			
        })
        .catch((response)=>{
            console.log("I am in catch block",response)
        })
    }
}

export function inserttariff(tariffData) {        
    return dispatch => {        
        return axios.post('http://localhost:4000/api/tarif/create',tariffData)
        .then(response => 
        {            
            if(response){
                if(response.status === 200 && response.statusText === "OK"){                  
                    dispatch(actionInsertTariff(response));
                    return response                
                }
                else{
                    console.log("SignIn Failed Response::",response);                    
                    return "Err"
                }                
            }            			
        })
        .catch((response)=>{
            console.log("I am in catch block",response)
        })
    }
}

export function updatetariff(tariffId,tariffData) {    
    return dispatch => {        
        return axios.put('http://localhost:4000/api/tarif/tarifupdate/'+tariffId,tariffData)
                .then(response => 
                {            
                    if(response){
                        if(response.status === 200 && response.statusText === "OK"){                  
                            dispatch(actionUpdateTariff(response));
                            return response                
                        }
                        else{
                            console.log("SignIn Failed Response::",response);                    
                            dispatch(actionUpdateTariff(response));
                            return "Err"
                        }                
                    }            			
                })
                .catch((response)=>{
                    console.log("I am in catch block",response)
                })
            }
}