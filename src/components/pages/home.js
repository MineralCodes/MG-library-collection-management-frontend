import React, { Component } from "react";
import axios from "axios";

import BookRecord from "../utils/record";

export default class Home extends Component {
	constructor() {
		super();

		this.state = {
			book_records: [],
		};
	}

	getRecentTitles() {
		axios
			.get(
				"https://library-collection-management.herokuapp.com/search/recent-titles"
			)
			.then((resp) => {
				this.setState({
					book_records: resp.data.books,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	axiosTesting() {
		axios
			.get("http://covers.openlibrary.org/b/isbn/9780786296446-M.jpg")
			.then((resp) => {
				console.log(resp);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	componentDidMount() {
		this.getRecentTitles();
		this.axiosTesting();
	}

	render() {
		return (
			<div className="home">
				Homepage
				<div className="home__recent-titles">
					{this.state.book_records.map((book) => {
						return <BookRecord key={book.id} {...book} />;
					})}
				</div>
			</div>
		);
	}
}
