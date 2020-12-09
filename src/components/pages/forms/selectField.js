import React, { Component } from "react";
import axios from "axios";

import { apiUrl } from "../../../config";

export default class SelectField extends Component {
	constructor(props) {
		super(props);

		this.state = {
			authors: [],
			filteredAuthors: [],
			searchTerm: "",
			selectedAuthor: {},
		};

		this.fetchAuthors = this.fetchAuthors.bind(this);
	}

	sortValues(key, order = "asc") {
		return function innerSort(a, b) {
			if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
				return 0;
			}

			const comparison = a[key].localeCompare(b[key]);

			return order === "desc" ? comparison * -1 : comparison;
		};
	}

	fetchAuthors() {
		axios
			.get(`${apiUrl}/author/getall`)
			.then((resp) => {
				this.setState({
					authors: resp.data.authors,
					filteredAuthors: resp.data.authors.sort(
						this.sortValues("full_name")
					),
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	componentDidMount() {
		this.fetchAuthors();
	}

	render() {
		const { handleChange, name, title, className, authorId } = this.props;
		return (
			<div className={`select-field ${className}`}>
				<label className={`select-field__label`}>{title}</label>
				<select
					className="select-field__select"
					onChange={handleChange}
					name={name}
					value={parseInt(authorId)}
				>
					<option value="0">Select author</option>
					{this.state.filteredAuthors.map((author, key) => {
						return (
							<option
								key={key}
								value={author.id}
							>{`${author.last_name}, ${author.first_name}`}</option>
						);
					})}
				</select>
			</div>
		);
	}
}
