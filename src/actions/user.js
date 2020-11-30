import { SET_USER_INFO } from "./types";

export function setUserInfo(userObject) {
	const { id, email, user_role, logged_in } = userObject;
	return {
		type: SET_USER_INFO,
		payload: {
			id: id,
			email: email,
			user_role: user_role,
			logged_in: logged_in,
		},
	};
}
