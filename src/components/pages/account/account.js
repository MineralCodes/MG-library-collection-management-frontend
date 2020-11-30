import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";

import { checkLoggedInStatus } from "../../../functions/userFunctions";
import UpdatePasswordForm from "../forms/updatePasswordForm";
import UserDetails from "./userDetails";

class Account extends Component {
	componentDidMount() {
		console.log("account component mounting");
		checkLoggedInStatus(this.props.id, this.props.setUserInfo);
	}

	render() {
		return (
			<div className="account">
				<div className="account__title">User Account</div>
				<UserDetails
					className="account__user-details"
					{...this.props}
				/>
				<UpdatePasswordForm className="account__update-password" />
			</div>
		);
	}
}
//
function mapStateToProps(state) {
	const { id, email, user_role, logged_in } = state.user;
	return { id, email, user_role, logged_in };
}

Account = connect(mapStateToProps, actions)(Account);

export default Account;
