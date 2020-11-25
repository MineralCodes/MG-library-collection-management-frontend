import React, { Component } from "react";
import axios from "axios";

import { apiUrl } from "../../config";
import { Link } from "react-router-dom";

export default class BookDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: null,
			title: null,
			author: null,
			publication_year: null,
			isbn: null,
			description: null,
			date_added: null,
		};
	}

	componentDidMount() {
		axios
			.get(`${apiUrl}/book/${this.props.match.params.id}`)
			.then((resp) => {
				console.log("book detail response:", resp);
				const bookData = resp.data.books[0];
				this.setState({
					...bookData,
				});
			})
			.catch((err) => {
				console.log("book detail error:", err);
			});
	}

	render() {
		return (
			<div className="book-detail">
				<img
					src={`http://covers.openlibrary.org/b/isbn/${this.state.isbn}-L.jpg`}
					alt={`Title cover for ${this.state.title} by ${this.state.author}`}
					className="book-detail__cover"
				/>
				<div className="book-detail__title">{this.state.title}</div>
				<div className="book-detail__author">{this.state.author}</div>
				<div className="book-detail__pub-year">
					{this.state.publication_year}
				</div>
				<div className="book-detail__description">
					{this.state.description}
				</div>
				<div className="book-detail__isbn">{this.state.isbn}</div>
				<div className="book-detail__isbn">{this.state.date_added}</div>
				<div className="book-detail__edit-buttons">
					<Link
						to={{
							pathname: "/book/create",
							state: { id: this.state.id },
						}}
					>
						Edit
					</Link>
				</div>
			</div>
		);
	}
}
