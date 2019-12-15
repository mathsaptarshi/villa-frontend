import React from "react";
import '../Asset'

const Header = (props) => (
    <div className="wrapper">        
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta property="og:description" content="A unique platform for manage your Agile Development"/>
            <link rel="icon" href="../static/images/logo.png" type="image/gif"/>
            <link href="https://fonts.googleapis.com/css?family=Roboto:100,300" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet"/>        
        {props.children}
    </div>
);

export default Header