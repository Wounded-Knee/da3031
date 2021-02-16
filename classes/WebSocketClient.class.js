const config = require('../config');
import EventEmitter from 'events';
const WebSocket = require('isomorphic-ws');
const {
	port,
	address,
	tokenName,
} = config.ws;
const wsUrl = `ws://${address}:${port}/`;

const WebSocketClient = {
	statuses: [
		'idle',
		'disconnected',
		'connecting',
		'connected',
	],
	ws: undefined,
	queue: [],
	status: 0,
	promises: {},
	onMessage: () => {},
	onError: () => {},
	onOpen: () => {},
	onClose: () => {},
	
	connect: (url=wsUrl) => {
		return new Promise((resolve, reject) => {
			WebSocketClient.ws = new WebSocket(url);
			WebSocketClient.ws.onopen = WebSocketClient._onOpen;
			WebSocketClient.ws.onclose = WebSocketClient._onClose;
			WebSocketClient.ws.onerror = WebSocketClient.onError;
			WebSocketClient.ws.onmessage = WebSocketClient._onMessage;
			resolve();
		});
	},
	
	_onError: (...options) => {
		return WebSocketClient.onError(...options);
	},

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
	
	_onOpen: () => {
		WebSocketClient.status = 2;
		WebSocketClient.onOpen();
	},
	
	_onClose: () => {
		WebSocketClient.status = 1;
		WebSocketClient.onClose();
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

export default WebSocketClient
