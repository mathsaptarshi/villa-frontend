import * as constants from './constants';
import axios from 'axios';

export function actionSignin(loginResponse){
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

export function actionSignup(response){
    return {
		type: constants.SIGN_UP,
		response
	};
}

export function signin(signindata) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ signindata })
        body: signindata
    };    
	return dispatch => {        
        return axios.post('http://localhost:4000/api/auth/signin',signindata)
		// .then(response=>response.json())
        .then(response => 
        {            
            if(response){

                if(response.status === 200 && response.statusText === "OK"){
                    localStorage.setItem('token', response.data.accessToken);             
                    let success_response={
                        token: response.data.accessToken,
                        loginmsg: "Login Success",
                        isAuthenticated: true,
                }
                dispatch(actionSignin(response));
                return response
                
            }
            else{
                console.log("SignIn Failed Response::",response);
                // return Promise.resolve({
                    //     error:'error'
                    // })
                    return "Err"
                }
                
            }
            // if(response.auth === false){
            //     localStorage.clear(); 
            //     let failed_response={
            //         token:response.accessToken,
            //         loginResponse:response.message,
            //         isAuthenticated: false,
            //     }
            //     return dispatch(actionSignin(failed_response));                
            // }
            // else if(response.auth === true){                
            //     localStorage.setItem('token', response.accessToken);
            //     let success_response={
            //         token: response.accessToken,
            //         loginResponse: response.message,
            //         isAuthenticated: true,
            //     }
            //     return dispatch(actionSignin(success_response));
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

export function signup(userData){           
    return dispatch => {        
        return axios.post('http://localhost:4000/api/auth/signup',userData)		
        .then(response => 
        {            
            if(response){
                if(response.status === 200 && response.statusText === "OK"){                  
                    dispatch(actionSignup(response));
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