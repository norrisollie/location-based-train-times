import React, {Component} from "react";
import Postcode from "./Postcode";
import {gsap} from "gsap";

export default class Search extends Component {
	componentDidUpdate = (prevProps) => {
		if (prevProps.animateSearchWrapper !== this.props.animateSearchWrapper) {
			gsap.to(this.searchWrapper, {height: "auto", width: "auto"});
		}
	};

	render() {
		return (
			<div
				className="search-wrapper"
				ref={(el) => {
					this.searchWrapper = el;
				}}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
					}}>
					<input
						type="text"
						name="searchQuery"
						placeholder="Enter a postcode or town"
						onChange={(e) => {
							this.props.searchQueryHandler(e);
						}}
					/>
					<button
						style={
							this.props.locationSearching
								? {
										backgroundImage:
											"url(data:image/svg+xml;base64,PCEtLSBCeSBTYW0gSGVyYmVydCAoQHNoZXJiKSwgZm9yIGV2ZXJ5b25lLiBNb3JlIEAgaHR0cDovL2dvby5nbC83QUp6YkwgLS0+Cjxzdmcgd2lkdGg9IjM4IiBoZWlnaHQ9IjM4IiB2aWV3Qm94PSIwIDAgMzggMzgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSIgc3Ryb2tlLXdpZHRoPSIyIj4KICAgICAgICAgICAgPGNpcmNsZSBzdHJva2Utb3BhY2l0eT0iLjUiIGN4PSIxOCIgY3k9IjE4IiByPSIxOCIvPgogICAgICAgICAgICA8cGF0aCBkPSJNMzYgMThjMC05Ljk0LTguMDYtMTgtMTgtMTgiPgogICAgICAgICAgICAgICAgPGFuaW1hdGVUcmFuc2Zvcm0KICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iCiAgICAgICAgICAgICAgICAgICAgdHlwZT0icm90YXRlIgogICAgICAgICAgICAgICAgICAgIGZyb209IjAgMTggMTgiCiAgICAgICAgICAgICAgICAgICAgdG89IjM2MCAxOCAxOCIKICAgICAgICAgICAgICAgICAgICBkdXI9IjFzIgogICAgICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgICAgICAgICAgIDwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==)",
								  }
								: {}
						}
						type="button"
						onClick={(e) => {
							this.props.geolocationClickHandler(e);
						}}></button>
					<button
						type="submit"
						onClick={(e) => {
							this.props.buttonClickHandler(e);
						}}></button>
				</form>
				<Postcode postcode={this.props.userPostcode} />
			</div>
		);
	}
}
