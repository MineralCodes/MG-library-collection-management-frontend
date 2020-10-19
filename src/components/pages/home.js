import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { apiUrl } from "../../config";

import BookRecord from "../utils/record";

class Home extends Component {
	constructor() {
		super();

		this.state = {
			book_records: [],
		};
	}

	getRecentTitles() {
		axios
			.get(`${apiUrl}/search/recent-titles`)
			.then((resp) => {
				this.setState({
					book_records: resp.data.books,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	componentDidMount() {
		this.getRecentTitles();
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

function mapStateToProps(state) {
	const { _id, email, role, loggedIn } = state.user;
	return { _id, email, role, loggedIn };
}

Home = connect(mapStateToProps)(Home);

export default Home;
