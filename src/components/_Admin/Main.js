import React, {Component} from 'react';
import { Button, ButtonGroup, Row, Container, Col, ListGroup } from 'reactstrap';

import AuthHeader from '../../component/AuthHeader';

import VillaDetails from "./VillaDetails";
import DriverDetails from "./DriverDetails";
import TarifPlan from "./TarifPlan";
import TotalBooking from "./TotalBooking";


class Main extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            currentConfiguration: ''            
        };
    }

    componentDidMount() {
        if(localStorage.getItem('adminKey')){
            
        }else{
            this.props.history.push({
                pathname:'/'   
            });
        }
    }

    currentConfiguration = (param) => {        
        const parentThis = this;                    
        this.props.history.push({
            pathname:`/main/${param}`
        });
        parentThis.state.currentConfiguration = param;
        parentThis.setState(this.state);
    };

    render() {
        const parentThis = this;
        const state = parentThis.state;
        return (
            <div>
                <AuthHeader/>
                <Container>
                    <Row className="margin-top-2x display-initial">
                        <Col sm={6} className={'no-padding'}>
                            <ButtonGroup>
                                <Button color={'light'} className={"font-1-2x " + (parentThis.state.currentConfiguration === 'VillaDetails' ? 'white small-border grey-text text-darken-4 bolder card-shadow ' : 'grey-text text-darken-3 transparent thin-border')}
                                        onClick={parentThis.currentConfiguration.bind(parentThis,'VillaDetails')}>VillaDetails</Button>
                                <Button color={'light'} className={"font-1-2x " + (parentThis.state.currentConfiguration === 'DriverDetails' ? 'white small-border grey-text text-darken-4 bolder card-shadow ' : 'grey-text text-darken-3 transparent thin-border')}
                                        onClick={parentThis.currentConfiguration.bind(parentThis,'DriverDetails')}>DriverDetails</Button>
                                <Button color={'light'} className={"font-1-2x " + (parentThis.state.currentConfiguration === 'TarifPlan' ? 'white small-border grey-text text-darken-4 bolder card-shadow ' : 'grey-text text-darken-3 transparent thin-border')}
                                        onClick={parentThis.currentConfiguration.bind(parentThis,'TarifPlan')}>TarifPlan</Button>
                                <Button color={'light'} className={"font-1-2x " + (parentThis.state.currentConfiguration === 'totalBooking' ? 'white small-border grey-text text-darken-4 bolder card-shadow ' : 'grey-text text-darken-3 transparent thin-border')}
                                        onClick={parentThis.currentConfiguration.bind(parentThis,'totalBooking')}>TotalBooking</Button>
                                {/*<Button color={'light'} className={"font-1-2x " + (parentThis.state.currentConfiguration === 'paid-user' ? 'white small-border grey-text text-darken-4 bolder card-shadow ' : 'grey-text text-darken-3 transparent thin-border')}
                                        onClick={parentThis.currentConfiguration.bind(parentThis,'paid-user')}>Paid User</Button>
                                <Button color={'light'} className={"font-1-2x " + (parentThis.state.currentConfiguration === 'unpaid-user' ? 'white small-border grey-text text-darken-4 bolder card-shadow ' : 'grey-text text-darken-3 transparent thin-border')}
                                        onClick={parentThis.currentConfiguration.bind(parentThis,'unpaid-user')}>Unpaid User</Button>*/}
                            </ButtonGroup>
                        </Col>
                        {
                            parentThis.state.currentConfiguration === 'VillaDetails' && <VillaDetails />
                        }
                        {
                            parentThis.state.currentConfiguration === 'DriverDetails' && <DriverDetails />
                        }
                        {
                            parentThis.state.currentConfiguration === 'TarifPlan' && <TarifPlan />
                        }
                        {
                            parentThis.state.currentConfiguration === 'totalBooking' && <TotalBooking />
                        }
                        {
                            parentThis.state.currentConfiguration === '_blank' &&
                            <ListGroup className={'padding-2x mt-2'}>
                                <div style={{margin: '20px auto'}} className="grey-text font-weight-bolder font-4x">Choose Any Option</div>
                            </ListGroup>
                        }


                    </Row>
                </Container>
            </div>
            
        )
    }
}
export default Main