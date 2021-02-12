import React, {Component} from "react";
import Postcode from "./Components/Postcode";
import Station from "./Components/Station";

import {groupBy} from "./Helpers/arrayHelpers";
import {getUserLocation} from "./Helpers/geolocation";

import "./App.css";
import Search from "./Components/Search";

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			searchQuery: "",
			latitude: null,
			longitude: null,
			postcodes: [],
			stationList: [],
		};
	}

	postcodeHandler = (e) => {
		console.log(e.target.value);
	};

	submitHandler = (e) => {
		e.preventDefault();
		console.log(e.target.value);
	};

	success = (position) => {
		this.setState(
			(prevState) => {
				return {
					...prevState,
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				};
			},
			() => {
				const {latitude, longitude} = this.state;
				this.getNearestStations(latitude, longitude);
			}
		);
	};

	error(err) {
		console.log(err);
	}

	unavailable() {
		console.log("geolocation doesn't exist");
	}

	getNearestStations(latitude, longitude) {
		fetch(
			`https://transportapi.com/v3/uk/places.json?app_id=c15b5dbb&app_key=1cfe30d14a3934983892bed20b27e431&lat=${latitude}&lon=${longitude}&type=train_station,postcode`
		)
			.then((response) => response.json())
			.then((data) => {
				const types = groupBy(data.member, "type");

				this.setState((prevState) => {
					return {
						...prevState,
						postcodes: types.postcode,
						stationList: types.train_station,
					};
				});
			});
	}

	render() {
		const {stationList, postcodes} = this.state;

		let stations, postcode;
		if (!stationList.length < 1) {
			stations = stationList.map((station) => {
				return (
					<Station
						key={station.station_code}
						name={station.name}
						code={station.station_code}
					/>
				);
			});
		}

		if (!postcodes.length < 1) {
			postcode = postcodes[0].name;
		}

		return (
			<>
				<Search
					postcodeHandler={(e) => {
						this.postcodeHandler(e);
					}}
					submitHandler={(e) => {
						this.submitHandler(e);
					}}
				/>
				<div>
					<button
						onClick={() => {
							getUserLocation(this.success, this.error, this.unavailable);
						}}>
						Where am I?
					</button>
				</div>
				<div>
					{postcodes.length > 0 ? <Postcode postcode={postcode} /> : ""}
				</div>
				<ul>{stations}</ul>
			</>
		);
	}
}
