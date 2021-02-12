import React, {Component} from "react";

import StationItem from "./StationItem";

export default class StationList extends Component {
	render() {
		const stations = this.props.stations.map((s) => {
			return <StationItem key={s.station_code} {...s} />;
		});

		return <div className="stations-list">{stations}</div>;
	}
}
