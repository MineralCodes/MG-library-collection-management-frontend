import { SET_USER_INFO } from "./types";

export function setUserInfo(userObject) {
	const { _id, email, user_role, logged_in } = userObject;
	return {
		type: SET_USER_INFO,
		payload: {
			_id: _id,
			email: email,
			user_role: user_role,
			logged_in: logged_in,
		},
	};
}
