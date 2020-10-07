import React, { Component } from "react";

export class FormInput extends Component {
	render() {
		const {
			className,
			title,
			type,
			placeholder,
			value,
			name,
			handleChange,
		} = this.props;
		return (
			<div className={`form-input ${className}`}>
				<label className={`form-input__label`}>{title}</label>
				<input
					name={name}
					className={`form-input__input`}
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
				/>
			</div>
		);
	}
}

export class FormButton extends Component {
	render() {
		const { className, title, type, onClick, input } = this.props;
		return (
			<div className={`${className} form-button`}>
				<button
					className={`form-button__button`}
					type={type}
					onClick={onClick}
					{...input}
				>
					{title}
				</button>
			</div>
		);
	}
}
