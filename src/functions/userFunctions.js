import axios from "axios";

import { apiUrl } from "../config";

export function checkLoggedInStatus(userID, action) {
	if (document.cookie.includes("token=")) {
		if (userID == 0) {
			axios
				.post(`${apiUrl}/auth/validate`, {}, { withCredentials: true })
				.then((resp) => {
					const { id, email, user_role } = resp.data;
					const userObject = {
						id,
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
		const userObject = {
			id: 0,
			email: "",
			user_role: "guest",
			logged_in: false,
		};
		action(userObject);
	}
}
