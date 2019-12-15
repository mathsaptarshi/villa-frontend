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
    ListGroupItemText, Collapse
}
    from 'reactstrap';

import _ from 'lodash';
import Chart from 'chart.js';
import {toast} from 'react-toastify';

import { withRouter, Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Layout from '../../_Layouts/Header.js'
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';


class TotalBooking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            collapse2: false,
            bookinglist:[]
        };

    }

    componentDidMount() {
        this.weeklyGraph();
        this.monthlyGraph();
        this.getAllBookingDetails()
    }
    toggle(flag) {
        if(flag === 'weekly'){
            this.setState({ collapse: !this.state.collapse});
        }
        if(flag === 'monthly'){
            this.setState({ collapse2: !this.state.collapse2});
        }

    }

    weeklyGraph(){
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat' , 'sun'],
                datasets: [{
                    label: 'No of Booking per Day',
                    data: [12, 10,5,44,25,3,17],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 139, 68, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(54, 125, 24, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    monthlyGraph(){
        var ctx = document.getElementById('myChart2').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun' , 'Jul'],
                datasets: [{
                    label: 'No of Booking per Month',
                    data: [12, 10,5,44,25,3,17],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 139, 68, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(54, 125, 24, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    getAllBookingDetails(){

        // axios.get('http://localhost:4000/api/Villa').then((response) => {
            this.props.getallbooking().then((response) => {
            const res = response;            
            if(res.status === 200 && res.statusText === "OK"){
                if(res.data.booking.length < 1){
                    this.setState({bookinglist: res.data.booking , noDataFound: true})
                }else{
                    this.setState({bookinglist: res.data.booking , noDataFound: false})
                }
            }else{
                toast.error('Something wrong with Villa List Fetch API');
            }

        }).catch((error) => {
            console.log("Inside catch block fetch all Villa" + error);

        });
    }


    render() {

        return (            
                <div className="">
                    <div className="row mt-3">
                        <div className="col-sm">

                            <ListGroup className={'padding-2x thin-border'}>
                            {
                                this.state.bookinglist.length > 0 && this.state.bookinglist.map((val, i) =>
                                    <ListGroup key={i}>

                                        <ListGroupItem className={'card-shadow mb-2 padding-top-2x padding-left-3x padding-right-3x padding-bottom-x hvr-underline-reveal'}
                                                       style={{width:'50%'}}
                                                       key={i}>

                                            <ListGroupItemHeading className={'bolder font-1-5x relative mb-0'} style={{top:-10}}>
                                                <Badge color="light" className={'pt-2 pl-2 pr-4 pb-2 font-1-2x thin-border-dashed left-align'}>
                                                    Villa Number
                                                </Badge>
                                            </ListGroupItemHeading>
                                            <ListGroupItemHeading className={'bolder font-2x float-left'}>
                                                DriverName
                                                <i id={"pr__contact-"+i} className={'material-icons grey-text text-darken-2 font-1-8x top-0-2x left-0-5x relative'}>
                                                    info_outline
                                                </i>

                                                <UncontrolledTooltip placement="right" target={"pr__contact-"+i}>
                                            <span className={'grid right left-align padding-0-5x'}>
                                                <b>Address : </b>
                                                <label className={'mt-1'}>
                                                    PO Box 1964 Cupertino
                                                    Cupertino, Pin-95015<br/>
                                                    California ,United States
                                                </label>
                                                <b>Contact : </b>
                                                <label className={'mt-1'}>
                                                    Saptarshi
                                                    <br/>23132
                                                </label>
                                            </span>
                                                </UncontrolledTooltip>
                                            </ListGroupItemHeading>

                                            <Button className={'pt-0 pb-0 pl-1 pr-1 relative float-right right-0-5x left-x'} style={{top: "-7px"}} color="link">
                                                {/*<i id={"pr__share-"+i} className={'material-icons relative top-0-2x font-2x'}>share</i>*/}
                                                <img width={25} id={"pr__edit-"+i} className={'padding-0-2x'}
                                                     src={require("../../static/images/edit.png")}/>
                                                <UncontrolledTooltip placement="top" target={"pr__edit-"+i}>
                                                    Action
                                                </UncontrolledTooltip>
                                            </Button>{' '}

                                            <Button id="UncontrolledPopover" className={'pt-0 pb-0 pl-1 pr-1 relative float-right right-0-5x left-x'} style={{top: "-7px"}} color="link">
                                                {/*<i id={"pr__share-"+i} className={'material-icons relative top-0-2x font-2x'}>share</i>*/}
                                                <img width={25} id={"pr__share-"+i} className={'padding-0-2x'}
                                                     src={require("../../static/images/007-share.png")}/>
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

                                            {/*<Button className={'pt-0 pb-0 pl-1 pr-1 relative float-right right-0-5x left-x'}  style={{top: "-7px"}} color="link">
                                                <i id={"pr__download-"+i} className={'material-icons relative top-0-2x font-2x'}>cloud_download</i>
                                                <img id={"pr__download-"+i} width={25} className={'padding-0-2x'}
                                                     src={"/static/images/028-download.png"}/>

                                            </Button>*/}

                                            <ListGroupItemText className={'mt-2 mb-2 clear'}>
                                                <Badge className={'pt-2 pl-0 pr-4 pb-2 transparent font-1-2x no-border black-text left-align'}>
                                                    text <span className={'font-1-2x grey-text text-darken-4 light relative ml-0'}> <br/><br/>Paid /due</span>
                                                </Badge>
                                            </ListGroupItemText>

                                            <ListGroupItemText className={'mt-2 mb-0 font-1-2x grey-text text-darken-3'}>
                                                driver details &nbsp; <code>Licence Number</code>
                                            </ListGroupItemText>

                                            <Badge pill color={'light'} className={'float-right small-border padding-1-5x font-2x absolute right-2x'} style={{bottom: '25px'}}>
                                                Amount
                                            </Badge>
                                        </ListGroupItem>
                                    </ListGroup>
                                )}
                                <div className="container float-right"
                                style={{position: "absolute",
                                        left: "52%",
                                        width: "45%"}}>

                                    <div onClick={this.toggle.bind(this,'weekly')} className="row pointer padding-0-7x font-2x font-weight-lighter" style={{background:'#E6ECF3'}}>
                                        <div className="col-6">
                                            <span>Weekly Graph</span>
                                        </div>
                                        <div className="col-6">
                                            <div className="float-right auto-height pointer"><i className="material-icons">arrow_drop_down</i></div>
                                        </div>
                                    </div>
                                    <div>
                                        <Collapse isOpen={this.state.collapse}>
                                            <canvas id="myChart" width="400" height="400"></canvas>
                                        </Collapse>
                                    </div>
                                    <hr/>
                                    <div onClick={this.toggle.bind(this,'monthly')} className="row pointer padding-0-7x font-2x font-weight-lighter" style={{background:'#E6ECF3'}}>
                                        <div className="col-6">
                                            <span>Monthly Graph</span>
                                        </div>
                                        <div className="col-6">
                                            <div className="float-right auto-height pointer"><i className="material-icons">arrow_drop_down</i></div>
                                        </div>
                                    </div>
                                    <div>
                                        <Collapse isOpen={this.state.collapse2}>
                                            <canvas id="myChart2" width="400" height="400"></canvas>
                                        </Collapse>
                                    </div>

                                </div>

                            </ListGroup>

                        </div>

                    </div>
                </div>            

        );
    }
}

// export default TotalBooking;
const mapStateToProps = state => ({  
    loginResponse: state.authReducer,
    token: state.authReducer.token,  
    isAuthenticated: state.authReducer.isAuthenticated
  });
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
  }
  export default connect(mapStateToProps, mapDispatchToProps) (withRouter(TotalBooking));


