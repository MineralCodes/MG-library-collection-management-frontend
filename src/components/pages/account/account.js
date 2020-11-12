import React, { Component } from "react";
import { connect } from "react-redux";

import UserDetails from "./userDetails";

class Account extends Component {
	componentDidMount() {
		if (!this.props.loggedIn) {
			this.props.history.push("/signin");
		}
	}

	render() {
		return (
			<div className="account">
				<div className="account__title">User Account</div>
				<UserDetails className="account__user-details" />
			</div>
		);
	}
}
//
function mapStateToProps(state) {
	const { user } = state;
	return user;
}

Account = connect(mapStateToProps)(Account);

export default Account;
