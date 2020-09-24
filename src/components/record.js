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
				<div className="book-record__title">{title}</div>
				<div className="book-record__author">{author}</div>
				<div className="book-record__pub-year">{publication_year}</div>
				<div className="book-record__description">{description}</div>
				<div className="book-record__isbn">{isbn}</div>
			</div>
		);
	}
}
