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

class AnnuitCœptisAbstract {
	constructor({ router, setState }) {
		console.log('AnnuitCœptis', this);
		this.ee = new EventEmitter();
		const emitter = (eventType) => this.emit.bind(this, eventType);
		this.data = [];
		this.setState = setState || this.setState;
		this.router = router;
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
			this.setStatus('wsConnected', true);
		});
		this.once('wsDisconnect', () => {
			this.setStatus('wsConnected', false);
		});

		WebSocketClient.onMessage = (data) => this.assimilateNodes(data);
		WebSocketClient.onClose = emitter('wsDisconnect');
		WebSocketClient.onOpen = emitter('wsConnect');
		WebSocketClient.connect();
	}
	
	setState() {
		throw new Error('You\'re supposed to override AnnuitCœptisAbstract.setState().');
	}
	
	setStatus(type, bool) {
		this.setState((state, props) => ({
			status: {
				...state.status,
				[type]: bool,
			},
		}));
	}
	
	navigateToNode({ id }) {
		return this.router.push(`/node/${id}`);
	}
	
	reRender() {
		return this.setState((state, props) => ({
			renderCount: state.renderCount+1
		}));
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
	
	emit(...options) {
		return this.ee.emit(...options);
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
		this.setStatus('dataLoaded', true);
		this.setStatus('dataLoading', false);
		nodes.forEach((node) => {
			if (!this.getDataById(node.id, true)) {
				this.data.push(node);
			}
		});
		this.reRender();
	}
};

// Mix in mixins
for (var x=0, AnnuitCœptis=AnnuitCœptisAbstract; x<mixins.length; x++) {
	AnnuitCœptis = (mixins[x].extend || function(y) { return y })(AnnuitCœptis);
}

// Mix in nodeTypes
for (var x=0; x<nodeTypes.length; x++) {
	AnnuitCœptis = (nodeTypes[x].extend || function(y) { return y })(AnnuitCœptis);
}

export {
	AnnuitCœptis
};
