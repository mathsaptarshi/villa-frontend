import React,{Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import AppRouter from './AppRouter'

import appReducer from './redux/reducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

function configureStore(initialState) {
	const enhancer = compose(
		applyMiddleware(
			thunkMiddleware,
			logger,
		)
	);
	return createStore(appReducer, initialState, enhancer);
}

const store = configureStore({});

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
      localStorage.getItem('token')
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
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

class App extends Component {
	constructor() {
		super();
		this.state = {
			isAuthenticated: false,
			// token: null,
			data:[],
		};	
	}
	render() {
		return (
			<div>
				<div>
				<Provider store={store}>					
					<Router>
						<Switch>
              				<AppRouter />
						</Switch>
					</Router>
				</Provider>
				</div>
			</div>
		);
	}
}
export default App;
