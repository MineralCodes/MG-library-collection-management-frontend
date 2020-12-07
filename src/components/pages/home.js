import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { apiUrl } from "../../config";

import BookRecord from "../utils/record";
import SearchBar from "../search/searchBar";
import PageTitle from "../utils/pateTitle";
import Spacer from "../utils/spacer";

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

				<Spacer defaultSize="50" className="home__spacer" />

				<div className="home__description">
					<div>Welcome to the book catalog!</div>
					<div>
						This is currently just a base framework for bigger and
						better things in the future. Feel free to browse the
						current catalog, or sign up for an account to recieve
						notifications for future features.
					</div>
				</div>

				<Spacer defaultSize="50" className="home__spacer" />

				<SearchBar
					className="home__search-bar"
					history={this.props.history}
				/>

				<Spacer defaultSize="50" className="home__spacer" />

				<div className="home__recent-titles">
					<div className="home__recent-titles__title">
						Recently Added Titles
					</div>
					<div className="home__recent-titles__records">
						{this.state.book_records.map((book) => {
							return <BookRecord key={book.id} {...book} />;
						})}
					</div>
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
