import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../../actions";

import { apiUrl } from "../../../config";

import { FormInput, FormButton } from "./formFields";
import StatusMessage from "../../utils/statusMessage";
import PageTitle from "../../utils/pageTitle";

class SignIn extends Component {
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
		});
	}

	handleSubmit() {
		if (this.state.email != "") {
			if (this.state.password != "") {
				axios
					.post(
						`${apiUrl}/auth/login`,
						{
							email: this.state.email,
							password: this.state.password,
						},
						{ withCredentials: true }
					)
					.then((resp) => {
						if ((resp.status = 200)) {
							this.props.setUserInfo({
								...resp.data.user,
								logged_in: true,
							});
							this.props.history.push("/account");
						} else if ((resp.status = 401) || (resp.status = 404)) {
							this.setState({
								statusMessage: "Invalid username or password",
							});
						}
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				this.setState({ statusMessage: "Please enter a password" });
			}
		} else {
			this.setState({ statusMessage: "Please enter an email address" });
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.logged_in != prevProps.logged_in) {
			if (this.props.logged_in) {
				this.props.history.push("/account");
			}
		}
	}

	render() {
		return (
			<div className="sign-in">
				<PageTitle className="sign-in__title" title="Sign In" />
				<form className="sign-in__form">
					<FormInput
						title="Email"
						name="email"
						type="email"
						placeholder="Enter your email:"
						className="sign-in__form__email"
						handleChange={this.handleChange}
						value={this.state.email}
					/>

					<FormInput
						title="Password"
						name="password"
						type="password"
						placeholder="Enter your password:"
						className="sign-in__form__password"
						handleChange={this.handleChange}
						value={this.state.password}
					/>

					<StatusMessage
						className="sign-in__form__status-message"
						status={this.state.statusMessage}
					/>

					<div className="sign-in__form__buttons">
						<FormButton
							type="button"
							className="sign-in__form__buttons__cancel"
							onClick={this.clearForm}
							title="Cancel"
						/>
						<FormButton
							type="button"
							className="sign-in__form__buttons__submit"
							onClick={this.handleSubmit}
							title="Submit"
						/>
					</div>
				</form>
				<div className="sign-in__no-account">
					<div>Don't have an account?</div>
					<Link to="/signup">Sign Up Here</Link>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { id, logged_in } = state.user;
	return { id, logged_in };
}

SignIn = connect(mapStateToProps, actions)(SignIn);

export default SignIn;
