import React, {Component} from "react";
import {splitAt} from "../Helpers/arrayHelpers";
import ServiceInfo from "./ServiceInfo";

export default class Service extends Component {
	constructor() {
		super();
		this.state = {
			servicesLoaded: false,
			serviceInfo: [],
			showStops: false,
			showPrevStops: false,
			showNextStops: false,
		};
	}

	prevStopClickHandler(e) {
		e.stopPropagation();
		this.setState((prevState) => {
			return {
				...prevState,
				showPrevStops: !prevState.showPrevStops,
			};
		});
	}

	nextStopClickHandler(e) {
		e.stopPropagation();
		this.setState((prevState) => {
			return {
				...prevState,
				showNextStops: !prevState.showNextStops,
			};
		});
	}

	serviceClickHandler(e, url) {
		e.stopPropagation();
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				this.setState((prevState) => {
					return {
						...prevState,
						servicesLoaded: !prevState.servicesLoaded,
						serviceInfo: data,
						showStops: !prevState.showStops,
					};
				});
			});
	}

	render() {
		const {
			selectedStationName,
			selectedStationCode,
			serviceUrl,
			destination,
			departTime,
		} = this.props;

		const {serviceInfo, showStops, showPrevStops, showNextStops} = this.state;

		let previousStops, currentStop, nextStops;
		if (serviceInfo.length !== 0) {
			const [before, current, next] = splitAt(
				(o) => o.station_name === selectedStationName,
				serviceInfo.stops
			);

			previousStops = before.map((p) => {
				const {
					station_code,
					station_name,
					aimed_departure_time,
					aimed_arrival_time,
					platform,
				} = p;

				return (
					<ServiceInfo
						key={station_code}
						name={station_name}
						selectedStationName={selectedStationName}
						selectedStationCode={selectedStationCode}
						departureTime={aimed_departure_time}
						arrivalTime={aimed_arrival_time}
						platform={platform}
					/>
				);
			});

			const {
				station_code,
				station_name,
				aimed_departure_time,
				aimed_arrival_time,
				platform,
			} = current;

			currentStop = (
				<ServiceInfo
					key={station_code}
					name={station_name}
					selectedStationName={selectedStationName}
					selectedStationCode={selectedStationCode}
					departureTime={aimed_departure_time}
					arrivalTime={aimed_arrival_time}
					platform={platform}
				/>
			);

			nextStops = next.map((p) => {
				return (
					<ServiceInfo
						key={station_code}
						name={station_name}
						selectedStationName={selectedStationName}
						selectedStationCode={selectedStationCode}
						departureTime={aimed_departure_time}
						arrivalTime={aimed_arrival_time}
						platform={platform}
					/>
				);
			});
		}

		return (
			<li
				onClick={(e) => {
					this.serviceClickHandler(e, serviceUrl);
				}}>
				{`${departTime} to ${destination}`}
				<ul style={showStops ? {display: "block"} : {display: "none"}}>
					{showPrevStops ? (
						previousStops
					) : (
						<div
							onClick={(e) => {
								this.prevStopClickHandler(e);
							}}>
							previous stops
						</div>
					)}
					<li>{currentStop}</li>
					{showNextStops ? (
						nextStops
					) : (
						<div
							onClick={(e) => {
								this.nextStopClickHandler(e);
							}}>
							next stops
						</div>
					)}
				</ul>
			</li>
		);
	}
}
