import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { FormInput } from "./formFields";
import SelectField from "./selectField";

export default class BookForm extends Component {
	constructor() {
		super();

		this.state = {
			title: "",
			author: "",
			isbn: "",
			description: "",
			pubYear: "",
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	submitForm() {
		const formObject = {
			form_input: {
				title: this.state.title,
				author: this.state.author,
				isbn: this.state.isbn,
				description: this.state.description,
				pub_year: parseInt(this.state.pubYear),
			},
		};

		axios
			.post(
				"https://library-collection-management.herokuapp.com/create/book",
				formObject,
				{ withCredentials: ture }
			)
			.then((resp) => {
				console.log(resp);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<form className={`book-form`} onSubmit={handleSubmit}>
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

				<button
					className="book-form__cancel"
					onClick={() =>
						this.setState({
							title: "",
							author: "",
							isbn: "",
							description: "",
							pubYear: "",
						})
					}
				>
					Cancel
				</button>
				<button className="book-form__submit">Submit</button>
			</form>
		);
	}
}
