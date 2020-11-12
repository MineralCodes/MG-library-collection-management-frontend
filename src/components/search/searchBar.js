import React, { Component } from "react";

export default class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchBar: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit(history) {
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
		const { className, history } = this.props;
		return (
			<div className={`${className} search-bar`}>
				<input
					name="searchBar"
					className={`search-bar__input`}
					type="text"
					placeholder="Enter Search Terms Here"
					value={this.state.searchBar}
					onChange={this.handleChange}
				/>
				<button
					className="search-bar__submit"
					type="button"
					onClick={() => this.handleSubmit(history)}
				>
					Search
				</button>
			</div>
		);
	}
}
