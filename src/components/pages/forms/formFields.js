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
			handleKeyup,
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
					onKeyUp={handleKeyup}
				/>
			</div>
		);
	}
}

export class FormTextArea extends Component {
	render() {
		const {
			className,
			title,
			type,
			placeholder,
			value,
			name,
			handleChange,
			handleKeyup,
		} = this.props;
		return (
			<div className={`form-textarea ${className}`}>
				<label className={`form-textarea__label`}>{title}</label>
				<textarea
					name={name}
					className={`form-textarea__textarea`}
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
					onKeyUp={handleKeyup}
				/>
			</div>
		);
	}
}

export class FormButton extends Component {
	render() {
		const { className, title, type, onClick, disabled } = this.props;
		return (
			<div className={`${className} form-button`}>
				<button
					className={`form-button__button`}
					type={type}
					onClick={onClick}
					disabled={disabled ? disabled : false}
				>
					{title}
				</button>
			</div>
		);
	}
}
