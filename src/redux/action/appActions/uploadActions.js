import axios from 'axios'

export function uploadSuccess({ data }) {
    return {
      type: 'constants.UPLOAD_DOCUMENT_SUCCESS',
      data,
    };
  }
  
  export function uploadFail(error) {
    return {
      type: 'constants.UPLOAD_DOCUMENT_FAIL',
      error,
    };
  }

  export function uploadRequest( data ) {  

    console.log((data.get('file')))   
    return dispatch => {
        axios.post('http://localhost:4000/api/crew/image', data)
          .then(response => dispatch(uploadSuccess(response)))
          .catch(error => dispatch(uploadFail(error)));
    };
}
