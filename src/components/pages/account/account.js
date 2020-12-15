import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";

import UpdatePasswordForm from "../forms/updatePasswordForm";
import UserDetails from "./userDetails";
import PageTitle from "../../utils/pageTitle";
import Spacer from "../../utils/spacer";

class Account extends Component {
	componentDidUpdate(prevProps) {
		if (this.props.logged_in != prevProps.logged_in) {
			if (!this.props.logged_in) {
				this.props.history.push("/signin");
			}
		}
	}

	componentDidMount() {
		if (!this.props.logged_in) {
			this.props.history.push("/signin");
		}
	}

	render() {
		return (
			<div className="account">
				<PageTitle className="account__title" title="User Account" />

				<Spacer defaultSize="50" />

				<div className="account__intro">
					Stay tuned for more user account features.
				</div>

				<Spacer defaultSize="50" />

				<div className="account__info">
					<div className="account__info__title">Account Details</div>
					<UserDetails
						className="account__info__user-details"
						{...this.props}
					/>
				</div>

				<Spacer default-size="50" />

				<div className="account__password">
					<div className="account__password__title">
						Update Password
					</div>
					<UpdatePasswordForm className="account__password__update-password" />
				</div>
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
