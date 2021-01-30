const DB_TYPE_REALTIME = 'realtime';
const DB_TYPE_AXIOS = 'axios';

const config = {
	apikey: "600b23461346a1524ff12d30",
	restdbUrl: 'https://da3031-adea.restdb.io/rest/nodes',
	restdbTimeout: 15000,
	runStartupScript: false,
	dbTypeConstants: {
		DB_TYPE_REALTIME: DB_TYPE_REALTIME,
		DB_TYPE_AXIOS: DB_TYPE_AXIOS
	},
	dbType: DB_TYPE_AXIOS,
};

export default config;
