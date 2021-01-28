import React, {Component} from "react";

export default class Postcode extends Component {
	render() {
		return (
			<div>{`By using your location provided by the browser, it looks like you are in the ${this.props.postcode} postcode. Your nearest train stations are:`}</div>
		);
	}
}
