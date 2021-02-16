const config = {
	devMode: false,
	theme: "Dark",
	web: {
		port: webPort = 8080,
		address: address = 'd3.jpkramer.com',
	},
	ws: {
		port: 8081,
		address,
		cacheFile: './nodeCache.json',
		tokenName: 'token',
	},
	discord: {
		clientId: "806276059242168330",
		clientSecret: "_uf8_IUWZmGoWUSQQgC6B_hztwb_ERUQ",
		redirectUri: `http://${address}:${webPort}/`,
	},
};

module.exports = config
