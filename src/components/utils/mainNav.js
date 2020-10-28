import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";

import { logoutUser } from "../../functions/userFunctions";

class NavBar extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="navigation">
				<NavLink className="navbar__link" to="/">
					Home
				</NavLink>
				<NavLink className="navbar__link" to="/search">
					Search
				</NavLink>
				{this.props.loggedIn ? (
					<NavLink className="navbar__link" to="/account">
						Account
					</NavLink>
				) : null}
				{this.props.loggedIn == false ? (
					<NavLink className="navbar__link" to="/signin">
						Sign In
					</NavLink>
				) : null}
				{this.props.user_role == "admin" ? (
					<NavLink className="navbar__link" to="/book/create">
						Create Record
					</NavLink>
				) : null}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { user_role, loggedIn } = state.user;
	return { user_role, loggedIn };
}

NavBar = connect(mapStateToProps, actions)(NavBar);

export default NavBar;
