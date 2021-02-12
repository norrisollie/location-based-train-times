import React, {Component} from "react";

import ServiceItem from "./ServiceItem";

export default class StationItem extends Component {
	constructor() {
		super();

		this.state = {
			serviceList: [],
		};
	}

	getKm = (m) => (m / 1000).toFixed(2);

	getServices = (code) => {
		fetch(
			`https://transportapi.com/v3/uk/train/station/${code}///live.json?app_id=c15b5dbb&app_key=1cfe30d14a3934983892bed20b27e431&train_status=passenger`
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				this.setState(
					(prevState) => {
						return {
							...prevState,
							serviceList: data.departures.all,
						};
					},
					() => {
						console.log(this.state);
					}
				);
			});
	};

	componentDidMount = () => {
		this.getServices(this.props.station_code);
	};

	render() {
		let services = this.state.serviceList.map((service) => {
			return <ServiceItem key={service.train_uid} {...service} />;
		});

		return (
			<div className="station-item">
				<div className="station-name-distance">
					<div className="station-name-type">
						<div className="station-type"></div>
						<div className="station-name">{this.props.name}</div>
					</div>
					<div className="station-distance">
						{this.getKm(this.props.distance)}km
						<div className="distance-icon"></div>
					</div>
				</div>
				<div className="service-list">{services}</div>
			</div>
		);
	}
}
