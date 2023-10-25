const config = require('../config');
const {
	clientId,
	clientSecret,
} = config.discord;
const DiscordOauth2 = require("discord-oauth2");

const discord = new DiscordOauth2({
	...config.discord,
	scope: "identify",
	grantType: "authorization_code",
});

class Discord {
	constructor() {
		this.instance = discord;
		this.code = undefined;
		this.returnedState = undefined;
		this.sentState = undefined;
		this.bearerToken = undefined;
	}

	getOauth2Url() {
		return this.instance.generateAuthUrl({
			prompt: 'none',
			scope: ['identify'],
			responseType: 'code',
			state: 'xyzzy',
		});
	}

	setUrl(url) {
		if (url === '') return false;

		const {
			code,
			state,
		} = (function(a) {
			if (a == "") return {};
			var b = {};
			for (var i = 0; i < a.length; ++i)
			{
				var p=a[i].split('=', 2);
				if (p.length == 1)
					b[p[0]] = "";
				else
					b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
			}
			return b;
		})(url.substr(2).split('&'));

		console.log('DiscordOauth2: Got stuff ', code, state);

		if (code) this.setCode(code);
	}

	setCode(code) {
		if (code === '') return false;
		this.code = code;
		console.log('DiscordOauth2: Got code ', code, this.instance);

		this.instance.tokenRequest({
			// clientId, clientSecret and redirectUri are omitted, as they were already set on the class constructor
			code,
			grantType: "authorization_code",
			scope: ["identify"],
		}).then(
			(data) => this.bearerToken = data
		).catch(
			(err) => console.error(err)
		);
	}
};

const discordOauth2 = new Discord();

export default discordOauth2;
