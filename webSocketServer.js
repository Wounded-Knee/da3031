const config = require('./config');
const WebSocket = require('ws');
const fs = require('fs');
const {
	tokenName,
} = config.ws;

class WebSocketServer {
	constructor() {
		this.nextID = 0;
		this.connections = [];
		this.onNewCacheCallback = () => Promise.resolve();
		this.loadCache().then(() => {
			this.startListening();
		});
	}

	broadcast(data) {
		this.connections.forEach(({ connection }) => {
			connection.send(JSON.stringify(data));
		});
	}
	
	send(connection, data) {
		return connection.send(JSON.stringify(data));
	}

	receive(request, data) {
		const {
			[tokenName]: token,
			...node
		} = JSON.parse(data);

		return this.addNode(node, request, token);
	}
	
	addNode(node, request, token) {
		const remoteAddress = request ? request.socket.remoteAddress : 'SYSTEM';
		return new Promise((resolve, reject) => {
			const node2 = {
				...node,
				date: new Date(),
				id: this.getNextID(),
			};
			const node3 = token ? {
				...node2,
				[tokenName]: token,
			} : node2;
			this.cache.push(node3);
			this.saveCache().then((res) => {
				this.broadcast([ node3 ]);
				console.log(`WS: [${remoteAddress}] -> [*] `, node3);
				resolve();
			});
		});
	}
	
	getNextID() {
		return `${this.nextID++}`;
	}

	startListening() {
		const { port, address } = config.ws;
		console.log(`WS: Listening at ws://${address}:${port}`);
		(
			this.ws = new WebSocket.Server({ port })
		).on('connection', this.registerConnection.bind(this));
	}
	
	registerConnection(connection, request) {
		this.connections.push({
			connection,
			request
		});
		connection.on('message', this.receive.bind(this, request));

		// Send all nodes
		this.send(connection, this.cache);
		console.log(`WS: [${request.socket.remoteAddress}] just connected, so we have sent them ${this.cache.length} nodes from RAM cache`);
	}
	
	saveCache() {
		const { cacheFile } = config.ws;
	
		return new Promise((resolve, reject) => {
			fs.writeFile(cacheFile, JSON.stringify(this.cache), undefined, (err) => {
				if (err) {
					reject();
					throw new Error(`WS: Could not update cache file ${cacheFile}, check permissions.`);
				} else {
					resolve();
				}
			});
		});
	}
	
	loadCache() {
		const { cacheFile } = config.ws;
		this.cache = [];
	
		return new Promise((resolve, reject) => {
			fs.readFile(cacheFile, 'utf8', (err, data) => {
		    if (err) {
		        // No error, there's just no cache yet.
		        this.onNewCacheCallback().then(() => {
							fs.writeFile(cacheFile, JSON.stringify(this.cache), undefined, (err) => {
								if (err) {
									throw new Error(`WS: Could not create cache file ${cacheFile}, check permissions.`);
								} else {
									console.warn(`WS: No Node cache found, created one at ${cacheFile}`);
			        		resolve();
								}
							});
		        });
		    } else {
						this.cache = JSON.parse(data);
						this.nextID = this.cache.reduce(
							(highestId, node) => parseInt(node.id) > highestId ? parseInt(node.id) : highestId,
							this.nextID
						);
						console.log(`WS: Loaded ${this.cache.length} nodes from cache file ${cacheFile}`);
						resolve();
		    }
			});
		});
	}
	
	onNewCache(callback) {
		this.onNewCacheCallback = callback;
	}
}

module.exports = (new WebSocketServer());
