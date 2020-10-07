import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "./utils/mainNav";
import Home from "./pages/home";
import SignIn from "./pages/forms/signIn";
import SignUp from "./pages/forms/signUp";
import Results from "./pages/searchResults";
import Account from "./pages/account/account";
import BookForm from "./pages/forms/bookForm";
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
				<div className="navigation">
					<NavBar />
				</div>
				<div className="content">
					<Switch>
						<Route path="/account" component={Account} />
						<Route path="/results" component={Results} />
						<Route path="/book/create" component={BookForm} />
						<Route path="/signin" component={SignIn} />
						<Route path="/signup" component={SignUp} />
						<Route path="/" exact component={Home} />
						<Route component={NoMatch} />
					</Switch>
				</div>
			</div>
		);
	}
}
