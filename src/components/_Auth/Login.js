import React, { Component } from 'react'
// import { AuthActionCreators } from '../../redux/action';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import {
    Container,Row, Col, Form,
    FormGroup, Label, Input,
    Button,Card , Modal , ModalHeader, ModalBody, ModalFooter,
    FormText} from 'reactstrap';
import Validation from '../Validation'
import Layout from '../_Layouts/Layout'

class Login extends Component {
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
                license: ''
            }
        }
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        //   console.log(this.props.router.query.action);
          if(localStorage.getItem('userKey')){
              // Router.pushRoute('villa-list');
            //   Router.push({ pathname: '/villaList' })
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
                        license: ''
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
                license: ''
            },
            selfDriving: false,
            validationTest: false,
            passwordChecking: true,
            loading: false
        });
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
            }
        }

        if( Validation.stringValidate(state.signUpFromData.firstName) &&
            Validation.stringValidate(state.signUpFromData.lastName) &&
            Validation.mobileNumberValidate(state.signUpFromData.phone) &&
            Validation.emailValidate(state.signUpFromData.email) &&
            Validation.stringValidate(state.signUpFromData.password) &&
            Validation.stringValidate(state.signUpFromData.rePassword) &&
            Validation.stringValidate(state.signUpFromData.state) &&
            Validation.stringValidate(state.signUpFromData.city) &&
            Validation.positiveNumber(state.signUpFromData.pin) &&
            Validation.stringValidate(state.signUpFromData.address) ){

                console.log("with license");
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
                    license: this.state.signUpFromData.license,
                    driving: this.state.selfDriving
                }
                // axios.post('http://localhost:4000/api/auth/signup',signUpFromData).then((response) => {
                //     const res = response;
                //     console.log(res);
                //     if(res.status === 200 && res.statusText === "OK"){
                //         this.toggle();
                //         this.clearSignUpFormdata();
                //         console.log("User created successfully");
                //     }else{
                //         console.log("Data insertion not successful");
                //         this.clearSignUpFormdata();
                //     }

                // }).catch((error) => {
                //     console.log("Inside catch block add user" + error);
                //     this.clearSignUpFormdata();
                // });

        }
        else{
            console.log("one or more required field are missing");
            this.setState({loading: false});
        }
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
        console.log("working");
        // Router.pushRoute('villa/list');
        this.setState({
            validationTestSignIn: true,
            loading: true
        },() => {
            if(this.state.validationTestSignIn && (!Validation.emailValidate(this.state.loginFormData.email))){
                this.setState({loginMsg: 'Email ID not valid'})
            }else{
                this.setState({loginMsg: ''})
            }
        });

        if(Validation.emailValidate(this.state.loginFormData.email) &&
            Validation.stringValidate(this.state.loginFormData.password)){
            console.log("validation complete");

            var signInFromData = {
                email: this.state.loginFormData.email,
                password: this.state.loginFormData.password
            }
            // axios.post('http://localhost:4000/api/auth/signin',signInFromData).then((response) => {
            //     const res = response;
            //     console.log(res);
            //     // Router.pushRoute('/villa/list');
            //     if(res.status === 200 && res.statusText === "OK"){
            //         this.setState({loginMsg: '' , loading: false});
            //         localStorage.setItem('userKey', res.data.accessToken);
            //         /*let tokenData = Validation.parseJwt(localStorage.getItem('userKey'));
            //         console.log(tokenData);*/
            //         console.log("User login successfully");
            //         this.clearSignInFormData();
            //         // Router.pushRoute('villa-list');
            //         // Router.push({ pathname: '/villaList' })
            //         console.log("------------------");
            //     }else{
            //         console.log("user login not successful");
            //         this.setState({loginMsg: 'Email ID or password Invalid',loading: false});
            //     }

            // }).catch((error) => {
            //     console.log("Inside catch block login user" + error);
            //     this.setState({loginMsg: 'Email ID or password Invalid',loading: false});
            // });
        }else{
            console.log("one or more required field are missing");
            this.setState({loading: false});
        }
    }

    render() {
        return (
            <Layout>
            <div className="login-dark">
                <Form method='post' style={{width:'320px',margin:'0px'}}>
                    <div style={{animation: 'zoomin 3s', transition:"all .3s"}}>

                        {
                            this.state.loginMsg !=='' &&
                            <div className="alert alert-danger alert-error text-center">
                                {
                                    this.state.loginMsg === 'Email ID not valid' &&
                                    <span className="badge badge-pill badge-danger">{this.state.loginMsg}</span>
                                }
                                {
                                    this.state.loginMsg === 'Email ID or password Invalid' &&
                                    <span className="badge badge-pill badge-danger">{this.state.loginMsg}</span>
                                }


                            </div>
                        }


                                    {/*<div className="alert alert-success alert-success text-center">
                                        <span className="badge badge-pill badge-success">Success </span>

                                    </div>*/}

                                        <h2 className="sr-only">Login Form</h2>
                                        <div data-bs-hover-animate="pulse" className="illustration" >
                                            {/*<img src="../static/images/logo_bakbak.png" alt="Logo" height="160px"/>*/}
                                            <img src="../static/Icons/man.png" alt="Logo" height="160px"/>
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


                <Modal backdrop="static" keyboard={false}
                       isOpen={this.state.modal}
                       toggle={this.toggle}
                       /*className="fixed right-off top-off margin-top-off animated slideInRight"*/ style={{minWidth:'50%'}}>
                    <ModalHeader toggle={this.toggle}>User SignUp</ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <Form>
                                <Row>
                                    <Col sm={4}>

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
                                    <Col sm={4}>
                                        <FormGroup>
                                            <Label for="examplePassword">LastName</Label>
                                            <Input type="text" name="lastName" id="exampleLastName"
                                                   placeholder="LastName"
                                                   value={this.state.signUpFromData.lastName}
                                                   className={`${this.state.validationTest && (!Validation.stringValidate(this.state.signUpFromData.lastName) && 'error')}`}
                                                   onChange={this.getFormValue.bind(this)}/>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={4}>
                                        <FormGroup>
                                            <Label for="examplePassword">Phone</Label>
                                            <Input type="number" name="phone" id="examplephone"
                                                   placeholder="Phone Number"
                                                   value={this.state.signUpFromData.phone}
                                                   className={`${this.state.validationTest && (!Validation.mobileNumberValidate(this.state.signUpFromData.phone) && 'error')}`}
                                                   onChange={this.getFormValue.bind(this)}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>

                                        <FormGroup>
                                            <Label for="exampleemail">Email</Label>
                                            <Input type="email" name="email" id="emailexample"
                                                   placeholder="EmailID"
                                                   value={this.state.signUpFromData.email}
                                                   className={`${this.state.validationTest && (!Validation.emailValidate(this.state.signUpFromData.email) && 'error')}`}
                                                   onChange={this.getFormValue.bind(this)}/>
                                        </FormGroup>
                                    </Col>
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
                                    <Col sm={7}>
                                        <FormGroup>
                                            <Label for="exampleAddress">Address</Label>
                                            <Input type="textarea" name="address" id="idaddress" placeholder="Full Address"
                                                   value={this.state.signUpFromData.address}
                                                   className={`${this.state.validationTest && (!Validation.stringValidate(this.state.signUpFromData.address) && 'error')}`}
                                                   onChange={this.getFormValue.bind(this)}/>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={2}>
                                        <FormGroup check className="mt-4">
                                                <Input type="checkbox" name="check" id="checkNow" onChange={this.confirmCheck.bind(this)} />
                                                Do you Know Driving?
                                        </FormGroup>
                                    </Col>
                                    <Col sm={3}>
                                        {
                                            this.state.selfDriving &&
                                            <FormGroup>
                                                <Label for="examplePin">Licence No</Label>
                                                <Input type="text" name="license" id="license" placeholder="License Number"
                                                       value={this.state.signUpFromData.license}
                                                       className={`${this.state.validationTest && (!Validation.stringValidate(this.state.signUpFromData.license) && 'error')}`}
                                                       onChange={this.getFormValue.bind(this)}/>
                                            </FormGroup>
                                        }

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
export default Login;

// const mapStateToProps = state => ({  
//     loginResponse: state.authReducer.loginResponse,
//     token: state.authReducer.token,  
//     isAuthenticated: state.authReducer.isAuthenticated
//   });
//   function mapDispatchToProps(dispatch) {
//     return bindActionCreators(AuthActionCreators, dispatch);
//   }
//   export default connect(mapStateToProps, mapDispatchToProps) (withRouter(SignIn));