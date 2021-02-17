const config = require('./config');
const webSocketServer = require('./webSocketServer');
const { mixins } = config;

class D3 {
	constructor() {
		this.inventoryMixins();
		webSocketServer.onNewCache(this.initializeMixins.bind(this));
	}
	
	inventoryMixins() {
		console.log(`Mixins: ${ mixins.map((mixin) => mixin.name).join(', ') }`);
	}
	
	initializeMixins() {
		return mixins.reduce((promiseChain, mixin) => {
			const { nodes } = mixin;
			return nodes.reduce((promiseChain, node) => {
		    return promiseChain.then(chainResults =>
	        webSocketServer
	        	.addNode(node)
	        	.then(() => { console.log(`Registered ${mixin.name}:${node.text}`)})
			  );
			}, Promise.resolve([])).then(arrayOfResults => {
			  // Do something with all results
			});
	    return promiseChain.then(chainResults =>
        mixin.then(currentResult =>
          [ ...chainResults, currentResult ]
        )
		  );
		}, Promise.resolve([]));
	}
}

module.exports = (new D3());
