const address = 'd3.jpkramer.com';
const webPort = 8080;
const config = {
	devMode: false,
	theme: "Dark",
	web: {
		port: webPort,
		address,
	},
	ws: {
		port: 8081,
		address,
		cacheFile: './nodeCache.fortunecookies.json',
		tokenName: 'token',
	},
	discord: {
		clientId: "806276059242168330",
		clientSecret: "_uf8_IUWZmGoWUSQQgC6B_hztwb_ERUQ",
		redirectUri: `http://${address}:${webPort}/`,
	},
};

module.exports = config
