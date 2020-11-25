import { SET_CURRENT_QUERY } from "../actions/types";

const INITIAL_STATE = {
	query: "",
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case SET_CURRENT_QUERY:
			return {
				...state,
				query: action.payload,
			};
		default:
			return state;
	}
}
