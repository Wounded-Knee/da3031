import config from '../config';
global.Promise = require('bluebird');
Promise.config({ cancellation: true });
import axios from 'axios';

const {
	restdbUrl,
	restdbTimeout,
	apikey,
	pollInterval,
} = config;

const axiosInstance = axios.create({
	baseURL: restdbUrl,
	timeout: restdbTimeout,
	headers: {
		"x-apikey": apikey,
		"Content-Type": "application/json",
		"cache-control": "no-cache",
	},
	withCredentials: false,
});

const restDBDirect = (new (class RestDBDirect {
	constructor() {
		this.freshestNode = undefined;
		this.connections = [];
		this.connectionPromise = undefined;
		this.callbacks = {
			receiveNodes: [],
			networkStart: [],
			networkEnd: [],
			networkError: [],
			networkClear: [],
		};
	}

	poll() {
		this
			.getNodes({freshest: true})
			.finally(() => {
				setTimeout(
					this.poll.bind(this),
					pollInterval
				);
			})
	}

	/* Events
	**********/
	onNetworkStart(callback) {
		return this.on('networkStart', callback);
	}

	onNetworkEnd(callback) {
		return this.on('networkEnd', callback);
	}

	onReceiveNodes(callback) {
		return this.on('receiveNodes', callback);
	}

	fire(event, args) {
		if (args instanceof Array && args.length > 3) {
			console.warn(`${args.length} arguments passed to fire(), did you forget to pass args as an array?`);
		}
		console.log('RestDBDirect Event: ', event);
		if (typeof(this.callbacks[event]) !== 'undefined') {
			this.callbacks[event].map(
				(callback) => {
					callback.apply(null, args);
				}
			);
		}
	}

	on(event, callback) {
		this.callbacks[event].push(callback);
		return this;
	}

	registerNodes(nodes) {
		nodes.forEach(
			(node) => {
				this.freshestNode = (
					!this.freshestNode ||
					node.date > this.freshestNode.date
				)
					? node
					: this.freshestNode
			}
		);

		if (!(nodes instanceof Array)) {
			console.error('Bad nodes ', nodes);
		} else {
			this.fire('receiveNodes', [nodes]);
		}
		return nodes;
	}

	registerConnection(connection) {
		this.connections.push(connection);
		if (this.connectionPromise) {
			this.connectionPromise.cancel();
		} else {
			console.groupCollapsed('RestDBDirect: Network Fetch');
			this.fire('networkStart', [this.connections]);
		}
		this.connectionPromise = Promise
			.all(this.connections)
			.catch((err) => {
				this.fire('networkEnd');
				this.fire('networkError');
				console.groupEnd();
				const beforeCount = this.connections.length;
				this.connections = this.connections.filter(
					(connection) => connection.isPending()
				);
				console.log('Cleaned up ' + (beforeCount - this.connections.length) + ' rejected connections');
				return false;
			})
			.then((cont) => {
				if (cont) {
					this.connectionPromise = undefined;
					this.connections = [];
					this.fire('networkEnd');
					this.fire('networkClear');
					console.groupEnd();
				}
			});

		return connection;
	}

	createNode(node) {
		return this.registerConnection(
			axiosInstance
				.post('nodes', node)
				.then((response) => {
					const {
						_changed, _changedby, _createdby, _keywords, _tags, _version, _id, _created,
						date, id,
						...nodeData
					} = response.data;
					const createdData = {
						id: _id,
						date: new Date(_created),
						creator: 'createData()',
						...nodeData
					};
					console.log('restDBDirect.createNode() returns ', createdData);
					return this.registerNodes([createdData]);
				})
		);
	}

	getNodes({ freshest }={}) {
		const query = freshest && this.freshestNode ? {
			"_changed": {
				"$gt": {
					"$date": this.freshestNode.date.toISOString()
				}
			}
		} : undefined;

		return this.registerConnection(
			axiosInstance
				.get('nodes' + (query ? `?q=${JSON.stringify(query)}` : ''))
				.catch((err) => {
					if (!freshest) {
						console.warn('Failed initial node load, retrying in 3s...');
						setTimeout(this.getNodes.bind(this), 3000);
					}
					throw new Error(err);
					return false;
				})
				.then((response) => response.data.map(
					(node) => {
						const {
							_id, date,
							...nodeData
						} = node;

						return {
							id: _id,
							date: new Date(date),
							...nodeData
						};
					}
				))
				.then(this.registerNodes.bind(this))
				.then(this.poll.bind(this))
		);
	}
})());

export default restDBDirect;
