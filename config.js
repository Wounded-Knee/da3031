const address = 'joekra5.dreamhosters.com';
const config = {
	devMode: false,
	theme: "Dark",
	web: {
		port: 8080,
		address,
	},
	ws: {
		port: 8081,
		address,
		cacheFile: './nodeCache2.json',
		tokenName: 'token',
	},
	discord: {
		clientId: "806276059242168330",
		clientSecret: "_uf8_IUWZmGoWUSQQgC6B_hztwb_ERUQ",
		redirectUri: 'http://d3.jpkramer.com:8080/',
	},
};

module.exports = config
