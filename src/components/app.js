import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/home";
import Results from "./pages/searchResults";
import Account from "./pages/account/account";
import NoMatch from "./pages/noMatch";

/*TODO
    Navbar
        Sign In/Out
        Create Record
    Recent Titles
    Search
    BOok Details

*/
export default class App extends Component {
	render() {
		return (
			<div className="app">
				<div className="content">
					<Switch>
						<Route path="/account" component={Account} />
						<Route path="/results" component={Results} />
						<Route path="/" exact component={Home} />
						<Route component={NoMatch} />
					</Switch>
				</div>
			</div>
		);
	}
}
