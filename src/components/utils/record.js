import React, { Component } from "react";

export default class BookRecord extends Component {
	render() {
		const {
			title,
			author,
			publication_year,
			isbn,
			description,
		} = this.props;

		return (
			<div className="book-record">
				<img
					src={`http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`}
					alt={`Title cover for ${title} by ${author}`}
					className="book-record__cover"
				/>
				<div className="book-record__info">
					<div className="book-record__info__title">{title}</div>
					<div className="book-record__info__author">{author}</div>
					<div className="book-record__info__pub-year">
						{publication_year}
					</div>
				</div>
			</div>
		);
	}
}
