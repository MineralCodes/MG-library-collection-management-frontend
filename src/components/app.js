import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";
import { checkLoggedInStatus } from "../functions/userFunctions";

import NavBar from "./utils/mainNav";
import Footer from "./utils/footer";

import Home from "./pages/home";
import SignIn from "./pages/forms/signIn";
import SignUp from "./pages/forms/signUp";
import Results from "./pages/searchResults";
import Search from "./pages/search";
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

class App extends Component {
	componentDidMount() {
		//checkLoggedInStatus(this.props._id, this.props.setUserInfo);
	}

	render() {
		return (
			<div className="app">
				<NavBar />
				<div className="content">
					<Switch>
						<Route path="/account" component={Account} />
						<Route path="/signin" component={SignIn} />
						<Route path="/signup" component={SignUp} />
						<Route path="/search" component={Search} />
						<Route path="/results" component={Results} />
						{this.props.role == "admin" ? (
							<Route path="/book/create" component={BookForm} />
						) : (
							""
						)}
						<Route path="/" exact component={Home} />
						<Route component={NoMatch} />
					</Switch>
				</div>
				<Footer />
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { _id, role, loggedIn } = state.user;
	return { _id, role, loggedIn };
}

App = withRouter(connect(mapStateToProps, actions)(App));

export default App;
