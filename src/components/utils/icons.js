import {
	faSearch,
	faEdit,
	faTrash,
	faUser,
} from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";

const Icons = () => {
	return library.add(faSearch, faEdit, faTrash, faUser);
};

export default Icons;
