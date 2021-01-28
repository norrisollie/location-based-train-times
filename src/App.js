import React, {Component} from "react";
import Postcode from "./Components/Postcode";
import Station from "./Components/Station";

import "./App.css";

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			latitude: null,
			longitude: null,
			postcodes: [],
			stationList: [],
		};
	}

	getCurrentLocation() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(this.success, this.error);
		}
	}

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

	groupBy(arr, property) {
		return arr.reduce(function (memo, x) {
			if (!memo[x[property]]) {
				memo[x[property]] = [];
			}
			memo[x[property]].push(x);
			return memo;
		}, {});
	}

	getNearestStations(latitude, longitude) {
		fetch(
			`https://transportapi.com/v3/uk/places.json?app_id=c15b5dbb&app_key=1cfe30d14a3934983892bed20b27e431&lat=${latitude}&lon=${longitude}&type=train_station,postcode`
		)
			.then((response) => response.json())
			.then((data) => {
				const types = this.groupBy(data.member, "type");

				this.setState(
					(prevState) => {
						return {
							...prevState,
							postcodes: types.postcode,
							stationList: types.train_station,
						};
					},
					() => {
						console.log(this.state);
					}
				);
			});
	}

	render() {
		let stations, postcode;
		if (!this.state.stationList.length < 1) {
			stations = this.state.stationList.map((station) => {
				return (
					<Station
						key={station.station_code}
						name={station.name}
						code={station.station_code}
					/>
				);
			});
		}

		if (!this.state.postcodes.length < 1) {
			postcode = this.state.postcodes[0].name;
		}

		return (
			<>
				<div>
					<button
						onClick={() => {
							this.getCurrentLocation();
						}}
					>
						Where am I?
					</button>
				</div>
				<div>
					{this.state.postcodes.length > 0 ? (
						<Postcode postcode={postcode} />
					) : (
						""
					)}
				</div>
				<ul>{stations}</ul>
			</>
		);
	}
}
