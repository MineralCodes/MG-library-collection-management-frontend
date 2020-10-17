import axios from "axios";

export function checkLoggedInStatus(userID, action) {
	if (document.cookie) {
		console.log("true");
		axios
			.post(
				"http://127.0.0.1:5000/auth/validate",
				{},
				{ withCredentials: true }
			)
			.then((resp) => {
				const { _id, email, role } = resp.data;
				const userObject = { _id, email, role, loggedIn: true };
				action(userObject);
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		console.log("false");
	}
}
