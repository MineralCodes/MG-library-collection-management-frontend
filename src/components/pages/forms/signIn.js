import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../actions";

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
	//https://library-collection-management.herokuapp.com
	handleSubmit(event) {
		axios
			.post(
				"http://127.0.0.1:5000/auth/login",
				{
					email: this.state.email,
					password: this.state.password,
				},
				{ withCredentials: true }
			)
			.then((resp) => {
				console.log(resp);
				if ((resp.status = 200)) {
					this.props.setUserInfo(resp.data);
					this.props.history.push("/account");
				} else if ((resp.status = 401)) {
					return "Invalid password";
				} else if ((resp.status = 404)) {
					return "Invalid email";
				}

				return resp;
			})
			.catch((err) => {
				console.log(err);
			});
		event.preventDefault();
	}

	render() {
		return (
			<div className="sign-in">
				<form
					className="sign-in__form"
					onSubmit={this.handleSubmit}
					method="POST"
				>
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
					<button type="submit" className="sign-in__form__submit">
						Login
					</button>
				</form>
			</div>
		);
	}
}

SignIn = connect(null, actions)(SignIn);

export default SignIn;
