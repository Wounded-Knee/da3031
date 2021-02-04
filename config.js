const DB_TYPE_REALTIME = 'realtime';
const DB_TYPE_AXIOS = 'axios';

const config = {
	devMode: false,
	pollInterval: 8000,
	apikey: "600b23461346a1524ff12d30",
	restdbUrl: 'https://da3031-adea.restdb.io/rest/',
	runStartupScript: false,
	appStates: {
		initializing: {
		}
	},
	discord: {
		clientId: "806276059242168330",
		clientSecret: "_uf8_IUWZmGoWUSQQgC6B_hztwb_ERUQ",
		redirectUri: 'http://d3.jpkramer.com/',
	},
};

export default config;
