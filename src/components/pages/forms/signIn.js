import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../../actions";

import { apiUrl } from "../../../config";
import { checkLoggedInStatus } from "../../../functions/userFunctions";

import { FormInput } from "./formFields";

class SignIn extends Component {
	constructor() {
		super();

		this.state = {
			email: "",
			password: "",
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
					console.log("response", resp);
					this.props.setUserInfo({
						...resp.data.user,
						logged_in: true,
					});
					this.props.history.push("/account");
					return resp;
				} else if ((resp.status = 401)) {
					return "Invalid password";
				} else if ((resp.status = 404)) {
					return "Invalid email";
				}
			})
			.catch((err) => {
				console.log(err);
			});
		// event.preventDefault();
	}

	componentDidMount() {
		console.log("signIn component mounting", this.props.logged_in);
		//checkLoggedInStatus(this.props._id, this.props.setUserInfo);
		if (this.props.logged_in) {
			console.log(this.props._id);
			this.props.history.push("/account");
		}
	}

	render() {
		return (
			<div className="sign-in">
				<form className="sign-in__form" method="POST">
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

					<button
						type="reset"
						className="sign-in__form__cancel"
						onClick={this.clearForm}
					>
						Cancel
					</button>
					<button
						type="button"
						className="sign-in__form__submit"
						onClick={this.handleSubmit}
					>
						Login
					</button>
				</form>
				<div className="no-account">
					Don't have an account?{" "}
					<Link to="/signup">Sign Up Here</Link>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { _id, logged_in } = state.user;
	return { _id, logged_in };
}

SignIn = connect(mapStateToProps, actions)(SignIn);

export default SignIn;
