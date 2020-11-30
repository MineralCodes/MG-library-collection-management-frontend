import React, { Component } from "react";
import axios from "axios";
import { FormInput } from "./formFields";
import SelectField from "./selectField";

import { apiUrl } from "../../../config";

export default class BookForm extends Component {
	constructor() {
		super();

		this.state = {
			title: "",
			author: "",
			isbn: "",
			description: "",
			pubYear: "",
			editMode: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.hydrateState = this.hydrateState.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleClear() {
		this.setState({
			title: "",
			author: "",
			isbn: "",
			description: "",
			pubYear: "",
		});
	}

	hydrateState(data) {
		this.setState({
			...data,
		});
	}

	handleSubmit() {
		const formObject = {
			form_input: {
				title: this.state.title,
				author: parseInt(this.state.author),
				isbn: this.state.isbn,
				description: this.state.description,
				pub_year: parseInt(this.state.pubYear),
			},
		};

		axios
			.post(`${apiUrl}/book/create`, formObject, {
				withCredentials: true,
			})
			.then((resp) => {
				console.log(resp);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	componentDidMount() {
		const { id, editMode } = this.props.location.state;

		if (id) {
			axios
				.get(`${apiUrl}/book/${id}`)
				.then((resp) => {
					console.log(resp);
					this.setState({ ...resp.data.books[0], editMode });
				})
				.catch((err) => {
					console.log("book form mount error", err);
				});
		}
	}

	render() {
		return (
			<form className="book-form">
				<FormInput
					title="Book Title"
					name="title"
					type="text"
					placeholder="Enter Book Title"
					className="book-form__title"
					handleChange={this.handleChange}
					value={this.state.title}
				/>

				<SelectField
					placeholder="Search for author"
					name="author"
					title="Book Author"
					className="book-form__author"
					handleChange={this.handleChange}
				/>

				<FormInput
					title="ISBN"
					name="isbn"
					type="text"
					placeholder="Enter ISBN"
					className="book-form__isbn"
					handleChange={this.handleChange}
					value={this.state.isbn}
				/>

				<FormInput
					title="description"
					name="description"
					type="textarea"
					placeholder="Enter description here"
					className="book-form__description"
					handleChange={this.handleChange}
					value={this.state.description}
				/>

				<FormInput
					title="Publication Year"
					name="pubYear"
					type="text"
					placeholder="Pub Year"
					className="book-form__isbn"
					handleChange={this.handleChange}
					value={this.state.pubYear}
				/>

				<FormButton
					className="book-form__cancel"
					type="button"
					onClick={this.handleClear}
					title="Cancel"
				/>
				<FormButton
					className="book-form__submit"
					type="button"
					onClick={this.handleSubmit}
					title="Submit"
				/>
			</form>
		);
	}
}
