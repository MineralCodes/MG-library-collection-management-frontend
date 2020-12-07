import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { checkLoggedInStatus } from "../../functions/userFunctions";
import LogoutLink from "./LogoutLink";
import SearchBar from "../search/searchBar";

class NavBar extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="navbar">
				<div className="navbar__left navbar-section">
					<NavLink className="navbar__link" to="/">
						Home
					</NavLink>
					{this.props.user_role == "admin" ? (
						<NavLink className="navbar__link" to="/book/create">
							Create Record
						</NavLink>
					) : null}
				</div>

				<div className="navbar__center navbar-section">
					<SearchBar className="navbar__search-bar" />
				</div>

				<div className="navbar__right navbar-section">
					{this.props.logged_in ? (
						<NavLink className="navbar__link" to="/account">
							Account
						</NavLink>
					) : null}
					{this.props.logged_in == false ? (
						<NavLink className="navbar__link" to="/signin">
							Sign In
						</NavLink>
					) : (
						<LogoutLink
							className="navbar__link"
							history={this.props.history}
						/>
					)}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { id, user_role, logged_in } = state.user;
	return { id, user_role, logged_in };
}

NavBar = connect(mapStateToProps, actions)(NavBar);

export default NavBar;
