import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Footer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			signedIn: this.props.signed_in,
			email: this.props.email,
		};
	}

	render() {
		return (
			<div className="footer">
				<div className="user">
					{this.state.signedIn
						? `Welcome! Signed in as ${this.props.email}`
						: `Welcome!`}
				</div>
				<div className="footer__account">
					{this.state.signedIn ? (
						<Link to="/account">Account</Link>
					) : null}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { email, signed_in } = state.user;
	return { email, signed_in };
}

Footer = connect(mapStateToProps)(Footer);

export default Footer;
