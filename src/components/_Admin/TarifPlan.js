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
    FormText, CustomInput, UncontrolledTooltip, ListGroupItemText
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


class TarifPlan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FormData: {
                id: '',
                name: '',
                description: '',
                amountday: '',
                amounthour: '',
                nightcharge: '',
                villatype: '',
                status: ''
            },
            validationTest: false,
            loading: false,
            updateFlag: false,
            tariffList: [],
            noDataFound: false
        }
    }

    componentDidMount() {
         this.getAllTariffDetails();
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

    clearFormData(){
        this.setState({
            FormData: {
                ...this.state.FormData,
                id: '',
                name: '',
                description: '',
                amountday: '',
                amounthour: '',
                nightcharge: '',
                villatype: '',
                status: ''
            },
            validationTest: false,
            loading: false,
            updateFlag: false
        });
    }

    getAllTariffDetails(){

        // axios.get('http://localhost:4000/api/tarif').then((response) => {
            this.props.getalltariff().then((response) => {
            const res = response;
            console.log(res);
            if(res.status === 200 && res.statusText === "OK"){
                if(res.data.tarif.length < 1){

                    this.setState({tariffList: res.data.tarif , noDataFound: true})
                }else{
                    this.setState({tariffList: res.data.tarif , noDataFound: false})
                }
            }else{
                toast.error('Something wrong with tarif List Fetch API');
            }
        }).catch((error) => {
            console.log("Inside catch block fetch all tarif" + error);

        });
    }

    addTariffDetails(){
        this.setState({
            validationTest: true,
            loading: true
        })

        if(Validation.stringValidate(this.state.FormData.name) &&
            Validation.stringValidate(this.state.FormData.description) &&
            Validation.positiveNumber(this.state.FormData.amountday) &&
            Validation.positiveNumber(this.state.FormData.amounthour) &&
            Validation.positiveNumber(this.state.FormData.nightcharge) &&
            Validation.stringValidate(this.state.FormData.villatype) &&
            Validation.stringValidate(this.state.FormData.status)){

            console.log("all validation Done");
            // delete this.state.FormData.id;

            var FormData = {
                name: this.state.FormData.name,
                description: this.state.FormData.description,
                amountday: this.state.FormData.amountday,
                amounthour: this.state.FormData.amounthour,
                nightcharge: this.state.FormData.nightcharge,
                villatype: this.state.FormData.villatype,
                status: this.state.FormData.status,
            }
            console.log(FormData);

            // axios.post('http://localhost:4000/api/tarif/create',FormData).then((response) => {
                this.props.inserttariff(FormData).then((response)=>{
                const res = response;                
                if(res.status === 200 && res.statusText === "OK"){
                    this.setState({loading: false});
                    toast.success('Tariff added successful');
                    this.clearFormData();
                    this.getAllTariffDetails();
                }else{
                    toast.error('Something wrong with Tariff addition');
                    this.setState({loading: false});
                }

            }).catch((error) => {
                console.log("Inside catch block add Tariff" + error);
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


        // axios.get('http://localhost:4000/api/tarif/gettarifbyid/'+id).then((response) => {
            this.props.getalltariffbyid(id).then((response)=>{
            const res = response;
            console.log(res);
            if(res.status === 200 && res.statusText === "OK"){
                console.log(res.data.tarif[0]);
                this.setState({
                    FormData: {
                        ...this.state.FormData,
                        id: res.data.tarif[0].id,
                        name: res.data.tarif[0].name,
                        description: res.data.tarif[0].description,
                        amountday: res.data.tarif[0].amountday,
                        amounthour: res.data.tarif[0].amounthour,
                        nightcharge: res.data.tarif[0].nightcharge,
                        villatype: res.data.tarif[0].villatype,
                        status: res.data.tarif[0].status.toString(),
                    },
                    updateFlag: true
                })            
            }else{
                toast.error('Something wrong with Tariff single Fetch API');
            }


        }).catch((error) => {
            console.log("Inside catch block fetch single Tariff" + error);

        });
    }

    UpdateTariffDetails(){
        this.setState({
            validationTest: true,
            loading: true
        })

        if(Validation.stringValidate(this.state.FormData.name) &&
            Validation.stringValidate(this.state.FormData.description) &&
            Validation.positiveNumber(this.state.FormData.amountday) &&
            Validation.positiveNumber(this.state.FormData.amounthour) &&
            Validation.positiveNumber(this.state.FormData.nightcharge) &&
            Validation.stringValidate(this.state.FormData.villatype) &&
            Validation.stringValidate(this.state.FormData.status)){

            var FormData = {
                name: this.state.FormData.name,
                description: this.state.FormData.description,
                amountday: this.state.FormData.amountday,
                amounthour: this.state.FormData.amounthour,
                nightcharge: this.state.FormData.nightcharge,
                villatype: this.state.FormData.villatype,
                status: this.state.FormData.status,
            }
            console.log(FormData);

            // axios.put('http://localhost:4000/api/tarif/tarifupdate/'+this.state.FormData.id,FormData).then((response) => {
                this.props.updatetariff(this.state.FormData.id,FormData).then((response) => {
                const res = response;
                console.log(res);

                if(res.status === 200 && res.statusText === "OK"){
                    this.setState({loading: false});
                    toast.success('Tariff Updated successful');
                    this.clearFormData();
                    this.getAllTariffDetails();
                }else{
                    toast.error('Something wrong with Tariff Update');
                    this.setState({loading: false});
                }

            }).catch((error) => {
                console.log("Inside catch block Tariff update" + error);
                this.setState({loading: false});
            });
        }else{
            toast.error('One or more required fields are missing');
            this.setState({loading: false});
        }
    }


    render() {

        return (

            <div>
                <div className="jumbotron" id="mainId">
                    <div className="jumbotron margin-top-off tarif-modal">

                        <ListGroup className={'margin-top-off'}>
                            <ListGroupItem className={'margin-bottom-x padding-2x card-shadow pulse-highlight'}>
                                <Row>
                                    <Col sm={3} className={'text-center'}>
                                   <span
                                       className={'pt-1 black-text pointer font-1-8x'}>Tariff Information</span>
                                    </Col>
                                    <Col sm={{size: 3, offset: 7}}
                                         className={'padding-right-off margin-top-0-5x text-center'}>
                                    </Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col sm={3} className={'text-left mt-1'}>
                                        <Label for="title"
                                               className="font-1-4x grey-text text-darken-2 float-left"> Tariff Plan Name</Label>
                                        <Input name="name"
                                            value={this.state.FormData.name}
                                                     className={`${this.state.validationTest && (!Validation.stringValidate(this.state.FormData.name) && 'error')}`}
                                                     onChange={this.getFormValue.bind(this)}
                                               type="text"/>
                                    </Col>
                                    <Col sm={3}>
                                        <Label for="title"
                                               className="font-1-4x grey-text text-darken-2 float-left"> Tariff Status</Label>
                                        <CustomInput type="select" id="exampleCustomSelect" name="status"
                                                     value={this.state.FormData.status}
                                                     className={`${this.state.validationTest && (!Validation.stringValidate(this.state.FormData.status) && 'error')}`}
                                                     onChange={this.getFormValue.bind(this)}>
                                            <option value="">Choose Status</option>
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                        </CustomInput>
                                    </Col>
                                    <Col sm={{size: 3}} className={'text-left mt-1'}>
                                        <Label className="font-1-4x text-darken-2 grey-text float-left">Amount Per/Day</Label>

                                        <InputGroup >
                                            <InputGroupAddon addonType="prepend">RS</InputGroupAddon>
                                            <Input type="number"
                                                   value={this.state.FormData.amountday}
                                                   className={`${this.state.validationTest && (!Validation.positiveNumber(this.state.FormData.amountday) && 'error')}`}
                                                   onChange={this.getFormValue.bind(this)}
                                                   name="amountday"/>
                                        </InputGroup>

                                    </Col>
                                    <Col sm={{size: 3}} className={'text-left mt-1'}>
                                        <Label className="font-1-4x grey-text text-darken-2 float-left">Villa Type</Label>
                                        <Input type="text"
                                               value={this.state.FormData.villatype}
                                               className={`${this.state.validationTest && (!Validation.stringValidate(this.state.FormData.villatype) && 'error')}`}
                                               onChange={this.getFormValue.bind(this)}
                                               name="villatype"/>

                                    </Col>
                                </Row>
                                <Row className="margin-top-1-5x">
                                    <Col sm={6} className={'text-left mt-1'}>

                                        <Label for="desc"
                                               className="font-1-4x grey-text text-darken-2 float-left">Tariff Plan Description</Label>
                                        <textarea name="description"
                                                  value={this.state.FormData.description}
                                                  className={`form-control ${this.state.validationTest && (!Validation.stringValidate(this.state.FormData.description) && 'error')}`}
                                                  onChange={this.getFormValue.bind(this)}
                                                  rows="3"/>
                                    </Col>
                                    <Col sm={{size: 3}} className={'text-left mt-1'}>
                                        <Label className="font-1-4x text-darken-2 grey-text float-left">Amount Per/HR</Label>

                                        <InputGroup >
                                            <InputGroupAddon addonType="prepend">RS</InputGroupAddon>
                                            <Input type="number"
                                                   value={this.state.FormData.amounthour}
                                                   className={`${this.state.validationTest && (!Validation.positiveNumber(this.state.FormData.amounthour) && 'error')}`}
                                                   onChange={this.getFormValue.bind(this)}
                                                   name="amounthour"/>
                                        </InputGroup>

                                    </Col>
                                    <Col sm={{size: 3}} className={'text-left mt-1'}>
                                        <Label className="font-1-4x text-darken-2 grey-text float-left">Night Charge</Label>

                                        <InputGroup >
                                            <InputGroupAddon addonType="prepend">RS</InputGroupAddon>
                                            <Input type="number"
                                                   value={this.state.FormData.nightcharge}
                                                   className={`${this.state.validationTest && (!Validation.positiveNumber(this.state.FormData.nightcharge) && 'error')}`}
                                                   onChange={this.getFormValue.bind(this)}
                                                   name="nightcharge"/>
                                        </InputGroup>

                                    </Col>

                                </Row>

                                <Row className="margin-top-1-5x">
                                    <Col sm={{size: 2, offset: 10}} className={'padding-left-off float-right'}>
                                        {
                                            this.state.updateFlag ?
                                                <Button

                                                    className="float-right btn-action-control box-shadow text-center no-radius ripple padding-0-2x"
                                                    style={{lineHeight: "1px"}}
                                                    onClick={this.UpdateTariffDetails.bind(this)}
                                                    disabled={this.state.loading}>

                                                    <i className="material-icons">system_update_alt</i>

                                                </Button>
                                                :
                                                <Button

                                                    className="float-right btn-action-control box-shadow text-center no-radius ripple padding-0-2x"
                                                    style={{lineHeight: "1px"}}
                                                    onClick={this.addTariffDetails.bind(this)}
                                                    disabled={this.state.loading}>

                                                    <i className="material-icons">check</i>

                                                </Button>
                                        }
                                        <Button
                                            outline
                                            onClick={this.clearFormData.bind(this)}
                                            className="float-right margin-right-0-2x box-shadow text-center no-radius ripple padding-0-2x"
                                            color="secondary" style={{lineHeight: "1px"}}>
                                            <i className="material-icons">close</i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        </ListGroup>

                    </div>

                    <div className="jumbotron tarif-list">

                        <ListGroup className={'padding-2x'}>
                            {
                                this.state.tariffList.length > 0 && this.state.tariffList.map((val, i) =>
                                    <ListGroup key={i}>

                                        <ListGroupItem className={'card-shadow hvr-underline-reveal'} key={i}>
                                            <div className="ribbon__item">
                                        <span className={'white-text bold font-x uppercase text-center ui-success'}>
                                        cheque
                                        </span>
                                            </div>
                                            <ListGroupItemHeading className={'bolder font-1-5x relative mb-0'} style={{top:-10}}>
                                                <Badge color="light" className={'pt-2 pl-2 pr-4 pb-2 font-1-2x thin-border-dashed left-align'}>
                                                    {val.villatype}
                                                </Badge>
                                            </ListGroupItemHeading>
                                            <ListGroupItemHeading className={'bolder font-2x float-left'}>
                                                {val.name}
                                                <i id={"pr__contact-"+i} className={'material-icons grey-text text-darken-2 font-1-8x top-0-2x left-0-5x relative'}>
                                                    info_outline
                                                </i>

                                                <UncontrolledTooltip placement="right" target={"pr__contact-"+i}>
                                            <span className={'grid right left-align padding-0-5x'}>
                                                <b>Per/Day : </b>
                                                <label className={'mt-1'}>
                                                    {val.amountday}
                                                    <br/>
                                                    -------
                                                </label>
                                                <b>per/Hour : </b>
                                                <label className={'mt-1'}>
                                                    {val.amounthour}
                                                    <br/>
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

                                            <ListGroupItemText className={'mt-2 mb-2 clear'}>
                                                <Badge className={'pt-2 pl-0 pr-4 pb-2 transparent font-1-2x no-border black-text left-align'}>
                                                    {val.description} <span className={'font-1-2x grey-text text-darken-4 light relative ml-0'}> <br/>
                                                    <br/>{"Tariff Created At ( " + moment(val.createdAt).format('LL') + " )"}</span>
                                                </Badge>
                                            </ListGroupItemText>

                                            <ListGroupItemText className={'mt-2 mb-0 font-1-2x grey-text text-darken-3'}>
                                                Tariff Status &nbsp;<code>{(val.status)?'Active':'Inactive'}</code>
                                            </ListGroupItemText>

                                            <Badge pill color={'light'} className={'float-right small-border padding-1-5x font-2x absolute right-2x'} style={{bottom: '25px'}}>
                                                {"Night Charges " + val.nightcharge}
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



// export default TarifPlan;
const mapStateToProps = state => ({  
    loginResponse: state.authReducer,
    token: state.authReducer.token,  
    isAuthenticated: state.authReducer.isAuthenticated
  });
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
  }
  export default connect(mapStateToProps, mapDispatchToProps) (withRouter(TarifPlan));




