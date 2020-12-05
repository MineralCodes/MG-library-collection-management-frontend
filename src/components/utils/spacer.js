import React from "react";

export default function (props) {
	const { width, height, defaultSize, className } = props;
	const style = {
		width,
		height,
	};

	return (
		<div
			className={`spacer-${defaultSize} ${className}`}
			style={style}
		></div>
	);
}
