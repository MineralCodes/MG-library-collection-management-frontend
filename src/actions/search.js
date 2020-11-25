import { SET_CURRENT_QUERY } from "./types";

export function setCurrentQuery(query) {
	return {
		type: SET_CURRENT_QUERY,
		payload: query,
	};
}
