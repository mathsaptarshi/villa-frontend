import * as constants from './constants';
import axios from 'axios';



export function actionGetAllVilla(response){    
	return {
        type: constants.GET_ALL_VILLA,
        response
	};
}
export function actionGetVillaById(response){
    return {
		type: constants.GET_VILLA_BY_ID,
		response
	};
}
export function actionInsertVilla(response){
    return {
		type: constants.INSERT_VILLA,
		response
	};
}

export function actionUpdateVilla(response){
    return {
		type: constants.UPDATE_VILLA,
		response
	};
}

export function getallvilla() {    
    return dispatch => {        
        return axios.get('http://localhost:4000/api/villa')		
        .then(response => 
        {            
            if(response){
                if(response.status === 200 && response.statusText === "OK"){                  
                    dispatch(actionGetAllVilla(response));
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

export function getvillabyid(id) {    
    // alert(id);
    return dispatch => {        
        return axios.get('http://localhost:4000/api/villa/getvillabyid/'+id).then((response) => {   
            if(response){
                if(response.status === 200 && response.statusText === "OK"){                  
                    dispatch(actionGetVillaById(response));
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

export function insertvilla(villaData) {    
    return dispatch => {        
                return axios.post('http://localhost:4000/api/villa/create',villaData)		
                .then(response => 
                {            
                    if(response){
                        if(response.status === 200 && response.statusText === "OK"){                  
                            dispatch(actionInsertVilla(response));
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

export function updatevilla(villaId,villaData) {    
    return dispatch => {        
        return axios.put('http://localhost:4000/api/villa/villaupdate/'+villaId,villaData)
                .then(response => 
                {            
                    if(response){
                        if(response.status === 200 && response.statusText === "OK"){                  
                            dispatch(actionUpdateVilla(response));
                            return response                
                        }
                        else{
                            console.log("SignIn Failed Response::",response);                    
                            dispatch(actionUpdateVilla(response));
                            return "Err"
                        }                
                    }            			
                })
                .catch((response)=>{
                    console.log("I am in catch block",response)
                })
            }
}


// export function signup(userData){           
//     return dispatch => {        
//         return axios.post('http://localhost:4000/api/auth/signup',userData)		
//         .then(response => 
//         {            
//             if(response){
//                 if(response.status === 200 && response.statusText === "OK"){                  
//                     dispatch(actionSignup(response));
//                     return response                
//                 }
//                 else{
//                     console.log("SignIn Failed Response::",response);                    
//                     return "Err"
//                 }                
//             }            			
//         })
//         .catch((response)=>{
//             console.log("I am in catch block",response)
//         })
//     }
// }