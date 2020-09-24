import { SET_USER_INFO } from "../actions/types";

const INITIAL_STATE = {
	_id: 0,
	email: "example@example.com",
	role: "admin",
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case SET_USER_INFO:
			return {
				...state,
				userInfo: action.payload,
			};
		default:
			return state;
	}
}
