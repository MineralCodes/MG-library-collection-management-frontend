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

	componentDidMount() {
		console.log("nav component mounting", this.props.logged_in);
		checkLoggedInStatus(this.props.id, this.props.setUserInfo);
	}

	render() {
		return (
			<div className="navigation">
				<NavLink className="navbar__link" to="/">
					Home
				</NavLink>
				<SearchBar className="navbar__search-bar" navBar={true} />
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
	const { id, user_role, logged_in } = state.user;
	return { id, user_role, logged_in };
}

NavBar = connect(mapStateToProps, actions)(NavBar);

export default NavBar;
