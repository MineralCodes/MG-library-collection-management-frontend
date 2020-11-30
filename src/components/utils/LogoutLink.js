import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import history from "../utils/history";
import { apiUrl } from "../../config";

import * as actions from "../../actions";

class LogoutLink extends Component {
	logoutUser(setInfo) {
		const clearUser = {
			id: 0,
			email: "",
			user_role: "guest",
			logged_in: false,
		};

		if (document.cookie.includes("token=")) {
			axios
				.post(`${apiUrl}/auth/logout`, {}, { withCredentials: true })
				.then((resp) => {
					console.log(resp);
					setInfo(clearUser);
					history.push("/");
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			console.log("no cookie");
			setInfo(clearUser);
		}
	}

	render() {
		const { className } = this.props;
		return (
			<a
				href="#"
				className={`logout-link ${className}`}
				onClick={() => this.logoutUser(this.props.setUserInfo)}
			>
				Logout
			</a>
		);
	}
}

LogoutLink = connect(null, actions)(LogoutLink);

export default LogoutLink;
