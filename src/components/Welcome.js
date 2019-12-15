import React, { Component } from 'react'
import Layout from '../_Layouts/Header'
import "./welcome.css"
import { useSpring, animated } from 'react-spring'
import { Badge, Row, Col , FormGroup, Label, Input, Button , Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle , Container} from 'reactstrap';
import {Link} from 'react-router-dom'


export function CardImage() {
        const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
        const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`
        const trans2 = (x, y) => `translate3d(${x / 8 + 35}px,${y / 8 - 230}px,0)`
        const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`
        const trans4 = (x, y) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`

        const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))
        return (
          <div className="container" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
            <animated.div className="card1" style={{ transform: props.xy.interpolate(trans1) }} />
            <animated.div className="card2" style={{ transform: props.xy.interpolate(trans2) }} />
            <animated.div className="card3" style={{ transform: props.xy.interpolate(trans3) }} />
            <animated.div className="card4" style={{ transform: props.xy.interpolate(trans4) }} />
          </div>
        )
}
export default class Welcome extends Component {
    render() {
        return (
            <Layout>
                <Row>
                    <Col sm={12}>
                        <section className="fixed full-width blue accent-10 thin-border-bottom" style={{height: '100%'}}>
                            <section className="left-3x absolute top-x">
                                <img src={require("../static/images/logo2.png")} alt="Logo" width={70} height={70} className="inline"/>                                
                                <span className="white-text" style={{lineHeight:"60px"}}>
                                <label className="logo-font font-4x margin-left-x bold"> Villa</label>
                                <label style={{lineHeight:0}} className="font-1-4x margin-left-2x padding-left-2x block lighter">
                                    Stay Anywhere
                                </label>
                            </span>
                            </section>
                            <article style={{width:500}} className="margin-top-3x padding-5x absolute">
                                <h3 className="white-text lightest" style={{fontSize:20}}>Unique Villas specialize on luxurious villa rentals, offering quality accommodation. Book today your next vacation. Book online. No Booking Fees. Best Price Guarantee. 24/7 Customer Service. Unique Villa Rentals. 2020 Deals & Offers.</h3>                                
                            </article>
                            <article className="width-50 right-off absolute">                                        
                                        <label className="capitalize absolute font-1-5x bolder white-text margin-top-2x high-z-index right-3x">
                                            <i className="material-icons font-2-5x relative top-0-5x">lock_outline</i>
                                            <Link to="/signin" style={{color:'#f8f9fa'}}>Click to login</Link>
                                        </label>
                                <Row>
                                    <Col sm={12} className="black full-width full-height loader-opacity absolute" style={{left: '12%'}}>
                                            <img src={require("../static/images/home1.jpg")} 
                                            alt="No Image Available"className="hvr-grow-shadow"
                                            style={{zoom:"55%" ,
                                            borderLeft: '10px solid yellow',
                                            borderTopLeftRadius: '28em' ,
                                            borderBottomLeftRadius: '31em'}}/>                    
                                    </Col>
                                </Row>
                            </article>
                        </section>
                    </Col>
                </Row>

                <div className="container-fluid margin-top-0-5x" 
                    style={{
                        position: 'absolute', 
                        bottom: '0%', height: '50%' , 
                        backgroundColor: '#ffffb3' , 
                        backgroundImage: `url(${require("../static/images/login_bg.jpeg")})`
                        }} 
                        >
                    <Row style={{marginLeft: '0%', marginTop: '3%'}}>                
                        <Col sm={3}>
                            <Card className="hvr-grow-shadow bg-color-white" style={{width: '100%'}}>
                                <CardBody>
                                    <Row className="blue accent-4">
                                        <Col>
                                            <CardText className="text-center">Offer</CardText>
                                        </Col>
                                    </Row>
                                    <div className="">
                                        <img src={require("../static/images/special_offer3.jpeg")} width="50%" height="40%" className="margin-left-5x box-shadow" alt=""/>
                                    </div>

                                    <CardText className="grey-text font-weight-bolder text-center">We are offering you to see our special discount package.</CardText>
                                    <Row className="green accent-4">
                                        <Col>
                                            <CardText className="text-center">Avail Offer</CardText>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm={3}>
                            <Card className="hvr-grow-shadow bg-color-white" style={{width: '100%'}}>
                                <CardBody>
                                    <Row className="blue accent-4">
                                        <Col>
                                            <CardText className="text-center">Contact Us</CardText>
                                        </Col>
                                    </Row>
                                    <div className="">
                                        <img src={require("../static/images/contact_us.jpeg")} width="50%" height="40%" className="margin-left-5x box-shadow" alt=""/>
                                    </div>

                                    <CardText className="grey-text font-weight-bolder text-center">Contact with us for any kind of help.We are here for you.</CardText>
                                    <Row className="green accent-4">
                                        <Col>
                                            <CardText className="text-center">Visit</CardText>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm={3}>
                            <Card className="hvr-grow-shadow bg-color-white" style={{width: '100%'}}>
                                <CardBody>
                                    <Row className="blue accent-4">
                                        <Col>
                                            <CardText className="text-center">Contact Us</CardText>
                                        </Col>
                                    </Row>
                                    <div className="">
                                        <img src={require("../static/images/contact_us.jpeg")} width="50%" height="40%" className="margin-left-5x box-shadow" alt=""/>
                                    </div>

                                    <CardText className="grey-text font-weight-bolder text-center">Contact with us for any kind of help.We are here for you.</CardText>
                                    <Row className="green accent-4">
                                        <Col>
                                            <CardText className="text-center">Visit</CardText>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm={3}>
                            <Card className="hvr-grow-shadow bg-color-white" style={{width: '100%'}}>
                                <CardBody>
                                    <Row className="blue accent-4">
                                        <Col>
                                            <CardText className="text-center">Contact Us</CardText>
                                        </Col>
                                    </Row>
                                    <div className="">
                                        <img src={require("../static/images/contact_us.jpeg")} width="50%" height="40%" className="margin-left-5x box-shadow" alt=""/>
                                    </div>

                                    <CardText className="grey-text font-weight-bolder text-center">Contact with us for any kind of help.We are here for you.</CardText>
                                    <Row className="green accent-4">
                                        <Col>
                                            <CardText className="text-center">Visit</CardText>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>



                    </Row>
                </div>

            </Layout>
        )
    }
}
