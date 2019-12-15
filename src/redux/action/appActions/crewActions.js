import * as constants from './constants';
import axios from 'axios';


export function actionGetAllCrew(response){    
	return {
        type: constants.GET_ALL_CREW,
        response
	};
}
export function actionGetCrewById(response){
    return {
		type: constants.GET_CREW_BY_ID,
		response
	};
}
export function actionInsertCrew(response){
    return {
		type: constants.INSERT_CREW,
		response
	};
}

export function actionUpdateCrew(response){
    return {
		type: constants.UPDATE_CREW,
		response
	};
}

export function getallcrew() {    
    return dispatch => {        
        return axios.get('http://localhost:4000/api/crew')		
        .then(response => 
        {            
            if(response){
                if(response.status === 200 && response.statusText === "OK"){                  
                    dispatch(actionGetAllCrew(response));
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

export function getcrewbyid(id) {    
    // alert(id);
    return dispatch => {        
        return axios.get('http://localhost:4000/api/crew/getcrewbyid/'+id).then((response) => {   
            if(response){
                if(response.status === 200 && response.statusText === "OK"){                  
                    dispatch(actionGetCrewById(response));
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

export function insertcrew(crewData) {    
    return dispatch => {        
                return axios.post('http://localhost:4000/api/crew/create',crewData)		
                .then(response => 
                {            
                    if(response){
                        if(response.status === 200 && response.statusText === "OK"){                  
                            dispatch(actionInsertCrew(response));
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

export function updatecrew(crewId,crewData) {    
    return dispatch => {        
        return axios.put('http://localhost:4000/api/crew/crewupdate/'+crewId,crewData)
                .then(response => 
                {            
                    if(response){
                        if(response.status === 200 && response.statusText === "OK"){                  
                            dispatch(actionUpdateCrew(response));
                            return response                
                        }
                        else{
                            console.log("SignIn Failed Response::",response);                    
                            dispatch(actionUpdateCrew(response));
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