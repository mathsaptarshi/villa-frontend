import '../Asset'
import Head from "next/head";
import React from "react";

const Header = (props) => (
    <div className="wrapper">
        <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta property="og:description" content="A unique platform for manage your Agile Development"/>
            <link rel="icon" href="../static/images/tasks-icon-19.png" type="image/gif"/>
            <link href="https://fonts.googleapis.com/css?family=Roboto:100,300" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet"/>
        </Head>
        {props.children}
    </div>
);

export default Header