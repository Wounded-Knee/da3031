const config = require('./config');
const webSocketServer = require('./webSocketServer');
const { mixins } = config;

class D3 {
	constructor() {
		this.inventoryMixins();
		webSocketServer.onNewCache(this.initializeMixins.bind(this));
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
