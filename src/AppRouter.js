import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
// import { ActionCreators } from './redux/action';
// import { AuthActionCreators } from './redux/action'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import _ from 'lodash';

// import SignUp from './Auth/SignUp';
// import Dashboard from './dashboard/Dashboard';
// import Homepage from './dashboard/Homepage';
// import NoMatch from './layout/NoMatch'

import Welcome from './components/Welcome';
import ImageGallery from './components/ImageGallery/ImageGallery';
import SignIn from './components/_Auth/SignIn';
import VillaList from './components/_Villa/List';
import Main from './components/_Admin/Main';
import VillaDetails from './components/_Admin/VillaDetails'
import Profile from './components/_Users/UserProfile'
import MapTest from './components/Test/MapTest';
// import Homepage from './components/Homepage'
// import Contacts from './components/Contacts'
// import Abouts from './components/Abouts';
// import Service from './components/Service';
// import Profile from './components/User/Profile';

import AdminLogin from './components/_Auth/AdminLogin';
import SocialLogin from './components/_Auth/SocialLogin';
// import Booking from './components/User/Booking';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        (localStorage.getItem('userKey'))
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
    )} />
)
export const PrivateRouteAdmin = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
      (localStorage.getItem('adminKey'))
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  )} />
)
export function NoMatch({ location }) {
	return (
	  <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
	  </div>
	);
}

class AppRouter extends Component {
    constructor(props){
        super(props);
            this.state={
                isAuthenticated: false
            }
            // if(this.props.isAuthenticated===true){
            //     this.setState({isAuthenticated: true})
            // }else{
            //     this.setState({isAuthenticated: false})
            // }            
        }
        // componentDidMount(){
            
        //     if(!this.props.loginResponse){
        //         this.setState({isAuthenticated: true})
        //     }
        //     else{
        //         this.setState({isAuthenticated: false})
        //     }
        // }

  render() {
    let auth=this.props.isAuthenticated;
    // console.log("RESPONSE::::",this.props.isAuthenticated)
    return (
      <div>
          <Router>
            <Switch>
              <Route exact path='/' component={Welcome} />         
              <Route path='/gallery' component={ImageGallery} />
              <Route path='/signin' component={SignIn} />
              <PrivateRoute path='/villalist' component={VillaList} />
              <Route path='/adminlogin' component={AdminLogin} />
              <PrivateRouteAdmin path='/main' component={Main} />
              {/* <Route path='/main' component={Main} /> */}
              <PrivateRouteAdmin path='/villadetails' component={VillaDetails} />
              <Route path='/profile' component={Profile} />
              <Route path='/sociallogin' component={SocialLogin} />
              <Route path='/maptest' component={MapTest} />
              <Route component={NoMatch} />
            </Switch>
          </Router>        
      </div>
    )
            
    //     if(auth){  
    //     return (
    //       <div>
    //         <Navbar />
    //         <Sidebar />
    //         <Router>
    //         <Switch>                
    //             <PrivateRoute path='/' component={Dashboard} />
    //             <PrivateRoute path='/chartjs' component={Chartjs} />
    //             <Route path='/signout' component={SignOut} />
	//  		<Route path='/signup' component={SignUp} />
	//  			<Route component={NoMatch} />
    //         </Switch>
    //         </Router>
    //         <Footer />
    //       </div>
    //     );      
    // }
    // else{
    //     return (
    //         <div>            
    //             {/* <SignedOutLinks /> */}
    //             {/* <SignedOutSidebar /> */}
    //             <Router>
    //             <Switch>                
    //                 <Route exact path='/' component={Homepage} />
    //                 <Route path='/signin' component={SignIn} />
    //                 <Route path='/signout' component={SignOut} />
    //                 <Route component={NoMatch} />
    //             </Switch>
    //         </Router>
    //         </div>
    //     )
    //     }


    }}
export default AppRouter
// const mapStateToProps = state => ({
//     loginResponse: state.authReducer.loginResponse,
//     isAuthenticated: state.authReducer.isAuthenticated
//     // totalRecords:state.appReducer.totalRecords
//   });
//   function mapDispatchToProps(dispatch) {
//     return bindActionCreators(AuthActionCreators, dispatch);
//   }
//   export default connect(mapStateToProps, mapDispatchToProps) (AppRouter);