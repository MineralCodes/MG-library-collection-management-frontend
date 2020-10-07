import React, { Component } from "react";
import axios from "axios";

import { FormInput } from "./formFields";

export default class SignIn extends Component {
	constructor() {
		super();

		this.state = {
			email: "",
			password: "",
			confirm: "",
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

	handleSubmit(event) {
		axios
			.post(
				"https://library-collection-management.herokuapp.com/auth/register",
				{
					email: this.state.email,
					password: this.state.password,
					confirm_password: this.state.confirm,
				},
				{ withCredentials: true }
			)
			.then((resp) => {
				console.log(resp);
				this.props.history.push("/");
			})
			.catch((err) => {
				console.log(err);
			});
		event.preventDefault();
	}

	render() {
		return (
			<div className="sign-up">
				<form
					className="sign-up__form"
					onSubmit={this.handleSubmit}
					method="POST"
				>
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
						placeholder="enter passwrod"
						className="sign-up__form__password"
						handleChange={this.handleChange}
						value={this.state.password}
					/>

					<FormInput
						title="Confirm Password"
						name="confirm"
						type="password"
						placeholder="confirm passwrod"
						className="sign-up__form__confirm"
						handleChange={this.handleChange}
						value={this.state.confirm}
					/>

					<button
						type="reset"
						className="sign-up__form__cancel"
						onClick={this.clearForm}
					>
						Cancel
					</button>
					<button type="submit" className="sign-up__form__submit">
						Login
					</button>
				</form>
			</div>
		);
	}
}
