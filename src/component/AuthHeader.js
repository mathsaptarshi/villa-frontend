import React, {Component} from 'react';
import {Link,Router} from 'react-router-dom'
import { Row, Badge, ListGroup, ListGroupItem, Collapse, Navbar, NavbarToggler,  NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown,  DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import Validation from "../components/Common/Validation";
import {toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLogin: false,
            userName: ''
        }
    }

    componentDidMount() {
        let tokenData = localStorage.getItem('userKey');        
        if(tokenData==="null"){
            this.props.history.push({
                pathname:'/signin'   
            });
        }
        else{
            if (localStorage.getItem('userKey')) {                
                let tokenData = Validation.parseJwt(localStorage.getItem('userKey'));
                localStorage.removeItem('adminKey');
                // console.log(tokenData.user.firstname +' '+ tokenData.user.lastname);
                let name = 'Hi ,' + tokenData.user.firstname +' '+ tokenData.user.lastname;
                if(tokenData){
                    this.setState({isLogin : true , userName : name});

                }else{
                    this.setState({isLogin : false , userName : ''});
                }
            }
            
            if (localStorage.getItem('adminKey')) {                
                localStorage.removeItem('userKey');
                let tokenData = Validation.parseJwt(localStorage.getItem('adminKey'));
                console.log(tokenData.admin.name);
                let name = 'Hi Admin ,' + tokenData.admin.firstname +' '+ tokenData.admin.lastname;
                // console.log(tokenData);

                if(localStorage.getItem('userKey')){
                    localStorage.removeItem('userKey');
                    if(tokenData){
                        this.setState({isLogin : true , userName : name});

                    }else{
                        this.setState({isLogin : false , userName : ''});
                    }

                }else{
                    if(tokenData){
                        this.setState({isLogin : true , userName : name});

                    }else{
                        this.setState({isLogin : false , userName : ''});
                    }
                }
            }
        }
    }

    logout = () => {
        console.log("%c logout working","color:red; font-size:20px;");
        localStorage.removeItem('userKey');
        localStorage.removeItem('adminKey');
        localStorage.clear();
        this.props.history.push({
            pathname:'/signin'   
        });
    }
    goToMyBooking = () => {
        console.log("My Booking Section Developed Here::",this.state);
    }

    render() {
        return (
            <Row>
                {/* Design Left side logo */}
                <ListGroup className="padding-left-2x full-width inline-block blue accent-4">
                    <ListGroupItem className="transparent float-left no-border white-text">
                        <span className="logo-font font-4x bold block" style={{lineHeight:"40px"}}>Villa</span>
                        <span className="logo-font font-1-5x lighter">Stay Anywhere</span>
                    </ListGroupItem>
                    {/* Design Icon dropdown*/}
                    <ListGroupItem className="transparent no-border float-right  padding-right-2x padding-top-2x white-text">
                        <UncontrolledDropdown>
                            <DropdownToggle nav caret>
                                <i className="material-icons no-border full-height text-white">person_outline</i>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    {
                                        (this.state.isLogin)?
                                            (<Link to='#' onClick={this.logout.bind(this)}>Logout</Link>):
                                            (<Link to='/signin'>Login</Link>)
                                    }
                                </DropdownItem>
                                <DropdownItem>
                                    <a onClick={this.goToMyBooking.bind(this)} href="#">
                                        My-Booking
                                    </a>
                                </DropdownItem>
                                <DropdownItem divider />
                                {/*<DropdownItem>
                                    <Link route='villa-list'><a href="#">Villa List</a></Link>
                                </DropdownItem>*/}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </ListGroupItem>
                    {/* Design show UserName When Login*/}
                    <ListGroupItem className="transparent float-right no-border white-text">
                        <span className="float-right margin-top-2x  font-weight-lighter font-1-8x">{this.state.userName}</span>
                    </ListGroupItem>
                </ListGroup>

                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    bodyClassName= {'pl-3 pb-3 pt-3 pr-3'}
                    closeOnClick
                    className={'font-1-5x bold'}
                    rtl={false}
                    pauseOnVisibilityChange
                    pauseOnHover
                />
            </Row>
        );
    }
}
export default Index;
