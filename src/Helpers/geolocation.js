export const getUserLocation = (success, error, unavailable) => {
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(success, error, {
			enableHighAccuracy: true,
			timeout: 30000,
			maximumAge: 30000,
		});
	} else {
		unavailable();
	}
};
