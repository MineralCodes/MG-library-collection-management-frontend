import React from "react";

export default function (props) {
	return (
		<div className={`user-details ${props.className}`}>
			<div className="user-details__id">User ID: {props.id}</div>
			<div className="user-details__email">User Email: {props.email}</div>
		</div>
	);
}
