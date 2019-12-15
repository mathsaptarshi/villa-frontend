import React, {Component} from 'react';
import {
    Container,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    Button,
    Card,
    CardTitle,
    Badge,
    CardText,
    ListGroupItemHeading,
    UncontrolledCollapse,
    FormGroup,
    FormFeedback,
    FormText,
    CustomInput,
    UncontrolledTooltip,
    Spinner,
    UncontrolledPopover,
    PopoverHeader,
    PopoverBody,
    ListGroupItemText
}
    from 'reactstrap';

import _ from 'lodash';
import Validation from "../Common/Validation";
import axios from "axios";
import {toast} from 'react-toastify';
import $ from "jquery";
import moment from 'moment';

import { withRouter, Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Layout from '../../_Layouts/Header.js'
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';

class DriverDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FormData: {
                id: '',
                name: '',
                phone: '',
                email: '',
                license: '',
                address: '',
                photo: '',
                info: '',
                experience: ''
            },
            validationTest: false,
            loading: false,
            updateFlag: false,
            driverList: [],
            noDataFound: false

        };

    }
    componentDidMount() {
        this.getAllCrewDetails();
    }

    getFormValue(e){
        this.setState({
            FormData: {
                ...this.state.FormData,
                [e.target.name]: e.target.value
            },
            validationTest: false
        },() => {
             console.log(this.state.FormData);
        })
    }
    getAllCrewDetails(){

        // axios.get('http://localhost:4000/api/crew').then((response) => {
            this.props.getallcrew().then((response) =>{
            const res = response;
            console.log(res);
            if(res.status === 200 && res.statusText === "OK"){
                if(res.data.crew.length < 1){

                    this.setState({driverList: res.data.crew , noDataFound: true})
                }else{
                    this.setState({driverList: res.data.crew , noDataFound: false})
                }
            }else{
                toast.error('Something wrong with Crew List Fetch API');
            }


        }).catch((error) => {
            console.log("Inside catch block fetch all crew" + error);

        });
    }

    clearFormData(){
        this.setState({
            FormData: {
                ...this.state.FormData,
                id: '',
                name: '',
                phone: '',
                email: '',
                license: '',
                address: '',
                photo: '',
                info: '',
                experience: ''
            },
            validationTest: false,
            loading: false,
            updateFlag: false
        });
    }

    addCrewDetails(){
        this.setState({
            validationTest: true,
            loading: true
        })

        if(Validation.stringValidate(this.state.FormData.name) &&
            Validation.emailValidate(this.state.FormData.email) &&
            Validation.stringValidate(this.state.FormData.license) &&
            Validation.stringValidate(this.state.FormData.address) &&
            Validation.stringValidate(this.state.FormData.info) &&
            Validation.stringValidate(this.state.FormData.experience) &&
            Validation.mobileNumberValidate(this.state.FormData.phone)){

            console.log("all validation Done");
            // delete this.state.FormData.id;

            var FormData = {
                name: this.state.FormData.name,
                phone: this.state.FormData.phone,
                email: this.state.FormData.email,
                license: this.state.FormData.license,
                address: this.state.FormData.address,
                photo: this.state.FormData.photo,
                info: this.state.FormData.info,
                experience: this.state.FormData.experience
            }
            console.log(FormData);

            // axios.post('http://localhost:4000/api/crew/create',FormData).then((response) => {
            this.props.insertcrew(FormData).then((response) => {
                const res = response;
                console.log(res);

                if(res.status === 200 && res.statusText === "OK"){
                    this.setState({loading: false});
                    toast.success('Crew added successful');
                    this.clearFormData();
                    this.getAllCrewDetails();
                }else{
                    toast.error('Something wrong with crew addition');
                    this.setState({loading: false});
                }

            }).catch((error) => {
                console.log("Inside catch block add crew" + error);
                this.setState({loading: false});
            });
        }else{
            toast.error('One or more required fields are missing');
            this.setState({loading: false});
        }
    }

    UpdateCrewDetails(){
        this.setState({
            validationTest: true,
            loading: true
        })

        if(Validation.stringValidate(this.state.FormData.name) &&
            Validation.emailValidate(this.state.FormData.email) &&
            Validation.stringValidate(this.state.FormData.license) &&
            Validation.stringValidate(this.state.FormData.address) &&
            Validation.stringValidate(this.state.FormData.info) &&
            Validation.stringValidate(this.state.FormData.experience) &&
            Validation.mobileNumberValidate(this.state.FormData.phone)){

            var FormData = {
                name: this.state.FormData.name,
                phone: this.state.FormData.phone,
                email: this.state.FormData.email,
                license: this.state.FormData.license,
                address: this.state.FormData.address,
                photo: this.state.FormData.photo,
                info: this.state.FormData.info,
                experience: this.state.FormData.experience
            }
            console.log(FormData);

            // axios.put('http://localhost:4000/api/crew/crewupdate/'+this.state.FormData.id,FormData).then((response) => {
                this.props.updatecrew(this.state.FormData.id,FormData).then((response) => {
                const res = response;
                console.log(res);

                if(res.status === 200 && res.statusText === "OK"){
                    this.setState({loading: false});
                    toast.success('crew Updated successful');
                    this.clearFormData();
                    this.getAllCrewDetails();
                }else{
                    toast.error('Something wrong with crew Update');
                    this.setState({loading: false});
                }

            }).catch((error) => {
                console.log("Inside catch block crew update" + error);
                this.setState({loading: false});
            });
        }else{
            toast.error('One or more required fields are missing');
            this.setState({loading: false});
        }
    }

    singleFetchUpdateCall(id){
        console.log(id);
        $('html, body').animate({
            scrollTop: $("#mainId").offset().top
        }, 600);


        // axios.get('http://localhost:4000/api/crew/getcrewbyid/'+id).then((response) => {
        this.props.getcrewbyid(id).then((response) => {
            const res = response;
            console.log(res);
            if(res.status === 200 && res.statusText === "OK"){
                console.log(res.data.crew[0]);
                this.setState({
                    FormData: {
                        ...this.state.FormData,
                        id: res.data.crew[0].id,
                        name: res.data.crew[0].name,
                        phone: res.data.crew[0].phone,
                        email: res.data.crew[0].email,
                        license: res.data.crew[0].license,
                        address: res.data.crew[0].address,
                        photo: res.data.crew[0].photo,
                        info: res.data.crew[0].info,
                        experience: res.data.crew[0].experience.toString(),

                    },
                    updateFlag: true
                })

            }else{
                toast.error('Something wrong with villa List Fetch API');
            }


        }).catch((error) => {
            console.log("Inside catch block fetch all villa" + error);

        });
    }



    render() {

        return (

            <div>
                <div className="jumbotron" id="mainId">
                    <div className="jumbotron driverdetails-modal">

                        <ListGroup>                            
                                <ListGroupItemHeading id="cis" className={'pt-1 black-text pointer font-1-8x'}>                                    
                                    Driver Information
                                </ListGroupItemHeading>
                                <UncontrolledCollapse toggler="#cis" isOpen={true}>
                                    <ListGroup className={'mt-3 card-shadow'}>
                                        <ListGroupItem className={'padding-2x'}>
                                           
                                                    <FormGroup className="inline">
                                                        <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>Name</Label>
                                                        <i id="py-is" className={'material-icons font-1-5x top-0-2x'}>info_outline</i>
                                                        <Input type="text" name="name"
                                                               value={this.state.FormData.name}
                                                               className={`${this.state.validationTest && (!Validation.stringValidate(this.state.FormData.name) && 'error')}`}
                                                               onChange={this.getFormValue.bind(this)}
                                                        />
                                                    </FormGroup>
                                          
                                                    <FormGroup className={'mt-4'}>
                                                        <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>Experience</Label>
                                                        <CustomInput type="select" id="exampleCustomSelect" name="experience"
                                                                     value={this.state.FormData.experience}
                                                                     className={`${this.state.validationTest && (!Validation.stringValidate(this.state.FormData.experience) && 'error')}`}
                                                                     onChange={this.getFormValue.bind(this)}>
                                                            <option value="">Year Of Experience</option>
                                                            <option value="1">1 Year</option>
                                                            <option value="2">2 Year</option>
                                                            <option value="3">3 Year</option>
                                                            <option value="4">4 Year</option>
                                                        </CustomInput>

                                                    </FormGroup>
                    
                                            <FormGroup className={'mt-4'}>
                                                <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>Driver description</Label>
                                                <Input type='textarea' name="info"
                                                       value={this.state.FormData.info}
                                                       className={`${this.state.validationTest && (!Validation.stringValidate(this.state.FormData.info) && 'error')}`}
                                                       onChange={this.getFormValue.bind(this)}/>
                                            </FormGroup>

                                            <Row className={'mt-3'}>
                                                <Col sm={3}>
                                                    <FormGroup>
                                                        <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>Phone Number</Label>
                                                        <Input type='number' name="phone"
                                                               value={this.state.FormData.phone}
                                                               className={`${this.state.validationTest && (!Validation.mobileNumberValidate(this.state.FormData.phone) && 'error')}`}
                                                               onChange={this.getFormValue.bind(this)}/>
                                                    </FormGroup>
                                                </Col>
                                                <Col sm={3}>
                                                    <FormGroup>
                                                        <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>Email</Label>
                                                        <Input type='email' name="email"
                                                               value={this.state.FormData.email}
                                                               className={`${this.state.validationTest && (!Validation.emailValidate(this.state.FormData.email) && 'error')}`}
                                                               onChange={this.getFormValue.bind(this)}/>
                                                    </FormGroup>
                                                </Col>
                                                <Col sm={3}>
                                                    <FormGroup>
                                                        <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>Licence Number</Label>
                                                        <Input type='text' name="license"
                                                               value={this.state.FormData.license}
                                                               className={`${this.state.validationTest && (!Validation.stringValidate(this.state.FormData.license) && 'error')}`}
                                                               onChange={this.getFormValue.bind(this)}/>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row className={'mt-2'}>
                                                <Col sm={12}>
                                                    <FormGroup>
                                                        <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>Full Address</Label>
                                                        <Input type='textarea' name="address"
                                                               value={this.state.FormData.address}
                                                               className={`${this.state.validationTest && (!Validation.stringValidate(this.state.FormData.address) && 'error')}`}
                                                               onChange={this.getFormValue.bind(this)}/>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    </ListGroup>
                                </UncontrolledCollapse>                            
                        </ListGroup>

                        <Row>
                            <Col sm={{ size: 3, offset: 9 }}>
                                {
                                    this.state.updateFlag ?
                                        <Button className="float-right brand-primary capitalize text-center mt-4 mr-0 flex"
                                                onClick={this.UpdateCrewDetails.bind(this)}
                                                disabled={this.state.loading}>
                                            Update
                                        </Button>
                                        :
                                        <Button className="float-right brand-primary capitalize text-center mt-4 mr-0 flex"
                                                onClick={this.addCrewDetails.bind(this)}
                                                disabled={this.state.loading}>
                                            Save
                                        </Button>
                                }
                            </Col>

                        </Row>

                    </div>

                    <div className="jumbotron driverdetails-list">

                        <ListGroup className={'padding-2x thin-border'}>
                            {
                                this.state.driverList.length > 0 && this.state.driverList.map((val, i) =>
                                    <ListGroup key={i}>

                                        <ListGroupItem className={'card-shadow mb-2 padding-top-2x padding-left-3x padding-right-3x padding-bottom-x hvr-underline-reveal'} key={i}>
                                            <div className="ribbon__item">
                                        <span className={'white-text bold font-x uppercase text-center ui-success'}>
                                        cheque
                                        </span>
                                            </div>
                                            <ListGroupItemHeading className={'bolder font-1-5x relative mb-0'} style={{top:-10}}>
                                                <Badge color="light" className={'pt-2 pl-2 pr-4 pb-2 font-1-2x thin-border-dashed left-align'}>
                                                    Villa Number
                                                </Badge>
                                            </ListGroupItemHeading>
                                            <ListGroupItemHeading className={'bolder font-2x float-left'}>
                                                {val.name}
                                                <i id={"pr__contact-"+i} className={'material-icons grey-text text-darken-2 font-1-8x top-0-2x left-0-5x relative'}>
                                                    info_outline
                                                </i>

                                                <UncontrolledTooltip placement="right" target={"pr__contact-"+i}>
                                            <span className={'grid right left-align padding-0-5x'}>
                                                <b>Address : </b>
                                                <label className={'mt-1'}>
                                                    {val.address}
                                                    <br/>
                                                    ---
                                                </label>
                                                <b>Contact : </b>
                                                <label className={'mt-1'}>
                                                    {val.email}
                                                    <br/>{val.phone}
                                                </label>
                                            </span>
                                                </UncontrolledTooltip>
                                            </ListGroupItemHeading>

                                            <Button className={'pt-0 pb-0 pl-1 pr-1 relative float-right right-0-5x left-x'} style={{top: "-7px"}} color="link"
                                                    onClick={this.singleFetchUpdateCall.bind(this,val.id)}>
                                                <img width={25} id={"pr__edit-"+i} className={'padding-0-2x'}
                                                     src={require("../../static/images/edit.png")}/>
                                                <UncontrolledTooltip placement="top" target={"pr__edit-"+i}>
                                                    Edit
                                                </UncontrolledTooltip>
                                            </Button>

                                           {/* <Button id="UncontrolledPopover" className={'pt-0 pb-0 pl-1 pr-1 relative float-right right-0-5x left-x'} style={{top: "-7px"}} color="link">
                                                <i id={"pr__share-"+i} className={'material-icons relative top-0-2x font-2x'}>share</i>
                                                <img width={25} id={"pr__share-"+i} className={'padding-0-2x'}
                                                     src={"../../static/images/007-share.png"}/>
                                                <UncontrolledTooltip placement="top" target={"pr__share-"+i}>
                                                    Share via Email
                                                </UncontrolledTooltip>

                                            </Button>

                                            <UncontrolledPopover placement="bottom" className="no-border card-shadow" target="UncontrolledPopover">
                                                <PopoverHeader className={'capitalize'}>enter an email address</PopoverHeader>
                                                <PopoverBody>

                                                    <Input type="text"/>
                                                </PopoverBody>
                                            </UncontrolledPopover>

                                            <Button className={'pt-0 pb-0 pl-1 pr-1 relative float-right right-0-5x left-x'}  style={{top: "-7px"}} color="link">
                                                <i id={"pr__download-"+i} className={'material-icons relative top-0-2x font-2x'}>cloud_download</i>
                                                <img id={"pr__download-"+i} width={25} className={'padding-0-2x'}
                                                     src={"/static/images/028-download.png"}/>

                                            </Button>*/}

                                            <ListGroupItemText className={'mt-2 mb-2 clear'}>
                                                <Badge className={'pt-2 pl-0 pr-4 pb-2 transparent font-1-2x no-border black-text left-align'}>
                                                    {val.info} <span className={'font-1-2x grey-text text-darken-4 light relative ml-0'}> <br/>
                                                    <br/>{"Crew Registered with us from ( " + moment(val.createdAt).format('LL') + " )"}</span>
                                                </Badge>
                                            </ListGroupItemText>

                                            <ListGroupItemText className={'mt-2 mb-0 font-1-2x grey-text text-darken-3'}>
                                                License Number &nbsp;<code>{val.license}r</code>
                                            </ListGroupItemText>

                                            <Badge pill color={'light'} className={'float-right small-border padding-1-5x font-2x absolute right-2x'} style={{bottom: '25px'}}>
                                                {"Experience " + val.experience + " year" }
                                            </Badge>
                                        </ListGroupItem>
                                    </ListGroup>
                                )}



                        </ListGroup>
                        {
                            this.state.noDataFound &&
                            <ListGroup className={'padding-2x mt-2'} style={{border: '2px solid black'}}>
                                <div style={{margin: '20px auto'}} className="grey-text font-1-8x">No Data Found</div>
                            </ListGroup>

                        }
                    </div>




                </div>

            </div>

        );
    }
}



// export default DriverDetails;
const mapStateToProps = state => ({  
    loginResponse: state.authReducer,
    token: state.authReducer.token,  
    isAuthenticated: state.authReducer.isAuthenticated
  });
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
  }
  export default connect(mapStateToProps, mapDispatchToProps) (withRouter(DriverDetails));


