import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { checkLoggedInStatus } from "../../functions/userFunctions";
import * as actions from "../../actions";

import BookRecord from "../utils/record";

class Home extends Component {
	constructor() {
		super();

		this.state = {
			book_records: [],
		};

		this.validateUserInfo = this.validateUserInfo.bind(this);
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

	validateUserInfo() {
		console.log("tryna validate user info");
		if (document.cookie != "") {
			axios
				.post(
					"https://library-collection-management.herokuapp.com/auth/validate",
					{ withCredentials: true }
				)
				.then((resp) => {
					console.log(resp.data);
					const { _id, role, email } = resp.data;
					return { _id, role, email };
				})
				.catch((err) => {
					console.log("validate user info error:", err);
				});
		} else {
			return { _id: 0, role: "guest", email: "" };
		}
	}

	componentDidMount() {
		this.getRecentTitles();
		checkLoggedInStatus(this.props._id, this.props.setUserInfo);
		//this.props.setUserInfo(this.validateUserInfo());
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

Home = connect(mapStateToProps, actions)(Home);

export default Home;
