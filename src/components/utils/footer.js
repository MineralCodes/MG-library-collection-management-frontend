import React, { Component } from "react";
import { connect } from "react-redux";

class Footer extends Component {
	render() {
		return (
			<div className="footer">
				<div className="user">{`Signed in as ${this.props.email}`}</div>
				<div className="token">{document.cookie}</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { email } = state.user;
	return { email };
}

Footer = connect(mapStateToProps)(Footer);

export default Footer;
