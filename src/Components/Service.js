import React, {Component} from "react";
import ServiceInfo from "./ServiceInfo";

export default class Service extends Component {
	constructor() {
		super();
		this.state = {
			servicesLoaded: false,
			serviceInfo: [],
		};
	}

	serviceClickHandler(e, url) {
		e.stopPropagation();
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				this.setState(
					(prevState) => {
						return {
							...prevState,
							servicesLoaded: !prevState.servicesLoaded,
							serviceInfo: data,
						};
					},
					() => {
						console.log(this.state.serviceInfo);
					}
				);
			});
	}

	render() {
		console.log(this.state.serviceInfo);

		let stops;

		if (this.state.serviceInfo.length !== 0) {
			stops = this.state.serviceInfo.stops.map((stop) => {
				return (
					<ServiceInfo
						key={stop.station_code}
						name={stop.station_name}
						selectedStationName={this.props.selectedStationName}
						selectedStationCode={this.props.selectedStationCode}
						departureTime={stop.aimed_departure_time}
					/>
				);
			});
		}

		return (
			<li
				onClick={(e) => {
					this.serviceClickHandler(e, this.props.serviceUrl);
				}}
			>
				{`${this.props.departTime} to ${this.props.destination}`}
				<ul>{stops}</ul>
			</li>
		);
	}
}
