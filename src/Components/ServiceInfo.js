import React, {Component} from "react";

export default class ServiceInfo extends Component {
	constructor() {
		super();
	}

	render() {
		if (this.props.selectedStationName === this.props.name) {
			return (
				<li style={{fontWeight: "bold"}}>
					{this.props.departureTime + " - " + this.props.name}
				</li>
			);
		} else {
			return <li>{this.props.departureTime + " - " + this.props.name}</li>;
		}
	}
}
