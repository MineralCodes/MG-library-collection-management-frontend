import React, { Component } from "react";
import history from "../utils/history";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchBar: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleKeyPress(event) {
		if (event.key === "Enter") {
			this.handleSubmit();
		}
	}

	handleSubmit() {
		const searchTerms = this.state.searchBar;
		const searchString = searchTerms.replace(/ /g, "+");

		history.push(`/search/${searchString}`);
	}

	componentDidMount() {
		if (this.props.query) {
			const query = this.props.query.replace(/\+/g, " ");
			this.setState({
				searchBar: query,
			});
		}
	}

	render() {
		const { className } = this.props;
		return (
			<div className={`${className} search-bar`}>
				<input
					name="searchBar"
					className={`search-bar__input`}
					type="text"
					placeholder="Enter Search Terms Here"
					value={this.state.searchBar}
					onChange={this.handleChange}
					onKeyPress={this.handleKeyPress}
				/>

				<a onClick={this.handleSubmit} className="search-bar__icon">
					<FontAwesomeIcon icon="search" />
				</a>
			</div>
		);
	}
}
