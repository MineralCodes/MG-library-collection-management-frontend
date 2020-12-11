import axios from "axios";

import { apiUrl } from "../config";

export function checkLoggedInStatus(loggedIn, action) {
	if (!loggedIn) {
		console.log("checking logged in status");
		axios
			.post(`${apiUrl}/auth/validate`, {}, { withCredentials: true })
			.then((resp) => {
				if (resp.data.user.id > 0) {
					const userObject = {
						...resp.data.user,
						logged_in: true,
					};
					action(userObject);
					return resp;
				} else if ((resp.data.user.id = 0)) {
					const userObject = {
						...resp.data.user,
						logged_in: false,
					};
					action(userObject);
					return resp;
				}
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		console.log("else", userID);
	}
}
