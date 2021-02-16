import d3config from '../d3.config';
import WebSocketClient from './WebSocketClient.class';
import EventEmitter from 'events';
import debounce from 'debounce';
import discordOauth2 from './DiscordOauth2.class';
import dynamic from 'next/dynamic';
const {
	nodeTypes,
	mixins,
} = d3config;

class AnnuitCœptis {
	constructor() {
		this.data = [];
		this.ee = new EventEmitter();
		this.setReRenderCallback( () => {} );
		this.status = {
			dataLoading: false,
			dataLoaded: false,
			wsConnected: false,
			wsNetworkError: false,
		};

		this.once('gotWindow', (window) => {
			discordOauth2.setUrl(window.location.search); // Send oauth code to its handler
		});

		this.once('wsConnect', () => {
			this.status.wsConnected = true;
		});
		this.once('wsDisconnect', () => {
			this.status.wsConnected = false;
		});

		WebSocketClient.onMessage = (data) => this.assimilateNodes(data);
		WebSocketClient.onClose = this.ee.emit.bind(this.ee, 'wsDisconnect');
		WebSocketClient.onOpen = this.ee.emit.bind(this.ee, 'wsConnect'); // Race condition, so...
		WebSocketClient.connect();
	}

	getNodeTypes() {
		return [];
	}

	getRendererByNodeType(nodeType) {
		return dynamic(() => import('../nodeTypes/'+nodeType+'/Node'));
	}

	on(...options) {
		return this.ee.on(...options);
	}

	once(...options) {
		return this.ee.once(...options);
	}

	isInitialized() {
		const {
			dataLoaded,
			dataLoading,
			wsConnected,
		} = this.status;

		return (
			dataLoaded &&
			wsConnected
		);
	}

	getData() {
		return this.data.map(
			this.hydrateData.bind(this)
		);
	}

	filter(criteriaFunc) {
		return this.data.filter(criteriaFunc).map(this.hydrateData.bind(this));
	}

	getOrphans() {
		return this.filter(
			(node) => this.hydrateData(node).getParents().length === 0
		);
	}

	getDataById(nodeId, extant) {
		const data = this.data.find(item => item.id == nodeId);
		if (extant) {
			return data !== undefined;
		} else {
			if (data === undefined) {
				console.warn(`AnnuitCœptis: Node #${nodeId} not found`);
				return undefined;
			} else {
				return this.hydrateData(data);
			}
		}
	}

	hydrateData(data) {
		// Todo: Relations
		return data;
	}

	createData(data) {
		if (!this.isInitialized()) {
			console.error('Data cannot be created until app initializes.');
			return false;
		}
		const newData = this.conceiveData(data);
		return WebSocketClient.send(newData);
	}

	conceiveData(data) {
		return data;
	}

	assimilateNodes(nodes) {
		if (!(nodes instanceof Array)) {
			console.error('assimilateNodes: These aren\'t nodes: ', nodes);
			return false;
		}
		this.status.dataLoaded = true;
		this.status.dataLoading = false;
		nodes.forEach((node) => {
			if (!this.getDataById(node.id, true)) {
				this.data.push(node);
			}
		});
		this.reRenderCallback();
	}

	setReRenderCallback(cb) {
		this.reRenderCallback = debounce(() => {
			cb();
			console.log('Re-render requested');
		}, 1000);
	}
};

// Mix in mixins
for (var x=0, AnnuitCœptisII=AnnuitCœptis; x<mixins.length; x++) {
	AnnuitCœptisII = (mixins[x].extend || function(y) { return y })(AnnuitCœptisII);
}

// Mix in nodeTypes
for (var x=0; x<nodeTypes.length; x++) {
	AnnuitCœptisII = (nodeTypes[x].extend || function(y) { return y })(AnnuitCœptisII);
}

// New instance
const annuitCœptis = new AnnuitCœptisII();

export {
	annuitCœptis
};
