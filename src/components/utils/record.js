import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import CoverImage from "./coverImg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class BookRecord extends Component {
	render() {
		const {
			title,
			author,
			publication_year,
			isbn,
			description,
			id,
			className,
		} = this.props;

		const homePage = (
			<Link to={`/detail/${id}`} className="book-record">
				<CoverImage
					alt={`Title cover for ${title} by ${author}`}
					className="book-record__cover"
					isbn={isbn}
					size="M"
				/>
				<div className="book-record__info">
					<div className="book-record__info__title">{title}</div>
					<div className="book-record__info__author">{author}</div>
					<div className="book-record__info__pub-year">
						{publication_year}
					</div>
				</div>
			</Link>
		);

		const searcResults = (
			<div className={`search-record ${className}`}>
				<Link to={`/detail/${id}`} className="search-record__cover">
					<CoverImage
						src={`http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`}
						alt={`Title cover for ${title} by ${author}`}
						isbn={isbn}
						size="M"
					/>
				</Link>

				<div className="search-record__info">
					<Link
						to={`/detail/${id}`}
						className="search-record__info__title"
					>
						{title}
					</Link>
					<div className="search-record__info__author">{author}</div>
					<div className="search-record__info__description">
						{description}
					</div>
					<div className="search-record__info__pub-year">
						{publication_year}
					</div>
				</div>

				{this.props.logged_in ? (
					<div className="search-record__buttons">
						<Link
							to={{
								pathname: "/book/create",
								state: { id: id, editMode: true },
							}}
						>
							<FontAwesomeIcon
								icon="edit"
								className="edit-button search-record__button-edit"
							/>
						</Link>
					</div>
				) : null}
			</div>
		);

		return (
			<Fragment>
				{this.props.searchPage ? searcResults : homePage}
			</Fragment>
		);
	}
}

function mapStateToProps(state) {
	const { logged_in } = state.user;
	return { logged_in };
}
BookRecord = connect(mapStateToProps)(BookRecord);

export default BookRecord;
