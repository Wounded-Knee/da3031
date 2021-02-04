import Relationship from './classes/Relationship.mixin';
import User from './classes/User.mixin';
import Avatar from './classes/Avatar.mixin';
import Navigation from './classes/Navigation.mixin';
import Default from './nodeTypes/default/AnnuitCœptis.class';

const config = {
	devMode: false,
	pollInterval: 8000,
	theme: "Dark",
	apikey: "600b23461346a1524ff12d30",
	restdbUrl: 'https://da3031-adea.restdb.io/rest/',
	runStartupScript: false,
	nodeTypes: [Default],
	mixins: [User, Avatar, Relationship, Navigation],
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
