import React, { Component } from "react";

import NotAvailable from "../../images/not-available.jpg";

export default class CoverImage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			imgSrc: NotAvailable,
		};

		this.addFallbackImg = this.addFallbackImg.bind(this);
	}

	addFallbackImg(event) {
		console.log("image error!");
		event.target.src = NotAvailable;
	}

	componentDidMount() {
		if (this.props.isbn) {
			this.setState({
				imgSrc: `https://covers.openlibrary.org/b/isbn/${this.props.isbn}-${this.props.size}.jpg`,
			});
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.isbn != prevProps.isbn) {
			this.setState({
				imgSrc: this.props.isbn
					? `https://covers.openlibrary.org/b/isbn/${this.props.isbn}-${this.props.size}.jpg`
					: NotAvailable,
			});
		}
	}

	render() {
		const { className, altText } = this.props;

		return (
			<img
				src={this.state.imgSrc}
				onError={this.addFallbackImg}
				alt={altText}
				className={`cover-image ${className}`}
			/>
		);
	}
}
