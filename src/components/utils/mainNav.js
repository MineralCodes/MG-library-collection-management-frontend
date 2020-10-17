import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class NavBar extends Component {
	render() {
		return (
			<div className="navigation">
				<NavLink className="navbar__link" to="/">
					Home
				</NavLink>
				<NavLink className="navbar__link" to="/account">
					Account
				</NavLink>
				<NavLink className="navbar__link" to="/signup">
					Sign Up
				</NavLink>
				<NavLink className="navbar__link" to="/signin">
					Sign In
				</NavLink>
				<NavLink className="navbar__link" to="/book/create">
					Create Record
				</NavLink>
			</div>
		);
	}
}
