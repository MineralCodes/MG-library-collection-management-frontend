import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { FormButton, FormInput } from "./formFields";
import { apiUrl } from "../../../config";

class UpdatePasswordForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
			statusMessage: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit() {
		const formObject = {
			id: this.props._id,
			password: this.state.currentPassword,
			new_password: this.state.newPassword,
			confirm_password: this.state.confirmPassword,
		};

		axios
			.post(`${apiUrl}/auth/update-password`, formObject, {
				withCredentials: true,
			})
			.then((resp) => {
				if ((resp.status = 200)) {
					this.setState({
						statusMessage: "Password updated",
					});
				} else if ((resp.status = 406)) {
					this.setState({
						statusMessage:
							"New password and confirm password must match",
					});
				} else if ((resp.status = 401)) {
					this.setState({
						statusMessage:
							"Current password not valid please try again",
					});
				} else if ((resp.status = 404)) {
					this.setState({
						statusMessage: "Server could not find you user account",
					});
				} else {
					this.setState({
						statusMessage:
							"Unknown server error, please try again or contact systems administrator",
					});
				}
				return resp;
			})
			.catch((err) => {
				this.setState({
					statusMessage:
						"There was an unknown server error, please contact the systems adiminstrator",
				});
				console.log("update password error", err);
				return err;
			});
	}

	handleClear() {
		this.setState({
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		});
	}

	render() {
		const { className } = this.props;
		return (
			<form className={`update-password ${className}`}>
				<FormInput
					title="Current Password"
					name="currentPassword"
					type="text"
					placeholder="Enter current password"
					className="update-password__current"
					handleChange={this.handleChange}
					value={this.state.currentPassword}
				/>

				<FormInput
					title="New Password"
					name="newPassword"
					type="text"
					placeholder="Enter new password"
					className="update-password__new"
					handleChange={this.handleChange}
					value={this.state.newPassword}
				/>

				<FormInput
					title="Confirm New Password"
					name="confirmPassword"
					type="text"
					placeholder="Confirm new password"
					className="update-password__confirm"
					handleChange={this.handleChange}
					value={this.state.confirmPassword}
				/>

				<FormButton
					className="update-password__cancel"
					type="button"
					onClick={this.handleClear}
					title="Cancel"
				/>
				<FormButton
					className="update-password__submit"
					type="button"
					onClick={this.handleSubmit}
					title="Submit Changes"
				/>
			</form>
		);
	}
}

function mapStateToProps(state) {
	const { _id } = state.user;
	return { _id };
}

UpdatePasswordForm = connect(mapStateToProps)(UpdatePasswordForm);

export default UpdatePasswordForm;
