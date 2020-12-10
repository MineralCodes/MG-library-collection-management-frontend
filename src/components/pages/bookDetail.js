import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { apiUrl } from "../../config";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PageTitle from "../utils/pageTitle";
import CoverImage from "../utils/coverImg";

class BookDetails extends Component {
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
				<PageTitle
					className="book-detail__title"
					title={`Record details for ${this.state.title}`}
				/>

				<CoverImage
					alt={`Title cover for ${this.state.title} by ${this.state.author}`}
					className="book-detail__cover"
					isbn={this.state.isbn}
					size="L"
				/>
				<div className="book-detail__info">
					<div className="book-detail__info__title">
						{this.state.title}
					</div>
					<div className="book-detail__info__author">
						{`By: ${this.state.author}`}
					</div>
					<div className="book-detail__info__pub-year">
						{`(${this.state.publication_year})`}
					</div>
					<div className="book-detail__info__description">
						{this.state.description}
					</div>
					<div className="book-detail__info__isbn">
						{`ISBN: ${this.state.isbn}`}
					</div>
					<div className="book-detail__info__date">
						{`Date Added: ${this.state.date_added}`}
					</div>
					<div className="book-detail__info__edit-button">
						{this.props.logged_in ? (
							<Link
								to={{
									pathname: "/book/create",
									state: {
										id: this.state.id,
										editMode: true,
									},
								}}
							>
								<FontAwesomeIcon icon="edit" />
							</Link>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { logged_in } = state.user;
	return { logged_in };
}

BookDetails = connect(mapStateToProps)(BookDetails);

export default BookDetails;
