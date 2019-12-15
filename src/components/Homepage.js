import React, { Component } from 'react'
// import Layout from './_Layouts/Layout';
export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date().toISOString().slice(0, 10),
            dateCheck:false,
            selectedDays:0,
            isLogin: false
        };

    }
    render() {
        return (
            <div>
                
                Homepage

            </div>
        )
    }
}
