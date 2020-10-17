import { SET_USER_INFO } from "../actions/types";

const INITIAL_STATE = {
	_id: 0,
	email: "",
	role: "",
	loggedIn: false,
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case SET_USER_INFO:
			const { _id, email, role } = action.payload;
			return {
				...state,
				_id: _id,
				email: email,
				role: role,
				loggedIn: true,
			};
		default:
			return state;
	}
}
