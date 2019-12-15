import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
// import { ActionCreators } from '../../redux/action';
import { AuthActionCreators } from '../../redux/action';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import _ from 'lodash';
// import Button from 'react-bootstrap-button-loader';
import { Button } from 'reactstrap';

class SignIn extends Component {
    constructor(props){
      super(props);
      this.state = {
        email: '',
        password: '',
        submitted: false
      };
      this.handleChange=this.handleChange.bind(this)
      this.handleSubmit=this.handleSubmit.bind(this)            
    }
    
    handleSubmit(e) {    
      this.setState({ submitted: true })      
      const { email, password } = this.state;
      // if(!this.props.loginResponse){
      this.props.signin(email,password)
        .then(()=>{
          
          if(this.props.loginResponse !== null){            
            if(this.props.isAuthenticated==false){                            
              if(this.props.loginResponse.loginResponse==="Invalid Password!"){
                this.setState({ submitted: false }) 
                let err = document.querySelector('#err');
                err.style.color  = 'red';
                document.getElementById("err").innerHTML = "Your password is Invalid, Please Check your Password";	
              }
              if(this.props.loginResponse.loginResponse==="User Not Found!"){
                this.setState({ submitted: false }) 
                let err = document.querySelector('#err');
                err.style.color  = 'red';
                document.getElementById("err").innerHTML = "User Not Found!";	
              }
            }
          }          
          if(this.props.loginResponse.isAuthenticated === true){
            // return <Redirect to={{ pathname: '/'}} />
            this.props.history.push({
              pathname:'/profile',            
            });
          }
      })    
      e.preventDefault();  
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  
  render() {
    // console.log("this.props.loginResponse::",this.props.loginResponse);
    // console.log("this.props.loginResponse",this.props.loginResponse.auth);
    // console.log("this.props.loginResponse",this.props.loginResponse.reason);
    // console.log("this.props.loginResponse",this.props.loginResponse.accessToken);
    // const { loggingIn } = this.props;
    const { email, password, reset, submitted } = this.state;
    return (
      <div>
      <div className="col-md-6 col-md-offset-3">
                <h2>Signin with your Account</h2>
                <p>for testing email:saptarshi@gmail.com/123456</p>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} placeholder="Enter your Email"/>
                        {submitted && !email &&
                            <div className="help-block" style={{"color":"red"}}>email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} placeholder="Enter your Password"/>
                        {submitted && !password &&
                            <div className="help-block" style={{"color":"red"}}>Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        {
                          (!password || !email)?
                            <button disabled className="btn btn-primary">Login</button>
                            :((this.state.submitted)?"Loding..."
                            :<button className="btn btn-primary">Login</button>)
                        }
                        <div>Need an account. Then <Link to="/signup">Register </Link>Here</div>                        
                        <div>Want to Upload Something <Link to="/upload">Upload </Link>Here</div> 
                        <div>To Show the Calender <Link to="/calender">Click </Link>Here</div>
                        <div>To Show the DataTables <Link to="/datatables">Click </Link>Here</div>
                        <div>To Show the Image Gallery <Link to="/imagegallery">Click </Link>Here</div>
                        <div>For Social Login <Link to="/sociallogin">Click </Link>Here</div>
                    </div>
                    <div id="err"></div>
                </form>
                
            </div>
    </div>
    )
  }
}


const mapStateToProps = state => ({  
  loginResponse: state.authReducer.loginResponse,
  token: state.authReducer.token,  
  isAuthenticated: state.authReducer.isAuthenticated
});
function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthActionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(SignIn));