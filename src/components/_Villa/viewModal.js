import React, {Component} from 'react';
import { Modal,ModalBody,ModalFooter,ModalHeader,Collapse,Button,CardBody,Card,CardImg,Badge,Label,Input,FormGroup,CustomInput, Col,Row} from "reactstrap";
// import {Link , Router} from '../../routes';
import Validation from "../Common/Validation";
import {toast} from "react-toastify";
import $ from "jquery";
import axios from 'axios';
import swal from 'sweetalert';

import { withRouter, Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Layout from '../../_Layouts/Header.js'
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';


class ViewModal extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleBooking = this.toggleBooking.bind(this);
        this.dateDiffHere = this.dateDiffHere.bind(this);
        this.toggleBook = this.toggleBook.bind(this);
        this.getCharacter = this.getCharacter.bind(this);
        
        this.state = {
            collapse: true,
            startDate: new Date().toISOString().slice(0, 10),
            endDate: null,
            collapseBooking: false,
            totalVal: null,
            tariffList: [],
            tariffId: '',
            selfDriving: false,
            bookingType: '',
            dayHourInput: '',
            bookingModal: false,
            modalBook: true,
            finalizeBooking: [],
            amount: '',
            userLicense: '',
            hour: ''
        };          
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse , collapseBooking: false });
    }
    toggleBook(){
        this.setState({
            modalBook: true,
            bookingModal: !this.state.bookingModal
        });
    }

    toggleBooking() {
        this.setState({ collapseBooking: !this.state.collapseBooking , collapse : false });
        this.getTariffByVillaType(this.props.data[this.props.indexNo].type);
    }

    // componentDidMount() {
        //console.log("%c component Did Mount","color:red;font-size:20px;");

        // let queryStr = this.props.welcomePageData;
        // console.log("queryStr::::",queryStr);

        // if(queryStr.hasOwnProperty("st_date")){
        //     let data = this.props.welcomePageData;
        //     var days = parseInt(data.days);
        //     var date = new Date(data.st_date);
        //     date.setDate(date.getDate() + days);
        //     this.setState({startDate:data.st_date , endDate: date.toISOString().slice(0, 10) });
        // }else{
        //     //console.log("props empty");
        // }
    // }

    getTariffByVillaType(type){
        // alert(type)              
            this.props.gettarifbyvillatype(type).then((response) => {
            const res = response;
            // console.log(res);
            if(res.status === 200 && res.statusText === "OK"){
                if(res.data.tarif.length > 0){

                    this.setState({tariffList: res.data.tarif})
                }else{
                    this.setState({tariffList: []})
                    toast.info("No Plan Available");
                }
            }else{
                toast.error('Something wrong with tarif List Fetch API');
            }


        }).catch((error) => {
            console.log("Inside catch block fetch single tarif" + error);
        })
    }


    handleChangeStart(e) {
        if(e.target.value < this.state.startDate){
            toast.info("Start date should be today or future Date");
            return false;
        }else{
            this.setState({ startDate : e.target.value});
        }
    }

    handleChangeEnd(e) {
        if(e.target.value < this.state.startDate)
        {
            toast.info("End Date Should be grater than Start Date");
            return false;
        }else{
            var endDate = e.target.value;
            let date =  this.dateDiffHere(this.state.startDate, endDate)
            this.setState({ endDate : endDate , dayHourInput: date});
        }
    }

    getTarifDetailsById(id){        
            this.props.getalltariffbyid(id).then((response) => {
            const res = response;            
            if(res.status === 200 && res.statusText === "OK"){                
                this.setState({
                    amountday: res.data.tarif[0].amountday,
                    amounthour: res.data.tarif[0].amounthour,
                });
            }else{
                toast.error('Something wrong with Tariff single Fetch API');
            }
        }).catch((error) => {
            console.log("Inside catch block fetch single Tariff" + error);

        });
    }



    handelBooking = () => {

        let token = localStorage.getItem('userKey');
        // alert(token);
        if(token==="null"){
            swal({
                title: "Login To Book First?",
                text: "If You Are Not Logged In Then Log In First To Continue Booking ",
                icon: "warning",
                // buttons: true,
                dangerMode: true,
            });
            this.props.history.push({
                pathname:'/signin'   
            });
        }
        else{
        //console.log(this.state.totalValue);
        // console.log(this.dateDiffHere(this.state.startDate, this.state.endDate));
        if(this.state.startDate !=='' && this.state.endDate !== '' && this.state.tariffId !== '' && this.state.bookingType !== ''){

            const bookingData = {
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                tariffId: this.state.tariffId,                
                bookingType: this.state.bookingType,
                villaid: this.props.data[this.props.indexNo].id,
                day: this.dateDiffHere(this.state.startDate, this.state.endDate)
            }
            if(token){
                // toast.success("done");

                let tokenData = Validation.parseJwt(localStorage.getItem('userKey'));
                console.log(tokenData);
                if(this.dateDiffHere(this.state.startDate, this.state.endDate) > 0 && this.state.bookingType === 'day'){
                    // bookingData.amount = 10;
                    // this.getTarifDetailsById(this.state.tariffId);
                    axios.get('http://localhost:4000/api/tarif/gettarifbyid/'+this.state.tariffId).then((response) => {
                        const res = response;                        
                        if(res.status === 200 && res.statusText === "OK"){                            
                            bookingData.amount = ((res.data.tarif[0].amountday * this.state.dayHourInput) + (res.data.tarif[0].nightcharge * this.state.dayHourInput))
                            this.setState({amount: bookingData.amount});

                        }else{
                            toast.error('Something wrong with Tariff single Fetch API');
                        }


                    }).catch((error) => {
                        console.log("Inside catch block fetch single Tariff" + error);

                    });
                }
                if(this.dateDiffHere(this.state.startDate, this.state.endDate) > 0 && this.state.bookingType === 'hour'){

                    axios.get('http://localhost:4000/api/tarif/gettarifbyid/'+this.state.tariffId).then((response) => {
                        const res = response;                        
                        if(res.status === 200 && res.statusText === "OK"){                            
                            bookingData.amount = (res.data.tarif[0].amounthour * this.state.dayHourInput)
                            this.setState({amount: bookingData.amount});

                        }else{
                            toast.error('Something wrong with Tariff single Fetch API');
                        }


                    }).catch((error) => {
                        console.log("Inside catch block fetch single Tariff" + error);
                    });
                }
                if(this.dateDiffHere(this.state.startDate, this.state.endDate) === 0 ){

                    axios.get('http://localhost:4000/api/tarif/gettarifbyid/'+this.state.tariffId).then((response) => {
                        const res = response;                        
                        if(res.status === 200 && res.statusText === "OK"){
                            console.log(res.data.tarif[0]);
                            bookingData.amount = (res.data.tarif[0].amounthour * this.state.dayHourInput)
                            this.setState({amount: bookingData.amount});

                        }else{
                            toast.error('Something wrong with Tariff single Fetch API');
                        }


                    }).catch((error) => {
                        console.log("Inside catch block fetch single Tariff" + error);
                    });
                }
                // bookingData.amount = this.state.amountday;
                bookingData.name =tokenData.user.firstname + ' ' + tokenData.user.lastname;
                bookingData.phone =tokenData.user.phone;
                bookingData.email =tokenData.user.email;
                bookingData.license =tokenData.user.license;
                bookingData.address =tokenData.user.address ;
                bookingData.userid =tokenData.user.id ;
                // console.log(bookingData);
                this.setState({bookingModal: !this.state.bookingModal , finalizeBooking: bookingData}  , () => {
                    console.log("--------------------------------");
                    console.log(this.state.finalizeBooking);
                })
            }else{
                toast.success("Login First To Continue Booking");
                this.props.history.push({
                    pathname:'/signin'   
                });
                swal({
                    title: "Login To Book First?",
                    text: "If You Are Not Logged In Then Log In First To Continue Booking ",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            // Router.push({ pathname: '/Login' })
                        } else {
                            swal("Dont Have Account SignUp First");
                        }
                    });
            }
        }else{
            toast.info("Select Date and tariff to proceed farther");
        }
    }
    }
    /*Util Functions*/

    dateDiffHere = (stDate , edDate) => {
        var date1 = new Date(stDate);
        var date2 = new Date(edDate);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        /*alert(diffDays);*/
        return diffDays;
    }

    getTariffValue(e){        
        this.setState({tariffId: e.target.value},() => {
            console.log(this.state.tariffId);
        });
    }

    confirmCheck = (e) => {
        let token = localStorage.getItem('userKey');        
        if(!token){
            swal({
                title: "Login To Book First?",
                text: "If You Are Not Logged In Then Log In First To Continue Booking ",
                icon: "warning",
                // buttons: true,
                dangerMode: true,
            });
            this.props.history.push({
                pathname:'/signin'   
            });
        }
        else{
            let tokenData = Validation.parseJwt(localStorage.getItem('userKey'));
            console.log(tokenData);
        }
    }

    getBookByValue(e){
        console.log(e.target.value);
        this.setState({bookingType: e.target.value},() => {
            console.log(this.state.bookingType);
        });
    }
    getBookByValueDayHour(e){
        console.log(e.target.value);
        if(this.state.bookingtype === 'hour'){
            this.setState({dayHourInput: e.target.value , hour: e.target.value},() => {
                console.log(this.state.dayHourInput);
            })
        }else{
            this.setState({dayHourInput: e.target.value},() => {
                console.log(this.state.dayHourInput);
            })
        }

    }

    getCharacter(possible) {
        return possible.charAt(Math.floor(Math.random() * possible.length));
    }
    
    uniqueId(stringLength, possible)
    {
        stringLength = stringLength || 5;
        possible = possible || "ABCDEFGHJKMNPQRSTUXY";
        var text = "";

        for(var i = 0; i < stringLength; i++) {
            var character = this.getCharacter(possible);
            while(text.length > 0 && character === text.substr(-1)) {
                character = this.getCharacter(possible);
            }
            text += character;
        }
        return text;
    }

    
    addBooking(){
        let token = localStorage.getItem('userKey');        
        if(!token){
            swal({
                title: "Login To Book First?",
                text: "If You Are Not Logged In Then Log In First To Continue Booking ",
                icon: "warning",
                // buttons: true,
                dangerMode: true,
            });
            this.props.history.push({
                pathname:'/signin'   
            });
        }
        else{

        var FormData = {
            userid: this.state.finalizeBooking.userid,
            tarifid: this.state.finalizeBooking.tarifid,
            bookingcode: this.uniqueId(10),
            bookingtype: this.state.finalizeBooking.bookingtype,
            villaid: this.state.finalizeBooking.villaid,
            crewid: null,
            name:this.state.finalizeBooking.name,
            phone: this.state.finalizeBooking.phone,
            email: this.state.finalizeBooking.email,
            license: this.state.userLicense,
            address: this.state.finalizeBooking.address,
            pickuplocation: "",
            destination: "",
            days:this.state.finalizeBooking.day,
            hours: this.state.hour,
            bookingamount: this.state.amount,
            status: 1,
            ip: null
        }
        // console.log("Form Data::::",FormData);
        this.props.createbooking(FormData).then((response) => {
            const res = response;            
            if(res.status === 200 && res.statusText === "OK"){
                toast.success("Booking Successful")
                console.log(res.data.tarif[0]);
                this.setState({
                    amountday: res.data.tarif[0].amountday,
                    amounthour: res.data.tarif[0].amounthour,
                });
            }else{
                toast.error('Something wrong with Tariff single Fetch API');
            }
        }).catch((error) => {
            console.log("Inside catch block fetch single Tariff" + error);

        });
    }
    }

    render() {
        return (
            <div>
                {/*View details modal section*/}
                <div>
                    <Modal isOpen={this.props.modalState} className="modal-size-view-details">

                        <ModalHeader>
                            <div onClick={this.props.toggleViewDetailsModal.bind(this)} className="absolute right-2x top-0-5x margin-bottom-0-5x pointer">
                                <i className="material-icons">close</i>
                            </div>
                        </ModalHeader>
                        <ModalBody className="modal-size-view-details-body">

                            {/*villa details collaps*/}

                            <div>
                                <div onClick={this.toggle} className="row pointer padding-0-7x font-2x font-weight-lighter" style={{background:'#E6ECF3'}}>
                                    <div className="col-6">
                                        <span>Villa Details</span>
                                    </div>
                                    <div className="col-6">
                                        <div className="float-right auto-height pointer"><i className="material-icons">arrow_drop_down</i></div>
                                    </div>
                                </div>
                                <div>
                                    <Collapse isOpen={this.state.collapse}>
                                        <Card>
                                            <CardBody>
                                                <div className="row">
                                                    <div className="col-6 font-3x ml-4 font-weight-light">
                                                        {this.props.data[this.props.indexNo].name}
                                                    </div>
                                                    <div className="col-5 float-right">
                                                        <img className="collap-img-style" src={require("../../static/images/two.jpg")} alt="Card image cap" />
                                                    </div>
                                                    <div className="col-1"></div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 font-2-5x font-weight-light grey-text margin-left-1-5x">
                                                        {this.props.data[this.props.indexNo].address}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <Badge className="font-weight-light font-1-5x margin-left-2x" color="primary">{this.props.data[this.props.indexNo].type}</Badge>
                                                    </div>
                                                    <div className="col-6 font-4x font-weight-bold">
                                                        <span className="float-right margin-top-neg-0-10x" style={{marginRight: '9rem'}}>{this.props.data[this.props.indexNo].model}</span>

                                                    </div>
                                                </div>

                                            </CardBody>
                                        </Card>
                                    </Collapse>
                                </div>
                            </div>
                            <hr/>

                            {/*booking Details collaps*/}

                            <div>
                                <div onClick={this.toggleBooking}  className="row pointer padding-0-7x font-2x font-weight-lighter" style={{background:'#E6ECF3'}}>
                                    <div className="col-6">
                                        <span>Book Your Villa</span>
                                    </div>
                                    <div className="col-6">
                                        <div className="float-right auto-height pointer"><i className="material-icons">arrow_drop_down</i></div>
                                    </div>
                                </div>
                                <div>

                                    <Collapse isOpen={this.state.collapseBooking}>
                                        <Card>
                                            <CardBody>
                                                <div className="row">
                                                    <div className="col-4">
                                                        <span className="font-1-2x grey-text margin-left-3x">Start Date</span>
                                                    </div>
                                                    <div className="col-4">
                                                        <span className="font-1-2x grey-text margin-left-1-5x">End Date</span>
                                                    </div>
                                                    <div className="col-4">
                                                        <span className="font-2x float-right font-weight-light margin-right-1-5x"></span>
                                                    </div>
                                                </div>
                                                {/*--------------------------------------*/}
                                                <div className="row">
                                                    <div className="col-3">
                                                        <span className="font-1-2x grey-text margin-left-3x">
                                                            <FormGroup className="date-pick-modal">

                                                                <Input
                                                                    type="date"
                                                                    name="startDate"
                                                                    onChange={this.handleChangeStart.bind(this)}
                                                                    selected={this.state.startDate}
                                                                    
                                                                 />
                                                            </FormGroup>
                                                        </span>
                                                    </div>
                                                    <div className="col-3">
                                                        <span className="font-1-2x grey-text margin-left-3x">
                                                            <FormGroup className="date-pick-modal">

                                                                <Input
                                                                    type="date"
                                                                    name="endDate"
                                                                    onChange={this.handleChangeEnd.bind(this)}
                                                                    selected={this.state.endDate}
                                                                    
                                                                />
                                                            </FormGroup>
                                                        </span>
                                                    </div>
                                                    <div className="col-3">
                                                        {/*<Label for="title"
                                                               className="font-1-4x grey-text text-darken-2 float-left"> Tariff Plan</Label>*/}
                                                        <CustomInput type="select" id="exampleCustomSelect" name="plan"
                                                                     onChange={this.getTariffValue.bind(this)}>

                                                            <option value="">Choose Plan</option>
                                                            {
                                                                this.state.tariffList.map((value,i) => (
                                                                    <option value={value.id} key={value.id}>{value.name}</option>
                                                                ))
                                                            }


                                                        </CustomInput>

                                                    </div>
                                                    <div className="col-3">
                                                        <button onClick={this.handelBooking.bind(this)} className="box-shadow border-radius-25 btn-style padding-0-7x font-1-2x">Finalize booking</button>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-6">


                                                        <table className="table">
                                                            <thead>
                                                            <tr>
                                                                <th>per/Day</th>
                                                                <th>per/Hour</th>
                                                                <th>VillaType</th>
                                                                <th>NightCharge</th>
                                                                <th>Name</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                this.state.tariffList.length > 0 && this.state.tariffList.map((val,i) => (
                                                                    <tr key={i}>
                                                                        <td>{val.amountday}</td>
                                                                        <td>{val.amounthour}</td>
                                                                        <td>{val.villatype}</td>
                                                                        <td>{val.nightcharge}</td>
                                                                        <td>{val.name}</td>
                                                                    </tr>
                                                                ))
                                                            }

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="col-3">
                                                        {/* <FormGroup check className="mt-4">
                                                            <Input type="checkbox" name="check" id="checkNow" onChange={this.confirmCheck.bind(this)}
                                                            checked={this.state.selfDriving}/>
                                                            Self Driving
                                                        </FormGroup> */}
                                                        <CustomInput type="select" id="exampleCustomSelect" name="bookBy"
                                                                     className="mt-4"
                                                                     onChange={this.getBookByValue.bind(this)}>

                                                            <option value="">Choose Booking Type</option>
                                                            <option value="day">Per Day</option>
                                                            <option value="hour">Per Hour</option>

                                                        </CustomInput>
                                                        <Label>Days/Hours</Label>
                                                        <Input name="dayHourInput" type="text"
                                                               value={this.state.dayHourInput}
                                                               onChange={this.getBookByValueDayHour.bind(this)}/>
                                                    </div>
                                                    <div className="col-1">

                                                    </div>
                                                    <div className="col-1">
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Collapse>
                                </div>
                            </div>


                        </ModalBody>
                        {/*<ModalFooter>
                            <Button color="primary">Finalize booking</Button>

                        </ModalFooter>*/}
                    
                    </Modal>
                    {
                        this.state.bookingModal &&
                        <Modal isOpen={this.state.modalBook} toggle={this.toggleBook} className="modal-size-booking-details">
                            <ModalHeader>
                                <div onClick={this.toggleBook} className="absolute right-2x top-0-5x margin-bottom-0-5x pointer">
                                    <i className="material-icons">close</i>
                                </div>
                            </ModalHeader>
                            <ModalBody className="modal-size-booking-details-body">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>Email</th>
                                        <th>Day</th>
                                        <th>Phone</th>
                                        <th>Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{this.state.finalizeBooking.name}</td>
                                        <td>{this.state.finalizeBooking.address}</td>
                                        <td>{this.state.finalizeBooking.email}</td>
                                        <td>{this.state.finalizeBooking.day}</td>
                                        <td>{this.state.finalizeBooking.phone}</td>
                                        <td>{this.state.amount}</td>
                                    </tr>

                                    </tbody>
                                </table>
                                <span className="font-weight-light grey-text">Dear user this is your details ............</span>
                                <Row className="mt-3">                                   
                                    {/*<Col>.col</Col>
                                    <Col>.col</Col>
                                    <Col>.col</Col>*/}
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.addBooking.bind(this)}>Confirm Booking</Button>
                                <Button color="secondary" onClick={this.toggleBook}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    }
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({  
    villa_response: state.villaReducer,
    tariff_response: state.tariffReducer,
  });

  function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
  }
  export default connect(mapStateToProps, mapDispatchToProps) (withRouter(ViewModal));
