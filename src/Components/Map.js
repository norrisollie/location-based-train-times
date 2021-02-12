import React, {Component} from "react";
import gsap from "gsap";
import mapboxgl, {Marker} from "mapbox-gl";
import MarkerComp from "./MarkerComp";

export default class Map extends Component {
	map = null;
	marker = null;

	initMap = () => {
		console.log("HELLO");
		mapboxgl.accessToken =
			"pk.eyJ1Ijoibm9ycmlzb2xsaWUiLCJhIjoiY2ozbG1wdjQ4MDA2cTJxcDllbTl2aGRhbyJ9.sQsQfFSu0NcRseoxKW0_7w";
		this.map = new mapboxgl.Map({
			container: this.mapContainer,
			style: "mapbox://styles/norrisollie/ckkz4s27r33g217p7pahsfati",
			zoom: 11,
		});

		const center = new mapboxgl.LngLat(
			this.props.longitude,
			this.props.latitude
		);

		this.map.setCenter(center);

		gsap.to(this.mapContainer, {autoAlpha: 1, pointerEvents: "all"});
	};

	initMarkers() {
		let allCoords = [];

		this.props.stations.forEach((station) => {
			let stationCoords = [];
			stationCoords = [station.longitude, station.latitude];
			allCoords.push(stationCoords);

			new mapboxgl.Marker(<MarkerComp />)
				.setLngLat([station.longitude, station.latitude])
				.addTo(this.map);
		});

		var bounds = allCoords.reduce(function (bounds, coord) {
			return bounds.extend(coord);
		}, new mapboxgl.LngLatBounds(allCoords[0], allCoords[0]));

		this.map.fitBounds(bounds, {
			padding: 100,
		});
	}

	componentDidMount = () => {
		this.initMap();
		this.initMarkers();
	};

	render() {
		return (
			<div
				className="map-container"
				ref={(el) => {
					this.mapContainer = el;
				}}></div>
		);
	}
}
