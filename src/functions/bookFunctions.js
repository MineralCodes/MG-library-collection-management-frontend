import axios from "axios";
import { apiUrl } from "../config";
import history from "../components/utils/history";

export function deleteRecord(id) {
	axios
		.delete(
			`${apiUrl}/book/delete`,
			{ book_id: id },
			{ withCredentials: true }
		)
		.then((resp) => {
			console.log("delete book response:", resp);
			if ((resp.status = 200)) {
				history.push("/");
			}
		})
		.catch((err) => {
			console.log("delete book error:", err);
		});
}
