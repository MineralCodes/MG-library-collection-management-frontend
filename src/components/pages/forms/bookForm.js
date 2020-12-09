import React, { Component } from "react";
import axios from "axios";
import { FormInput, FormButton, FormTextArea } from "./formFields";
import SelectField from "./selectField";

import { apiUrl } from "../../../config";

export default class BookForm extends Component {
	constructor() {
		super();

		this.state = {
			title: "",
			author: "",
			author_id: 0,
			isbn: "",
			description: "",
			publication_year: "",
			editMode: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
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
			author: 0,
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

	handleDelete() {
		if (
			confirm(
				"Are you sure you want to delete this?\nThis cannot be un-done"
			)
		) {
			axios
				.delete(`${apiUrl}/book/delete/${this.state.id}`, {
					withCredentials: true,
				})
				.then((resp) => {
					if ((resp.status = 200)) {
						this.props.history.push("/");
					}
				});
		}
	}

	handleSubmit() {
		let requestObject = {};

		const formObject = {
			form_input: {
				title: this.state.title,
				author: parseInt(this.state.author_id),
				isbn: this.state.isbn,
				description: this.state.description,
				publication_year: parseInt(this.state.publication_year),
			},
		};
		if (this.state.editMode) {
			requestObject = {
				method: "patch",
				url: `${apiUrl}/book/update`,
				data: formObject,
			};
		} else {
			requestObject = {
				method: "post",
				url: `${apiUrl}/book/create`,
				data: formObject,
				withCredentials: true,
			};
		}

		axios(requestObject)
			.then((resp) => {
				console.log(resp);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	componentDidMount() {
		if (this.props.location.state) {
			const { id, editMode } = this.props.location.state;

			if (id) {
				axios
					.get(`${apiUrl}/book/${id}`)
					.then((resp) => {
						this.setState({ ...resp.data.books[0], editMode });
					})
					.catch((err) => {
						console.log("book form mount error", err);
					});
			}
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
					name="author_id"
					title="Book Author"
					className="book-form__author"
					authorId={this.state.author_id}
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

				<FormTextArea
					title="Description"
					name="description"
					type="textarea"
					placeholder="Enter description here"
					className="book-form__description"
					handleChange={this.handleChange}
					value={this.state.description}
				/>

				<FormInput
					title="Publication Year"
					name="publication_year"
					type="text"
					placeholder="Pub Year"
					className="book-form__publication_year"
					handleChange={this.handleChange}
					value={this.state.publication_year}
				/>

				<div className="book-form__buttons">
					<FormButton
						className="book-form__buttons__cancel"
						type="button"
						onClick={
							this.state.editMode
								? () =>
										this.props.history.push(
											`/detail/${this.state.id}`
										)
								: this.handleClear
						}
						title="Cancel"
					/>
					<FormButton
						className="book-form__buttons__submit"
						type="button"
						onClick={this.handleSubmit}
						title={
							this.state.editMode
								? "Submit Changes"
								: "Create Record"
						}
					/>
					{this.state.editMode ? (
						<FormButton
							className="book-form__buttons__delete delete"
							type="button"
							onClick={this.handleDelete}
							title="Delete Record"
						/>
					) : null}
				</div>
			</form>
		);
	}
}
