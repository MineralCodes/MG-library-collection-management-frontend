import React, { Component } from "react";
import axios from "axios";
import { apiUrl } from "../../config";
import SearchBar from "./searchBar";
import Results from "./queryResults";

export default class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			query: this.props.match.params.search,
			bookData: [],
		};
	}

	componentDidMount() {
		axios
			.post(`${apiUrl}/search/query`, {
				search_string: this.props.match.params.search,
			})
			.then((resp) => {
				this.setState({
					bookData: resp.data.books,
				});
				console.log(resp);
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
					console.log(resp);
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
				<Results
					className="search__results"
					bookData={this.state.bookData}
				/>
			</div>
		);
	}
}
