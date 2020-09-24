import React, { Component } from "react";
import axios from "axios";

import BookRecord from "../record";

export default class Home extends Component {
	constructor() {
		super();

		this.state = {
			book_records: [],
		};
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/search/recent-titles")
			.then((resp) => {
				this.setState({
					book_records: resp.data.books,
				});
			})
			.catch((err) => {
				console.log(err);
			});
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
