const DB_TYPE_REALTIME = 'realtime';
const DB_TYPE_AXIOS = 'axios';

const config = {
	devMode: false,
	pollInterval: 13000,
	apikey: "600b23461346a1524ff12d30",
	restdbUrl: 'https://da3031-adea.restdb.io/rest/',
	runStartupScript: false,
	appStates: {
		initializing: {
		}
	}
};

export default config;
