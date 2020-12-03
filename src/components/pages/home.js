import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { apiUrl } from "../../config";

import BookRecord from "../utils/record";
import SearchBar from "../search/searchBar";
import PageTitle from "../utils/pateTitle";

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
				<PageTitle className="home__title" title="Home" />
				<SearchBar
					className="home__search-bar"
					history={this.props.history}
				/>
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
	const { id, email, user_role, logged_in } = state.user;
	return { id, email, user_role, logged_in };
}

Home = connect(mapStateToProps)(Home);

export default Home;
