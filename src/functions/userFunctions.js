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
					const { _id, email, user_role } = resp.data;
					const userObject = {
						_id,
						email,
						user_role,
						logged_in: true,
					};
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
			user_role: "guest",
			logged_in: false,
		};
		action(userObject);
	}
}
