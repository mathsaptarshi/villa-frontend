import React, { Component } from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import _ from 'lodash';
import '../../Asset'

import { withRouter, Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Layout from '../../_Layouts/Header.js'
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';

import Validation from '../Common/Validation'
import {toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import swal from 'sweetalert';

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state ={
        loginFormData: {
            email:'',
            password:''
        },
        validationTestSignIn: false,
        loginMsg: '',
        loading: false,
        selfDriving: false,
        modal: false,
        validationTest: false,
        passwordChecking: true,
        signUpFromData: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
            rePassword: '',
            state: '',
            city: '',
            pin: '',
            address: '',
            uniqueid: ''
        }
    }
    this.toggle = this.toggle.bind(this);
}
// notify = () => toast("Wow so easy to rent your villa!");
componentDidMount() {
  // console.log(this.props.router.query.action);
  if(localStorage.getItem('userKey')){
      // Router.pushRoute('villa-list');
      // Router.push({ pathname: '/villaList' })
  }
}

toggle() {
  this.setState(prevState => ({
      modal: !prevState.modal
  }));
  this.clearSignUpFormdata();
}

signUp = () => {
  this.toggle();
}

confirmCheck = (e) => {
  this.setState({selfDriving: !this.state.selfDriving},() => {
      if(!this.state.selfDriving){
          this.setState({
              signUpFromData: {
                  ...this.state.signUpFromData,
                  uniqueid: ''
              },
          });
      }
  });
}

getFormValue = (e) => {
  this.setState({
      signUpFromData: {
          ...this.state.signUpFromData,
          [e.target.name]: e.target.value
      },
      validationTest: false
  })
}

clearSignUpFormdata() {
  this.setState({
      signUpFromData: {
          ...this.state.signUpFromData,
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          password: '',
          rePassword: '',
          state: '',
          city: '',
          pin: '',
          address: '',
          uniqueid: '',
          uniqueidtype: ''
      },
      validationTest: false,
      passwordChecking: true,
      loading: false
  });
}


clearSignInFormData(){
  this.setState({
      loginFormData: {
          ...this.state.loginFormData,
          email:'',
          password:''
      },
      validationTest: false,
      loading: false,
      loginMsg: ''
  });
}

getSignInFormValue(e){
  this.setState({
      loginFormData: {
          ...this.state.loginFormData,
          [e.target.name]: e.target.value
      },
      validationTestSignIn: false
  },() => {
      console.log(this.state.loginFormData);
  })
}

signIn = (e) => {    
    const state = this.state;
    e.preventDefault();
    //console.log("working");
    // Router.pushRoute('villa/list');
  this.setState({
      validationTestSignIn: true,
      loading: true
  },() => {
      if(this.state.validationTestSignIn && (!Validation.emailValidate(this.state.loginFormData.email))){
          this.setState({loginMsg: 'Email ID not valid'})
      }else{
          this.setState({loginMsg: 'Check Your Email or Password'})
      }
});

  if(Validation.emailValidate(this.state.loginFormData.email) &&
    Validation.stringValidate(this.state.loginFormData.password)){
        
        try {            
            this.props.signin(this.state.loginFormData).then((response)=>{                
                if(response.status && response.status === 200 && response.statusText === "OK" && response.data.auth==="true"){                    
                    localStorage.setItem('userKey', response.data.accessToken);                    
                    this.props.history.push({
                        pathname:'/villalist'   
                    });
                }
                else{                                        
                    if(response.data.auth==="false" && response.data.reason==="Invalid Password!"){                        
                        toast("Invalid Password!");                                       
                        // swal({
                        //     title: "Login To Book First?",
                        //     text: "If You Are Not Logged In Then Log In First To Continue Booking ",
                        //     icon: "warning",
                        //     buttons: true,
                        //     dangerMode: true,
                        // })
                        this.clearSignInFormData();
                        this.setState({loginMsg: 'Invalid Password!'})
                        
                    }
                    else if(response.data.auth==="false" && response.data.reason==="User Not Found."){
                        toast("User Not Found!");
                        this.clearSignInFormData();  
                        this.setState({loginMsg: 'User Not Found.'})                                  
                    }
                    else{
                        toast("Please Check Your Email and Password!");
                        // this.clearSignInFormData();
                        // this.clearSignInFormData();
                        this.setState({loginMsg: 'User Not Found'})
                    }
                }
            })            
        } catch (error) {
            console.log(error);            
        }        
        // .then((response)=>{
        //     console.log(this.props)
        // })

        // console.log("Props is signin::::",this.props)
        // this.setState({loginMsg: '' , loading: false});
        // this.clearSignInFormData();
        // this.props.history.push({
        //     pathname:'/villalist'   
        // });

                
        // .then(()=>{
        //     console.log("Props::",this.props)

            // console.log(response);
            // Router.pushRoute('/villa/list');
        //   if(response.status === 200 && response.statusText === "OK"){
        //       this.setState({loginMsg: '' , loading: false});
        //       localStorage.setItem('userKey', response.data.accessToken);
        //       /*let tokenData = Validation.parseJwt(localStorage.getItem('userKey'));
        //       console.log(tokenData);*/
        //       console.log("User login successfully");
        //       this.clearSignInFormData();
        //       // Router.pushRoute('villa-list');
        //       // Router.push({ pathname: '/villaList' })
        //       // console.log("------------------");
        //   }else{
        //       console.log("user login not successful");
        //       this.setState({loginMsg: 'Email ID or password Invalid',loading: false});
        //   }

    //   }).catch((error) => {
    //       console.log("Inside catch block login user" + error);
    //       this.setState({loginMsg: 'Email ID or password Invalid',loading: false});
    //   });
  }else{
      console.log("one or more required field are missing");
      this.setState({loading: false});
  }
}

addUser = () => {
  const state = this.state;
  this.setState({
      validationTest: true,
      loading: true
  });
  if(this.state.signUpFromData.password !== '' && this.state.signUpFromData.rePassword !== ''){
      if(this.state.signUpFromData.password === this.state.signUpFromData.rePassword){
          this.setState({passwordChecking: true})
      }else{
          this.setState({passwordChecking: false})
          toast.warn("Invalid Password Checking!"); 
          
      }
  }
  if( 
      Validation.stringValidate(state.signUpFromData.firstName) &&
      Validation.stringValidate(state.signUpFromData.lastName) &&
      Validation.mobileNumberValidate(state.signUpFromData.phone) &&
      Validation.emailValidate(state.signUpFromData.email) &&
      Validation.stringValidate(state.signUpFromData.password) &&
      Validation.stringValidate(state.signUpFromData.rePassword) &&
      Validation.stringValidate(state.signUpFromData.state) &&
      Validation.stringValidate(state.signUpFromData.city) &&
      Validation.positiveNumber(state.signUpFromData.pin) &&
      Validation.stringValidate(state.signUpFromData.address)&&
      Validation.stringValidate(state.signUpFromData.uniqueid) &&
      Validation.stringValidate(state.signUpFromData.uniqueidtype) ){
          
          var signUpFromData = {
              firstname: this.state.signUpFromData.firstName,
              lastname: this.state.signUpFromData.lastName,
              phone: this.state.signUpFromData.phone,
              email: this.state.signUpFromData.email,
              password: this.state.signUpFromData.password,
              state: this.state.signUpFromData.state,
              city: this.state.signUpFromData.city,
              pin: this.state.signUpFromData.pin,
              address: this.state.signUpFromData.address,
              uniqueid: this.state.signUpFromData.uniqueid,
              uniqueidtype: this.state.signUpFromData.uniqueidtype,
        }
        // console.log("with uniqueid",signUpFromData);
        this.props.signup(signUpFromData)
            .then((response)=>{                                
                if(response.status === 200 && response.statusText === "OK"){                                       
                    this.props.history.push({
                        pathname:'/signin'   
                    });
                }
                else{                    
                    if(response.data.auth==="false" && response.data.reason==="Invalid Password!"){                        
                        toast("Invalid Password!");                                       
                        swal({
                            title: "Login To Book First?",
                            text: "If You Are Not Logged In Then Log In First To Continue Booking ",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        })
                        this.clearSignInFormData();
                        this.setState({loginMsg: 'Invalid Password!'})
                        
                    }
                    else if(response.data.auth==="false" && response.data.reason==="User Not Found."){
                        toast("User Not Found!");
                        this.clearSignInFormData();  
                        this.setState({loginMsg: 'User Not Found.'})                                  
                    }
                    else{
                        toast("Please Check Your Email and Password!");
                        // this.clearSignInFormData();
                        this.clearSignInFormData();
                        this.setState({loginMsg: 'User Not Found'})
                    }
                }
            })            

        //   axios.post('http://localhost:4000/api/auth/signup',signUpFromData).then((response) => {
        //       const response = response;
        //       console.log(response);
        //       if(response.status === 200 && response.statusText === "OK"){
        //           this.toggle();
        //           this.clearSignUpFormdata();
        //           console.log("User created successfully");
        //       }else{
        //           console.log("Data insertion not successful");
        //           this.clearSignUpFormdata();
        //       }

        //   }).catch((error) => {
        //       console.log("Inside catch block add user" + error);
        //       this.clearSignUpFormdata();
        //   });

  }else{
      console.log("one or more required field are missing");
      this.setState({loading: false});
  }
}
  //   handleSubmit(e) {    
  //     this.setState({ submitted: true })      
  //     const { email, password } = this.state;
  //     // if(!this.props.loginResponse){
  //     this.props.signin(email,password)
  //       .then(()=>{
  //         console.log("Props::",this.props)
  //         if(this.props.loginResponse !== null){            
  //           if(this.props.isAuthenticated==false){                            
  //             if(this.props.loginResponse.loginResponse==="Invalid Password!"){
  //               this.setState({ submitted: false }) 
  //               let err = document.querySelector('#err');
  //               err.style.color  = 'red';
  //               document.getElementById("err").innerHTML = "Your password is Invalid, Please Check your Password";	
  //             }
  //             if(this.props.loginResponse.loginResponse==="User Not Found!"){
  //               this.setState({ submitted: false }) 
  //               let err = document.querySelector('#err');
  //               err.style.color  = 'red';
  //               document.getElementById("err").innerHTML = "User Not Found!";	
  //             }
  //           }
  //         }          
  //         if(this.props.loginResponse.isAuthenticated === true){
  //           // return <Redirect to={{ pathname: '/'}} />
  //           this.props.history.push({
  //             pathname:'/profile',            
  //           });
  //         }
  //     })    
  //     e.preventDefault();  
  // }

  // handleChange(e) {
  //   const { name, value } = e.target;
  //   this.setState({ [name]: value });
  // }
  
  render() {
    //   console.log("Props::",this.props);
    // console.log("this.props.loginResponse::",this.props.loginResponse);
    // console.log("this.props.loginResponse",this.props.loginResponse.auth);
    // console.log("this.props.loginResponse",this.props.loginResponse.reason);
    // console.log("this.props.loginResponse",this.props.loginResponse.accessToken);
    // const { loggingIn } = this.props;    
    const { email, password, reset, submitted } = this.state;
    return (
      <Layout>
      <div className="login-dark">
      <ToastContainer />
      {/* <div className="bckg"> */}
                <Form method='post' style={{width:'320px',margin:'0px'}}>
                    <div style={{animation: 'zoomin 3s', transition:"all .4s"}}>

                        {   
                            this.state.loginMsg ?                         
                            <div className="alert alert-danger alert-error text-center">
                                {
                                    this.state.loginMsg === 'Please Enter a Valid Email Address' &&
                                    <span className="badge badge-pill badge-danger">{this.state.loginMsg}</span>
                                }
                                {
                                    this.state.loginMsg === 'Email ID or password Invalid' &&
                                    <span className="badge badge-pill badge-danger">{this.state.loginMsg}</span>
                                }                                
                                {
                                    this.state.loginMsg === 'Invalid Password!' &&
                                    <span className="badge badge-pill badge-danger">{this.state.loginMsg}</span>
                                }
                                {
                                    this.state.loginMsg === 'User Not Found.' &&
                                    <span className="badge badge-pill badge-danger">{this.state.loginMsg}</span>
                                }
                            </div>
                            :null
                        }
                                    {/*<div className="alert alert-success alert-success text-center">
                                        <span className="badge badge-pill badge-success">Success </span>

                                    </div>*/}
                                        <h2 className="sr-only">Login Form</h2>
                                        <div data-bs-hover-animate="pulse" className="illustration" >
                                            {/*<img src="../static/images/logo_bakbak.png" alt="Logo" height="160px"/>*/}
                                            <img src={require("../../static/Icons/man.png")} alt="Logo" height="160px"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="email"
                                                   placeholder="User Email"
                                                   value={this.state.loginFormData.email}
                                                   className="form-control"
                                                   className={`form-control ${this.state.validationTestSignIn && (!Validation.stringValidate(this.state.loginFormData.email) && 'error-bottom-outline')}`}
                                                   onChange={this.getSignInFormValue.bind(this)}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" name="password"
                                                   value={this.state.loginFormData.password}
                                                   className="form-control"
                                                   className={`form-control ${this.state.validationTestSignIn && (!Validation.stringValidate(this.state.loginFormData.password) && 'error-bottom-outline')}`}
                                                   onChange={this.getSignInFormValue.bind(this)}
                                                   placeholder="Password"/>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-outline-primary active btn-block btn-lg" data-bs-hover-animate="shake" id="waitMe_ex"
                                            onClick={this.signIn.bind(this)}
                                                    disabled={this.state.loading}
                                            >Log In</button>
                                        </div>
                                        <a className="forgot">Dont have Account? <span className="primary"
                                        onClick={this.signUp.bind(this)}
                                        >Sign Up Today</span></a>
                    </div>
                </Form>
            </div>

                <Modal backdrop="static" keyboard={true}
                       isOpen={this.state.modal}
                       toggle={this.toggle}
                       /*className="fixed right-off top-off margin-top-off animated slideInRight"*/ style={{minWidth:'80%'}}>
                    <ModalHeader toggle={this.toggle}>User SignUp</ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <Form>
                                <Row>
                                    <Col sm={3}>
                                        <FormGroup>
                                            <Label for="exampleFirstName">FirstName</Label>
                                            <Input type="text" name="firstName" id="examplefirstname"
                                                   placeholder="FirstName"
                                                   value={this.state.signUpFromData.firstName}
                                                   className={`${this.state.validationTest && (!Validation.stringValidate(this.state.signUpFromData.firstName) && 'error')}`}
                                                   onChange={this.getFormValue.bind(this)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col sm={3}>
                                        <FormGroup>
                                            <Label for="examplePassword">LastName</Label>
                                            <Input type="text" name="lastName" id="exampleLastName"
                                                   placeholder="LastName"
                                                   value={this.state.signUpFromData.lastName}
                                                   className={`${this.state.validationTest && (!Validation.stringValidate(this.state.signUpFromData.lastName) && 'error')}`}
                                                   onChange={this.getFormValue.bind(this)}/>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={3}>
                                        <FormGroup>
                                            <Label for="examplePassword">Phone</Label>
                                            <Input type="number" name="phone" id="examplephone"
                                                   placeholder="Phone Number"
                                                   value={this.state.signUpFromData.phone}
                                                   className={`${this.state.validationTest && (!Validation.mobileNumberValidate(this.state.signUpFromData.phone) && 'error')}`}
                                                   onChange={this.getFormValue.bind(this)}/>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={3}>
                                        <FormGroup>
                                            <Label for="exampleemail">Email</Label>
                                            <Input type="email" name="email" id="emailexample"
                                                   placeholder="EmailID"
                                                   value={this.state.signUpFromData.email}
                                                   className={`${this.state.validationTest && (!Validation.emailValidate(this.state.signUpFromData.email) && 'error')}`}
                                                   onChange={this.getFormValue.bind(this)}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                
                                <Row>
                                    <Col sm={4}>
                                        <FormGroup>
                                            <Label for="state">State</Label>
                                            <Input type="text" name="state" id="emailState" placeholder="State"
                                                   value={this.state.signUpFromData.state}
                                                   className={`${this.state.validationTest && (!Validation.stringValidate(this.state.signUpFromData.state) && 'error')}`}
                                                   onChange={this.getFormValue.bind(this)}/>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={4}>
                                        <FormGroup>
                                            <Label for="examplePassword">City</Label>
                                            <Input type="text" name="city" id="exampleCity" placeholder="City"
                                                   value={this.state.signUpFromData.city}
                                                   className={`${this.state.validationTest && (!Validation.stringValidate(this.state.signUpFromData.city) && 'error')}`}
                                                   onChange={this.getFormValue.bind(this)}/>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={4}>
                                        <FormGroup>
                                            <Label for="Pin">Pin</Label>
                                            <Input type="number" name="pin" id="examplePin" placeholder="Pincode"
                                                   value={this.state.signUpFromData.pin}
                                                   className={`${this.state.validationTest && (!Validation.stringValidate(this.state.signUpFromData.pin) && 'error')}`}
                                                   onChange={this.getFormValue.bind(this)}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <Label for="exampleAddress">Address</Label>
                                            <Input type="textarea" name="address" id="idaddress" placeholder="Full Address"
                                                   value={this.state.signUpFromData.address}
                                                   className={`${this.state.validationTest && (!Validation.stringValidate(this.state.signUpFromData.address) && 'error')}`}
                                                   onChange={this.getFormValue.bind(this)}/>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={3}>
                                    <FormGroup>
                                            <Label for="examplePin">Unique Id Type</Label>
                                            <Input type="text" name="uniqueidtype" id="uniqueidtype" placeholder="Unique Id Type"
                                                    value={this.state.signUpFromData.uniqueidtype}
                                                    className={`${this.state.validationTest && (!Validation.stringValidate(this.state.signUpFromData.uniqueidtype) && 'error')}`}
                                                    onChange={this.getFormValue.bind(this)}/>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={3}>                                                                                
                                        <FormGroup>
                                            <Label for="examplePin">Unique Id No</Label>
                                            <Input type="text" name="uniqueid" id="uniqueid" placeholder="uniqueid Number"
                                                    value={this.state.signUpFromData.uniqueid}
                                                    className={`${this.state.validationTest && (!Validation.stringValidate(this.state.signUpFromData.uniqueid) && 'error')}`}
                                                    onChange={this.getFormValue.bind(this)}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>                                    
                                    <Col sm={4}>
                                        <FormGroup>
                                            <Label for="examplePassword">password</Label>
                                            <Input type="password" name="password" id="examplepassword" placeholder="Password"
                                                   value={this.state.signUpFromData.password}
                                                   className={`${this.state.validationTest && (!Validation.stringValidate(this.state.signUpFromData.password) && 'error')}`}
                                                   onChange={this.getFormValue.bind(this)}/>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={4}>
                                        <FormGroup>
                                            <Label for="examplePassword">Confirm password</Label>
                                            <Input type="password" name="rePassword" id="confirmPassword" placeholder="Confirm Password"
                                                   value={this.state.signUpFromData.rePassword}
                                                   className={`${this.state.validationTest && (!Validation.stringValidate(this.state.signUpFromData.rePassword) && 'error')}`}
                                                   onChange={this.getFormValue.bind(this)}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>

                        </div>

                    </ModalBody>
                    <ModalFooter>
                        {
                            !this.state.passwordChecking &&
                            <span className="font-3x red-text absolute left-0-5x" style={{color: 'blue'}}>Password And Confirm Password are not Same</span>
                        }

                        <Button color="primary" disabled={this.state.loading} onClick={this.addUser.bind(this)}>Save</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
    </Layout>
    )
  }
}


const mapStateToProps = state => ({  
  loginResponse: state.authReducer,
  token: state.authReducer.token,  
  isAuthenticated: state.authReducer.isAuthenticated
});
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(SignIn));