import { SET_USER_INFO } from "./types";

export function setUserInfo() {
	return {
		type: SET_USER_INFO,
		payload: {
			user: {
				_id: 0,
				email: "example@example.com",
				role: "admin",
			},
		},
	};
}
