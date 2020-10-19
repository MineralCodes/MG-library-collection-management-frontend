import axios from "axios";

import { apiUrl } from "../config";

export function checkLoggedInStatus(userID, action) {
	if (document.cookie.includes("token=")) {
		console.log("cookie check true");
		if (userID == 0) {
			console.log("if", userID);
			axios
				.post(`${apiUrl}/auth/validate`, {}, { withCredentials: true })
				.then((resp) => {
					console.log(resp);
					const { _id, email, role } = resp.data;
					const userObject = { _id, email, role, loggedIn: true };
					action(userObject);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			console.log("else", userID);
		}
	} else {
		console.log("cookie check false");
		const userObject = {
			_id: 0,
			email: "",
			role: "guest",
			loggedIn: false,
		};
		action(userObject);
	}
}

export function logoutUser(action) {
	const clearUser = {
		_id: 0,
		email: "",
		role: "guest",
		loggedIn: false,
	};

	if (document.cookie.includes("token=")) {
		axios
			.post(`${apiUrl}/auth/logout`, { withCredentials: true })
			.then((resp) => {
				console.log(resp);
				action(clearUser);
				this.props.history.push("/");
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		console.log("no cookie");
		action(clearUser);
	}
}
