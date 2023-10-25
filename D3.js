const config = require('./config');
const webSocketServer = require('./webSocketServer');
const dreamkeeper = require('./dreamkeeper');
const { mixins } = config;

class D3 {
	constructor() {
		this.inventoryMixins();
		webSocketServer.onNewCache(() => {
			return this
				.initializeMixins()
				//.then(() => this.lotsaNodes());
		});
	}
	
	// Stress-tests the system with 2680 data nodes
	lotsaNodes() {
		const lines = [
			...dreamkeeper,
			...dreamkeeper,
			...dreamkeeper,
			...dreamkeeper,
		];
		return lines.reduce((promiseChain, line) => {
	    return promiseChain.then(chainResults =>
        webSocketServer
        	.addNode({
        		text: line
        	})
		  );
		}, Promise.resolve([]));
	}
	
	inventoryMixins() {
		console.log(`Mixins: ${ mixins.map((mixin) => mixin().name).join(', ') }`);
	}
	
	initializeMixins() {
		return mixins.reduce((promiseChain, mixin) => {
			const { nodes, uuid, name } = mixin();
			return nodes.reduce((promiseChain, node) => {
		    return promiseChain.then(chainResults =>
	        webSocketServer
	        	.addNode({
	        		...node,
	        		mixin_id: uuid,
	        	})
	        	.then(() => {
	        		console.log(`Registered ${name}:${node.text}`)
	        	})
			  );
			}, Promise.resolve([]));
		}, Promise.resolve([]));
	}
}

module.exports = (new D3());
