import config from '../config';
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
		this.callbacks = {
			onReceiveNodes: []
		};
		setInterval(
			this.getNodes.bind(this, { freshest: true} ),
			pollInterval
		);
	}

	onReceiveNodes(callback) {
		this.callbacks.onReceiveNodes.push(callback);
	}

	registerNode(node) {
		if (!this.freshestNode || node.date > this.freshestNode.date) this.freshestNode = node;
		this.callbacks.onReceiveNodes.map(
			(callback) => callback([node])
		);
		return node;
	}

	createNode(node) {
		return axiosInstance
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
				return this.registerNode(createdData);
			});
	}

	getNodes({ freshest }={}) {
		const query = freshest && this.freshestNode ? {
			"_changed": {
				"$gt": {
					"$date": this.freshestNode.date.toISOString()
				}
			}
		} : undefined;

		return axiosInstance
			.get('nodes' + (query ? `?q=${JSON.stringify(query)}` : ''))
			.then((response) => {
				return response.data.map(
					(node) => {
						const {
							_id, date,
							...nodeData
						} = node;

						return this.registerNode({
							id: _id,
							date: new Date(date),
							...nodeData
						});
					}
				);
			});
	}
})());

export default restDBDirect;
