import React, {Component} from "react";

import Service from "./Service";

export default class Station extends Component {
	constructor() {
		super();

		this.state = {
			selectedStationName: null,
			selectedStationCode: null,
			timetableLoaded: false,
			timetable: [],
		};
	}

	stationClickHandler(e, code) {
		e.stopPropagation();
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
							timetableLoaded: !prevState.timetableLoaded,
							timetable: data.departures.all,
							selectedStationName: data.station_name,
							selectedStationCode: data.station_code,
						};
					},
					() => {
						console.log(this.state);
					}
				);
			});
	}

	render() {
		const {
			timetable,
			timetableLoaded,
			selectedStationName,
			selectedStationCode,
		} = this.state;
		const {code, name} = this.props;

		let services;
		if (!timetable.length < 1 && timetableLoaded) {
			services = timetable.map((service) => {
				return (
					<Service
						selectedStationName={selectedStationName}
						selectedStationCode={selectedStationCode}
						key={service.train_uid}
						departTime={service.aimed_departure_time}
						destination={service.destination_name}
						serviceUrl={service.service_timetable.id}
					/>
				);
			});
		} else {
			if (timetableLoaded) {
				services =
					"Sorry, it looks like there are no services available from this station.";
			}
		}

		return (
			<li
				onClick={(e) => {
					this.stationClickHandler(e, code);
				}}
			>
				<>{name}</>
				<ul>{services}</ul>
			</li>
		);
	}
}
