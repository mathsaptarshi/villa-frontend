import * as constants from './constants';
import axios from 'axios';

export function actionAdminSignin(loginResponse){
    // alert(JSON.stringify(loginResponse))
	return {
        type: constants.LOGIN_REQUEST,
        loginResponse
	};
}

export function actionSignout(response){    
	return {
        type: constants.USERS_LOGOUT,
        token: null,
        isAuthenticated:' ',
        response,        
	};
}


export function adminsignin(signindata) {
    // console.log("signindata from auth action::",signindata);    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ signindata })
        body: signindata
    };    
	return dispatch => {        
        return axios.post('http://localhost:4000/api/admin/signin',signindata)		
        .then(response => 
        {            
            if(response){
                if(response.status === 200 && response.statusText === "OK"){                    
                    dispatch(actionAdminSignin(response));
                return response                
            }
            else{
                console.log("SignIn Failed Response::",response);
                dispatch(actionAdminSignin(response));
                return response
                // return Promise.resolve({
                    //     error:'error'
                    // })                    
                }                
            }
            // if(response.auth === false){
            //     localStorage.clear(); 
            //     let failed_response={
            //         token:response.accessToken,
            //         loginResponse:response.message,
            //         isAuthenticated: false,
            //     }
            //     return dispatch(actionAdminSignin(failed_response));                
            // }
            // else if(response.auth === true){                
            //     localStorage.setItem('token', response.accessToken);
            //     let success_response={
            //         token: response.accessToken,
            //         loginResponse: response.message,
            //         isAuthenticated: true,
            //     }
            //     return dispatch(actionAdminSignin(success_response));
            // }
            // else{

            // }			
        })
        .catch((response)=>{
            console.log("I am in catch block",response)
        })
    }
	// .then(user=>user.json())handleSubmit
	// .then((user) => {
		// alert(user.json())
		// alert(JSON.stringify(user))
        // .then(handleResponse)
        // .then(user => {
        //     // store user details and jwt token in local storage to keep user logged in between page refreshes
        //     localStorage.setItem('user', user);
        //     dispatch(actionLogin(user));

        //     return user;
        // });
}


export function signout() {   
        let response="Successfully Sign Out";
        localStorage.clear();                       
        return dispatch => dispatch(actionSignout(response))         
}
