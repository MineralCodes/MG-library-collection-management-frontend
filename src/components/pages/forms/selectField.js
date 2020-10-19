import React, { Component } from "react";
import axios from "axios";

import { apiUrl } from "../../../config";

export default class SelectField extends Component {
	constructor() {
		super();

		this.state = {
			authors: [],
			filteredAuthors: [],
			subjects: [],
			searchTerm: "",
			selectedAuthor: {},
		};

		this.fetchAuthors = this.fetchAuthors.bind(this);
		this.findMatches = this.findMatches.bind(this);
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

	sortValues(key, order = "asc") {
		return function innerSort(a, b) {
			if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
				return 0;
			}

			const comparison = a[key].localeCompare(b[key]);

			return order === "desc" ? comparison * -1 : comparison;
		};
	}

	findMatches(event) {
		console.log(event.target.value);
		this.setState({
			filteredAuthors: this.state.authors.filter((item) => {
				const regex = new RegExp(event.target.value, "gi");
				return item.full_name.match(regex);
			}),
		});
	}

	componentDidMount() {
		this.fetchAuthors();
	}

	render() {
		const {
			placeholder,
			handleChange,
			name,
			title,
			className,
		} = this.props;
		return (
			<div className={`select-field ${className}`}>
				<label className={`select-field__label`}>{title}</label>
				<input
					className="select-field__input"
					type="text"
					placeholder={placeholder}
					autoComplete="off"
					onChange={this.findMatches}
				/>
				<select
					className="select-field__select"
					onChange={handleChange}
					name={name}
					size="5"
				>
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
