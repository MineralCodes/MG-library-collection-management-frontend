import { SET_USER_INFO } from "../actions/types";

const INITIAL_STATE = {
	_id: 0,
	email: "",
	user_role: "",
	logged_in: false,
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case SET_USER_INFO:
			const { _id, email, user_role, logged_in } = action.payload;
			return {
				...state,
				_id: _id ? _id : 0,
				email: email ? email : "",
				user_role: user_role ? user_role : "guest",
				logged_in: logged_in ? logged_in : false,
			};
		default:
			return state;
	}
}
