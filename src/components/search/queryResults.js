import React, { Component } from "react";
import BookRecord from "../utils/record";

export default class Results extends Component {
	mapData(data = []) {
		if (data.length >= 1) {
			return data.map((record) => {
				return (
					<BookRecord
						key={record.id}
						{...record}
						className="books__record"
					/>
				);
			});
		} else if ((data.length = 0)) {
			<div className="books__record">
				This search returned no results
			</div>;
		} else {
			return (
				<div className="books__record">
					There was an error retrieving these results, please try
					again. If the problem persists contact the system
					administrator
				</div>
			);
		}
	}

	render() {
		const { className, bookData } = this.props;
		return (
			<div className={`results ${className}`}>
				<div className="results__books books">
					{this.mapData(bookData)}
				</div>
			</div>
		);
	}
}
