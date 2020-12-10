import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../../actions";

import { apiUrl } from "../../../config";

import { FormButton, FormInput } from "./formFields";
import PageTitle from "../../utils/pageTitle";
import StatusMessage from "../../utils/statusMessage";

class SignUp extends Component {
	constructor() {
		super();

		this.state = {
			email: "",
			password: "",
			statusMessage: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.clearForm = this.clearForm.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	clearForm() {
		this.setState({
			email: "",
			password: "",
			statusMessage: "",
		});
	}

	componentDidUpdate(prevProps) {
		if (this.props.logged_in != prevProps.logged_in) {
			if (this.props.logged_in) {
				this.props.history.push("/account");
			}
		}
	}

	handleSubmit() {
		if (this.state.email != "") {
			if (this.state.password != "") {
				if (this.state.password == this.state.confirm) {
					axios
						.post(
							`${apiUrl}/auth/register`,
							{
								email: this.state.email,
								password: this.state.password,
								confirm_password: this.state.confirm,
							},
							{ withCredentials: true }
						)
						.then((resp) => {
							if (resp.status == 200) {
								this.props.setUserInfo({
									...resp.data.user,
									logged_in: true,
								});
								this.props.history.push("/account");
								return resp;
							} else if (resp.status == 409) {
								this.setState({
									statusMessage:
										"Could not create user account",
								});
							}
						})
						.catch((err) => {
							this.setState({
								statusMessage:
									"There was an unknown server error",
							});
							console.log(err);
						});
				} else {
					this.setState({ statusMessage: "Password do not match" });
				}
			} else {
				this.setState({ statusMessage: "Please enter a password" });
			}
		} else {
			this.setState({ statusMessage: "Please enter an email" });
		}
	}

	render() {
		return (
			<div className="sign-up">
				<PageTitle className="sign-up__title" title="Sign Up" />
				<form className="sign-up__form">
					<FormInput
						title="Email"
						name="email"
						type="email"
						placeholder="Enter your email:"
						className="sign-up__form__email"
						handleChange={this.handleChange}
						value={this.state.email}
					/>

					<FormInput
						title="Password"
						name="password"
						type="password"
						placeholder="Enter passwrod"
						className="sign-up__form__password"
						handleChange={this.handleChange}
						value={this.state.password}
					/>

					<FormInput
						title="Confirm Password"
						name="confirm"
						type="password"
						placeholder="Confirm passwrod"
						className="sign-up__form__confirm"
						handleChange={this.handleChange}
						value={this.state.confirm}
					/>

					<StatusMessage
						className="sign-up__form__status-message"
						status={this.state.statusMessage}
					/>

					<div className="sign-up__form__buttons">
						<FormButton
							type="button"
							className="sign-up__form__buttons__cancel"
							onClick={this.clearForm}
							title="Cancel"
						/>
						<FormButton
							type="button"
							className="sign-up__form__buttons__submit"
							onClick={this.handleSubmit}
							title="Submit"
						/>
					</div>
				</form>
				<div className="sign-up__have-account">
					<div>Already have an account?</div>
					<Link to="/signin">Sign In Here</Link>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { id, logged_in } = state.user;
	return { id, logged_in };
}

SignUp = connect(mapStateToProps, actions)(SignUp);

export default SignUp;
