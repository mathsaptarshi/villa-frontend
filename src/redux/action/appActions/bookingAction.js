import * as constants from './constants';
import axios from 'axios';

export function actionCreateBooking(bookingResponse){
    // alert(JSON.stringify(bookingResponse))
	return {
        type: constants.BOOKING_REQUEST,
        bookingResponse
	};
}
export function actionGetAllBooking(response){    
	return {
        type: constants.GET_ALL_BOOKING,
        response
	};
}


export function createbooking(userdata) {    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ userdata })
        body: userdata
    };    
	return dispatch => {        
        return axios.post('http://localhost:4000/api/booking/create',userdata)
		// .then(response=>response.json())
        .then(response => 
        {            
            if(response){

                if(response.status === 200 && response.statusText === "OK"){                    
                    let success_response={                        
                        loginmsg: "Booking Success",
                        isAuthenticated: true,
                }
                dispatch(actionCreateBooking(response));
                return response
                
            }
            else{
                console.log("Booking Failed Response::",response);
                // return Promise.resolve({
                    //     error:'error'
                    // })
                    return "Err"
                }            
            }	
        })
        .catch((response)=>{
            console.log("I am in catch block",response)
        })
    }
}

export function getallbooking() {    
    return dispatch => {        
        return axios.get('http://localhost:4000/api/booking')		
        .then(response => 
        {            
            if(response){
                if(response.status === 200 && response.statusText === "OK"){                  
                    dispatch(actionGetAllBooking(response));
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
