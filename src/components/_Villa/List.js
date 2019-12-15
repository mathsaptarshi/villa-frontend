import React, {Component} from 'react';
import {
    Container,Row,Col,Card,CardImg,Label,CardBody,CardTitle,Badge,CardSubtitle,CardFooter,Button,Modal,
    ModalHeader,ModalBody,ModalFooter,Collapse,FormGroup, Input,InputGroup,InputGroupAddon
} from 'reactstrap';
import AuthHeader from '../../component/AuthHeader';
import ViewModal from './viewModal';
import _ from 'lodash';
import {toast} from "react-toastify";

import { withRouter, Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Layout from '../../_Layouts/Header.js'
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';

class VillaList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            viewModal: false,
            view: false,
            viewIndex:null,
            villaList:true,
            selectValue: '',
            villaDetails: [],
            villaDetailsCopy: [],
            allCarTypeForFilter: [],
            maxVal: '',
            minVal: '',
            maxPrice: '',
            minPrice: '',
            msg:'',
            noDataFound: false
        };
        this.toggle = this.toggle.bind(this);
        this.getAllCarType = this.getAllCarType.bind(this);
    }

    static getInitialProps({query}) {
        return {query}
    }

    getAllVillaDetails(){        
            this.props.getallvilla().then((response)=>{                
            const res = response;            
            if(res.status === 200 && res.statusText === "OK"){
                if(res.data.villas.length < 1){
                    this.setState({villaDetails: res.data.villas ,villaDetailsCopy: res.data.villas, noDataFound: true})
                }else{
                    this.setState({villaDetails: res.data.villas ,villaDetailsCopy: res.data.villas, noDataFound: false})
                }
            }else{
                toast.error('Something wrong with villa List Fetch API');
            }
        }).catch((error) => {
            console.log("Inside catch block fetch all villa" + error);
        });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    
    toggleViewDetails() {
        console.log("toggleViewDetails working");
        console.log(this.state.viewModal);

        this.setState({viewModal: false});
    }

    viewClick = (i) => {
        this.setState({
            view: true,
            viewModal: true,
            viewIndex: i
        },()=>{
            setTimeout(()=>{                
            },500);
        });
    }

    handleChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    getAllCarType = ()=> {
        let allCarType = [];
        let allCarPriceDetails = [];

        _.forEach(this.state.villaDetails, function(value, key) {
            _.forEach(value , function(val,i){
                if(i === 'carType'){
                    allCarType.push(val);
                }

                /*Get All Price From Villa Details*/

                if(i === 'budgetPlanPerHr'){
                    allCarPriceDetails.push(val);
                }
            });

        });
        let uniqueVal = _.uniq(allCarType);
        let uniquePrice = _.uniq(allCarPriceDetails);
        let maxVal = _.max(uniquePrice);
        let minVal = _.min(uniquePrice);
        this.setState({allCarTypeForFilter : uniqueVal , maxVal: maxVal , minVal : minVal},
                        ()=> {
            //console.log(this.state.maxVal)
        });
    }

    filterData = () => {
        const{maxPrice , minPrice , selectValue} = this.state;

        /*this.setState({villaDetailsCopy : this.state.villaDetails});*/

        if(maxPrice !== '' || minPrice !== '' || selectValue !== ''){


            if(maxPrice !== '' && minPrice !== '' && selectValue !== ''){

                if(maxPrice > minPrice){

                   var filterVal =  _.filter(this.state.villaDetailsCopy, (val)=>{
                   return val.budgetPlanPerHr <= maxPrice && val.budgetPlanPerHr >= minPrice && val.carType === selectValue;
                    });

                }else{
                    this.setState({ msg: 'MaxPrice Should Grater'})
                }

                this.setState({villaDetailsCopy : filterVal , msg: ''})
            }

            if(maxPrice !== '' && minPrice !== '' && maxPrice > minPrice){

                var filterVal =  _.filter(this.state.villaDetailsCopy, (val)=>{
                    return val.budgetPlanPerHr <= maxPrice && val.budgetPlanPerHr >=minPrice;
                });

                this.setState({villaDetailsCopy : filterVal , msg: ''})
            }else{

                setTimeout(()=>{
                    this.setState({ msg: 'MaxPrice Should Grater'})
                },200);
                return;
            }

            if(maxPrice !== '' && selectValue !== ''){
                var filterVal =  _.filter(this.state.villaDetailsCopy, (val)=>{
                    return val.budgetPlanPerHr <= maxPrice && val.carType ===selectValue;
                });

                this.setState({villaDetailsCopy : filterVal , msg: ''})
            }

            if(minPrice !== '' && selectValue !== ''){
                var filterVal =  _.filter(this.state.villaDetailsCopy, (val)=>{
                    return val.budgetPlanPerHr >= minPrice && val.carType ===selectValue;
                });

                this.setState({villaDetailsCopy : filterVal , msg: ''})
            }

            if(maxPrice !== ''){
                var filterVal =  _.filter(this.state.villaDetailsCopy, (val)=>{
                    return val.budgetPlanPerHr <= maxPrice;
                });

                this.setState({villaDetailsCopy : filterVal , msg: ''})
            }

            if(minPrice !== ''){
                var filterVal =  _.filter(this.state.villaDetailsCopy, (val)=>{
                    return val.budgetPlanPerHr >= minPrice;
                });

                this.setState({villaDetailsCopy : filterVal , msg: ''})
            }

            if(selectValue !== ''){
                var filterVal =  _.filter(this.state.villaDetailsCopy, (val)=>{
                    return val.carType === selectValue;
                });

                this.setState({villaDetailsCopy : filterVal , msg: ''})
            }


        }else{
            this.setState({msg: 'Please choose any Filter'})
        }
    }

    resetFilter = () => {
        this.setState({   
                                villaDetailsCopy : this.state.villaDetails,
                                maxPrice: '',
                                minPrice: '',
                                selectValue: '',
                                msg:'' });
    }


    componentDidMount() {

        if (localStorage.getItem('adminKey')) {            
            this.props.history.push({
                pathname:'/adminlogin'   
            });
        }
        this.getAllVillaDetails();
    }

    render() {
        return (
            <div>
                {/*Section of Header start*/}
                <AuthHeader/>
                {/*Section of Individual cards*/}
                {
                    (this.state.villaList) ? (
                        <div className="jumbotron bg-white">

                    <div className="margin-top-1x jumbotron" style={{width: '100%'}}>
                        <CardTitle className="font-4x lighter grey-text text-darken-2">Choose Your Villa</CardTitle><hr/>
                        <Row className="margin-top-2x">
                            {this.state.villaDetailsCopy.map((val, i) =>
                                <Col key={i} sm="3"className="margin-bottom-2x animated fadeIn">  {/*hvr-grow*/}

                                    <Card className="box-shadow" style={{width: '100%'}} >
                                        <span className="notify-badge badge">{val.type}</span>
                                       <CardImg top width="100%" src={require("../../static/images/two.jpg")} alt="Card image cap" />
                                        <CardBody>
                                            <CardTitle className="font-weight-lighter no-margin font-weight-light font-2x">
                                                <span>{val.name}</span>
                                            </CardTitle>
                                            <CardTitle className="no-padding">
                                                <span className="font-1-5x logo-font">{val.address}</span>
                                            </CardTitle>
                                        </CardBody>
                                        <div className="row">
                                            <div className="col-6">
                                                {/*<span className="padding-left-1-2x font-2x font-weight-bold">{val.state}</span><br/>*/}
                                                <span className="font-1-7x">{val.state}</span>

                                            </div>
                                            <div className="col-6">
                                                <button onClick={this.viewClick.bind(this, i)} className="float-right btn-primary margin-0-5x  hvr-float-shadow shadow  font-0-9x  no-border padding-0-3x border-radius-25 ">View Details</button>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>


                            )}
                            {/*opening modal*/}
                            {(this.state.view) && <ViewModal welcomePageData={this.props.query}
                                                           modalState={this.state.viewModal}
                                                           toggleViewDetailsModal={this.toggleViewDetails.bind(this)}
                                                           indexNo={this.state.viewIndex}
                                                           data={this.state.villaDetails} />

                            }
                            {/*closing modal*/}
                        </Row>
                        <button onClick={this.toggle}  className="my-circle-fixed fixed bottom-off right-7x"><i className = "material-icons">open_in_browser</i></button>
                    </div>

                        </div>

                    ) :

                        (<div className="container">

                            {/*Section of No Card found*/}

                            <div className="col-sm-3 no-booking-heading-margin primary-color-text">
                                <span className="font-4x font-weight-lighter" >Villa List</span>
                            </div>
                            <Container className="margin-top-3x no-booking-container-height">

                                <Row className="text-center margin-top-5x">
                                    <Col className="">
                                        <p className="grey-text text-lighten-1 font-3x lightest">No villa List to show</p>
                                    </Col>
                                </Row>


                            </Container>



                        </div>)
                }
                {/*Section of Individual cards ENDS*/}
               {/* Filter Modal Section*/}

                <div>

                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader>
                            <span className="font-weight-light font-2x">Filter List</span>
                            {
                                (this.state.msg)?(<span className="font-weight-bold block grey-text font-2x">{this.state.msg}</span>):''
                            }
                            <div onClick={this.toggle} className="absolute right-2x top-0-5x margin-bottom-0-5x pointer">
                                <i className="material-icons">close</i>
                            </div>
                        </ModalHeader>
                        <ModalBody>

                            <div className="row padding-0-7x font-2x font-weight-light heading-panel" style={{background:'#E6ECF3'}}>
                                <div className="col-6 blue-text">
                                    <span>By Amount</span>
                                </div>
                                <div className="col-6">
                                    <span  onClick={this.resetFilter.bind(this)} className=" float-right font-2x green-text pointer font-weight-lighter">Reset Filter</span>
                                </div>
                            </div>

                            {/*max Amount Input*/}
                            <div className="row padding-0-7x heading-panel">
                                <Label>Max Amount</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">Max:</InputGroupAddon>
                                    <Input
                                        type="number"
                                        pattern="[0-9.]*"
                                        name="maxPrice"
                                        onChange={this.handleChange.bind(this)}
                                        value={this.state.maxPrice}
                                        id="examplePriceMax"/>
                                </InputGroup>
                            </div>

                            {/*Min Amount Input*/}

                            <div className="row padding-0-7x heading-panel">
                                <Label>Min Amount</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">Min:</InputGroupAddon>
                                    <Input
                                        type="number"
                                        pattern="[0-9.]*"
                                        name="minPrice"
                                        onChange={this.handleChange.bind(this)}
                                        value={this.state.minPrice}
                                        id="examplePriceMin"/>
                                </InputGroup>
                            </div>
                            <div className="row pointer padding-0-7x font-2x font-weight-light heading-panel margin-top-2x" style={{background:'#E6ECF3'}}>
                                <div className="col-6 blue-text">
                                    <span>By Type</span>
                                </div>
                            </div>

                            {/*By Type*/}

                            <div className="row padding-0-7x heading-panel">
                                <label className="label">Car Type</label>
                                <select className="custom-select"
                                        value={this.state.selectValue}
                                        name="selectValue"
                                        onChange={this.handleChange.bind(this)}>

                                             <option value=''>{'Choose Car Type'}</option>
                                    {
                                        this.state.allCarTypeForFilter.map((item,index)=>
                                            <option key={index} value={item}>{item}</option>
                                        )
                                    }
                                </select>
                            </div>

                            <div className="row padding-0-7x heading-panel">
                                <button onClick={this.filterData.bind(this)} className="full-width border-radius-25 btn-primary padding-0-5x btn-style-filter">Filter From List</button>
                            </div>


                        </ModalBody>
                        {/*<ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Do Something</Button>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>*/}
                    </Modal>
                </div>
            {/* Filter Modal Section End*/}
    </div>
        );
    }
}



const mapStateToProps = state => ({  
    response: state.villaReducer,
  });
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
  }
  export default connect(mapStateToProps, mapDispatchToProps) (VillaList);
