import React from "react";

export default function (props) {
	return <div className={`page-title ${props.className}`}>{props.title}</div>;
}
