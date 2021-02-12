import React, {Component} from "react";
import Search from "./Components/Search";
import Map from "./Components/Map";

import "./App.css";
import {groupBy} from "./Helpers/arrayHelpers";
import StationList from "./Components/StationList";

export default class App extends Component {
	constructor() {
		super();

		this.state = {
			searchQuery: null,
			userLatitude: null,
			userLongitude: null,
			userPostcode: null,
			closestStations: null,
			locationSearching: false,
			loadMap: false,
		};
	}

	searchQueryHandler = (e) => {
		this.setState((prevState) => {
			return {...prevState, [e.target.name]: e.target.value};
		});
	};

	// TODO
	// validation for postcode
	buttonClickHandler = (e) => {
		e.preventDefault();
		this.getClosestPostcode(this.state.searchQuery);
	};

	success = (position) => {
		const {name, latitude, longitude} = position.coords;

		this.setState(
			(prevState) => {
				return {
					...prevState,
					userLatitude: latitude,
					userLongitude: longitude,
					userPostcode: name,
					locationSearching: false,
				};
			},
			() => {
				const {userLatitude, userLongitude} = this.state;
				this.getClosestStations(userLatitude, userLongitude);
			}
		);
	};

	error = (err) => {
		this.setState({locationSearching: false});
	};

	geolocationClickHandler = () => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(this.success, this.error, {
				timeout: 600000,
				enableHighAccuracy: true,
				maximumAge: 600000,
			});

			this.setState((prevState) => {
				return {...prevState, locationSearching: true};
			});
		}
	};

	getClosestPostcode = (query) => {
		console.log("searching for a postcode!");

		const url = `https://transportapi.com/v3/uk/places.json?app_id=c15b5dbb&app_key=1cfe30d14a3934983892bed20b27e431&query=${query}&type=postcode`;

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				const {name, latitude, longitude} = data.member[0];
				this.setState(
					(prevState) => {
						return {
							...prevState,
							userLatitude: latitude,
							userLongitude: longitude,
							userPostcode: name,
						};
					},
					() => {
						const {userLatitude, userLongitude} = this.state;
						this.getClosestStations(userLatitude, userLongitude);
					}
				);
			});
	};

	getClosestStations = (latitude, longitude) => {
		const url = `https://transportapi.com/v3/uk/places.json?app_id=c15b5dbb&app_key=1cfe30d14a3934983892bed20b27e431&lat=${latitude}&lon=${longitude}&type=postcode,train_station,tube_station`;
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				const types = groupBy(data.member, "type");
				this.setState(
					(prevState) => {
						return {
							...prevState,
							userPostcode: types.postcode[0].name,
							closestStations: types.train_station,
							tube: types.tube_station,
							loadMap: true,
						};
					},
					() => {
						console.log(this.state.tube);
					}
				);
			});
	};

	componentDidUpdate = (prevProps, prevState) => {};

	render() {
		return (
			<>
				<Search
					animateSearchWrapper={this.state.loadMap}
					searchQueryHandler={(e) => {
						this.searchQueryHandler(e);
					}}
					buttonClickHandler={(e) => {
						this.buttonClickHandler(e);
					}}
					geolocationClickHandler={(e) => {
						this.geolocationClickHandler(e);
					}}
					userPostcode={
						this.state.userPostcode !== null ? this.state.userPostcode : ""
					}
					locationSearching={this.state.locationSearching}
				/>
				{this.state.loadMap ? (
					<div className="map-list-container">
						<Map
							showMap={this.state.loadMap}
							latitude={this.state.userLatitude}
							longitude={this.state.userLongitude}
							stations={this.state.closestStations}
						/>
						<StationList stations={this.state.closestStations} />
					</div>
				) : (
					""
				)}
			</>
		);
	}
}
