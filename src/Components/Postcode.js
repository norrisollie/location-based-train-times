import React, {Component} from "react";

export default class Postcode extends Component {
	render() {
		if (this.props.postcode === undefined || this.props.postcode.length <= 0) {
			return null;
		} else {
			return (
				<div className="postcode-wrapper">
					Your postcode is {this.props.postcode}
				</div>
			);
		}
	}
}
