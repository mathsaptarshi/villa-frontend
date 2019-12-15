import React, {Component} from 'react';
import { FacebookProvider, Share } from 'react-facebook';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
// import {PostData} from '../services/PostData';
import {Redirect} from 'react-router-dom';
// import './SocialLogin.css';

export function PostData(data){
  console.log(data)
}


class SocialLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginError: false,
      redirect: false,
      resp: false,
      inputData:{
            status: ''            
      }
    };
    this.signup = this
      .signup
      .bind(this);
      // console.log(this.props)
  }

  signup(res, type) {
    let postData;
    if (type === 'facebook' && res.email) {
      postData = {
        name: res.name,
        provider: type,
        email: res.email,
        provider_id: res.id,
        token: res.accessToken,
        provider_pic: res.picture.data.url
      };
    }

    // if (type === 'google' && res.w3.U3) {
    if (type === 'google' && res.w3) {
      postData = {
        name: res.w3.ig,
        provider: type,
        email: res.w3.U3,
        provider_id: res.El,
        token: res.Zi.access_token,
        provider_pic: res.w3.Paa
      };
    }

    if (postData) {

      alert(JSON.stringify(postData))            
      this.setState({resp: true});
      
      // PostData('signup', postData)
      //   .then((result) => {
      //   let responseJson = result;
      //   sessionStorage.setItem("userData", JSON.stringify(responseJson));
      //   this.setState({redirect: true});
      // });
    } else {
      this.setState({resp: false});
    }
  }

  getFormValue = (e) => {
    this.setState({
      inputData: {
            ...this.state.inputData,
            [e.target.name]: e.target.value
        }        
    })
    // console.log(this.state.inputData)
  }

  submitStatus(e){
    e.preventDefault();
    console.log("submitStatus@@@",this.state.inputData)
  }

  render() {

    if (this.state.redirect || sessionStorage.getItem('userData')) {
      return (<Redirect to={'/'}/>)
    }

    const responseFacebook = (response) => {
      console.log("facebook console");
      // console.log(response);
      this.signup(response, 'facebook');



    }

    const responseGoogle = (response) => {
      console.log("google console");
      console.log(response);
      this.signup(response, 'google');
    }
    // 0aef79fcadb17ab6ab17ed276dcf23cf
    console.log(this.state.resp)
    return (
    <div className="container">
      <div>
            <FacebookLogin
              appId="350152662310153"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}/>
            <br/>
            {
              this.state.resp===false ?
              <p>Login</p>:
              <div>
                <form method="POST">
                  <div>                  
                    <label>Status:</label>
                    <input type="text" name="status" onChange={this.getFormValue.bind(this)}/>
                    <input type="submit" onClick={this.submitStatus.bind(this)} />
                  </div>
                </form>
              </div>
            }
            <br/>




            <GoogleLogin
              clientId="1094067897150-86v77idjftcv24mhrnb48sjubdujc4d0.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}/>
            </div>
            
      </div>
    );
  }
}

export default SocialLogin;