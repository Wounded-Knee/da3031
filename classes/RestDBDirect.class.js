import config from '../config';
import axios from 'axios';
const {
	restdbUrl,
	restdbTimeout,
	apikey,
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
	createNode(node) {
		return axiosInstance
			.post('', node)
			.then((response) => {
				const {
					_changed, _changedby, _createdby, _keywords, _tags, _version, _id, _created,
					date, id,
					...nodeData
				} = response.data;
				const createdData = {
					id: _id,
					date: _created,
					creator: 'createData()',
					...nodeData
				};
				console.log('restDBDirect.createNode() returns ', createdData);
				return createdData;
			});
	}

	getNodes(startDate) {
		return axiosInstance
			.get()
			.then((response) => {
				console.log('getNodes() ', response);
				return response.data.map(
					(node) => {
						const {
							_id,
							...nodeData
						} = node;

						return {
							id: _id,
							...nodeData
						};
					}
				);
			});
	}
})());

export default restDBDirect;
