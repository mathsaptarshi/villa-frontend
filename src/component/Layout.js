const Layout = (props) => (

    <div>
        <Head>
            <title>Villa</title>

            <meta charSet="utf-8"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
            <meta httpEquiv="Pragma" content="no-cache"/>
            <meta httpEquiv="Expires" content="-1"/>
            <meta name="theme-color" content="#153DD1" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

            {/* Font Awesome Icons */}
            <link href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" rel="stylesheet"/>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.min.css" />

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>

            <link rel="stylesheet" href="/static/styles/styles.min.css"/>
            <link rel="stylesheet" href="/static/styles/waitMe.css"/>

            {/*<link rel="stylesheet" href="/static/styles/style.css"/>*/}
            <link rel="stylesheet" href="/static/styles/global.min.css"/>
            <link rel="stylesheet" href="/static/styles/animate.min.css"/>


            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/js/bootstrap.bundle.min.js"></script>
            <script src="../static/js/waitMe.js"></script>

        </Head>
        { props.children }
    </div>
)
export default Layout;
