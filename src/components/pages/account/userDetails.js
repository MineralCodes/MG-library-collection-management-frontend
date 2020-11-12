import React from "react";

export default function (props) {
	return (
		<div className={`user-details ${props.className}`}>
			<div className="user-details__id">{props.id}</div>
			<div className="user-details__email">{props.email}</div>
			<div className="user-details__role">{props.user_role}</div>
		</div>
	);
}
