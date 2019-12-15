import React, { Component } from 'react'
import { Jumbotron, Container, Button, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, CardLink} from 'reactstrap'
import AuthHeader from '../../component/AuthHeader'


import { withRouter, Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Layout from '../../_Layouts/Header.js'
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';
import Validation from '../Common/Validation'

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLogin:'',
            user:[]
        }
    }

    componentDidMount(){
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
                console.log(tokenData);
                if(tokenData){
                    this.setState({isLogin : true , user : tokenData.user});

                }else{
                    this.setState({isLogin : false , userName : ''});
                }
            }            
    }
}

    render() {
        // console.log(this.props);
        return (
            <div>
            <AuthHeader />
            <Container>
                <div className="row user-profile">
                    <div className="col-sm-8">
                    <Jumbotron >
                        <h1 className="display-3">Hello, {this.state.user.firstname+' '+this.state.user.lastname}!</h1>
                        <div className="lead">Address:<p>{this.state.user.address}</p></div>
                        <div className="lead">Phone No:<p>This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p></div>
                        <div className="lead">Your Licence:<p>This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p></div>
                        <hr className="my-2" />
                        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>                
                    </Jumbotron>
                    </div>
                    <div className="col-sm-4">
                    <Card>
                        <img width="100%" src={require("../../static/Icons/man.png")} alt="Card image cap" />
                        <CardBody>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <CardLink href="#">Card Link</CardLink>
                        <CardLink href="#">Another Link</CardLink>
                        </CardBody>
                    </Card>
                    </div>
                    <div>                    
                    </div>                    
                </div>            
            </Container>
                
            </div>
          );
        };
}
// export default UserProfile;
const mapStateToProps = state => ({  
    response: state.villaReducer,
  });
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
  }
  export default connect(mapStateToProps, mapDispatchToProps) (UserProfile);
