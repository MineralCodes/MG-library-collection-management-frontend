import axios from "axios";

import { apiUrl } from "../config";

export function checkLoggedInStatus(userID, action) {
	if (userID == 0) {
		console.log("checking logged in status");
		axios
			.post(`${apiUrl}/auth/validate`, {}, { withCredentials: true })
			.then((resp) => {
				if (resp.data.id > 0) {
					const { id, email, user_role } = resp.data;
					const userObject = {
						id,
						email,
						user_role,
						logged_in: true,
					};
					action(userObject);
				} else if ((resp.data.id = 0)) {
					const { id, email, user_role } = resp.data;
					const userObject = {
						id,
						email,
						user_role,
						logged_in: false,
					};
					action(userObject);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		console.log("else", userID);
	}
}
