const config = require('../config');
const WebSocket = require('isomorphic-ws');
const {
	port,
	address,
	tokenName,
} = config.ws;
const wsUrl = `ws://${address}:${port}/`;
const ws = new WebSocket(wsUrl);

const WebSocketClient = {
	promises: {},
	onMessage: () => {},
	onError: () => {},
	onOpen: () => {},
	onClose: () => {},

	_onMessage: ({ data }) => {
		WebSocketClient.onMessage(
			JSON.parse(data).map((nodeData) => {
				const {
					[tokenName]: token,
					...node
				} = nodeData;
				const promises = WebSocketClient.promises[token];
				if (promises) {
					promises.resolve(node);
				}
				return node;
			})
		);
	},
	
	send: (data) => {
		return new Promise((resolve, reject) => {
			const token = WebSocketClient.getToken();
			WebSocketClient.promises[token] = { resolve, reject };
			ws.send(JSON.stringify({
				...data,
				[tokenName]: token,
			}));
		});
	},
	
	getToken: () => Math.random() * (99999 - 0),
};

ws.onopen = WebSocketClient.onOpen;
ws.onclose = WebSocketClient.onClose;
ws.onerror = WebSocketClient.onError;
ws.onmessage = WebSocketClient._onMessage;

export default WebSocketClient
