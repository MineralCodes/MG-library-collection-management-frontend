import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import * as actions from "../../actions";

import Spacer from "../utils/spacer";

import { apiUrl } from "../../config";
import SearchBar from "./searchBar";
import Results from "./queryResults";

class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			query: this.props.match.params.search,
			bookData: [],
		};
	}

	componentDidMount() {
		this.props.setCurrentQuery(this.state.query);

		axios
			.post(`${apiUrl}/search/query`, {
				search_string: this.state.query,
			})
			.then((resp) => {
				this.setState({
					bookData: resp.data.books,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params.search !== prevProps.match.params.search) {
			this.setState({
				query: this.props.match.params.search,
			});

			axios
				.post(`${apiUrl}/search/query`, {
					search_string: this.props.match.params.search,
				})
				.then((resp) => {
					this.setState({
						bookData: resp.data.books,
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}

	render() {
		return (
			<div className="search">
				<SearchBar
					className="search__search-bar"
					query={this.props.match.params.search}
					history={this.props.history}
				/>

				<Spacer defaultSize="50" className="search__spacer" />

				<Results
					className="search__results"
					bookData={this.state.bookData}
				/>
			</div>
		);
	}
}

Search = connect(null, actions)(Search);

export default Search;
