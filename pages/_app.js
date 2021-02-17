import React from 'react';
import '../styles/globals.css'
import config from '../d3.config';
import EventEmitter from 'events';
import debounce from 'debounce';
import dynamic from 'next/dynamic';
import WebSocketClient from '../classes/WebSocketClient.class';
import discordOauth2 from '../classes/DiscordOauth2.class';
import { withRouter } from 'next/router';
const { mixins } = config;

class D3 extends React.Component {
	constructor(props) {
		super(props);
		console.log(this);
		this.ee = new EventEmitter();
		this.state = {
			renderCount: 0,
			nodes: [],
			status: {
				dataLoading: false,
				dataLoaded: false,
				wsConnected: false,
				wsNetworkError: false,
			}
		};

		mixins.forEach((mixin) => mixin(this));

		this.once('gotWindow', (window) => {
			discordOauth2.setUrl(window.location.search); // Send oauth code to its handler
		});

		WebSocketClient.onMessage = (nodes) => this.assimilateNodes(nodes);
		WebSocketClient.onClose = () => this.setStatus('wsConnected', false);
		WebSocketClient.onOpen = () => this.setStatus('wsConnected', true);
		WebSocketClient.connect();
	}
	
	getQuery() {
		return this.props.router.query;
	}

	setStatus(type, bool) {
		this.setState((state, props) => ({
			status: {
				...state.status,
				[type]: bool,
			},
		}));
		return this;
	}
	
	getStatus(type) {
		return this.state.status[type];
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
		} = this.state.status;

		return (
			dataLoaded &&
			wsConnected
		);
	}

	getData(...options) {
		return this.getNodes(...options);
	}
	
	getNodes() {
		return this.state.nodes.map(
			this.hydrateData.bind(this)
		);
	}

	filter(criteriaFunc) {
		return this.state.nodes.filter(criteriaFunc).map(this.hydrateData.bind(this));
	}

	getOrphans() {
		return this.filter(
			(node) => {
				const _node = this.hydrateData(node);
				return _node.getParents().length === 0;
			}
		);
	}

	getDataById(...options) {
		return this.getNodeById(...options);
	}
	
	getNodeById(id, extant) {
		const node = this.state.nodes.find(item => item.id == id);
		if (extant) {
			return node !== undefined;
		} else {
			if (node === undefined) {
				console.warn(`D3: Node #${id} not found`);
				return undefined;
			} else {
				return this.hydrateData(node);
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
		this.setStatus('dataLoaded', true).setStatus('dataLoading', false);
		this.setState((state, props) => ({
			nodes: [
				...state.nodes,
				...nodes.filter((node) => !this.getDataById(node.id)),
			],
		}));
	}

	render() {
		const { router, Component, pageProps } = this.props;
		const props = {
			d3: this,
			...pageProps,
		};

		return (
			<Component {...props} />
		);
	}
};

export default withRouter(D3);
