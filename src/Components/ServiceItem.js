import React, {PureComponent} from "react";

export default class ServiceItem extends PureComponent {
	render() {
		return (
			<div className="service-peek">
				<div className="depart-time">{this.props.expected_departure_time}</div>
				<div className="destination-name">{this.props.destination_name}</div>
			</div>
		);
	}
}
