import NodeType from './NodeType.mixin';
import Author from './Author.mixin';
import Relationship from './Relationship.mixin';
import User from './User.mixin';
import Avatar from './Avatar.mixin';
import Navigation from './Navigation.mixin';
import config from '../config';
import EventEmitter from 'events';
import restDBDirect from './RestDBDirect.class';
import debounce from 'debounce';
import jscookie from 'js-cookie';
import discordOauth2 from './DiscordOauth2.class';
const {
	runStartupScript,
} = config;
const mixins = [User, Avatar, Relationship, Navigation];

console.log(jscookie);

class AnnuitCœptis {
	constructor(mixins) {
		this.data = [];
		this.window = undefined;
		this.ee = new EventEmitter();
		this.setReRenderCallback( () => {} );
		this.status = {
			dataLoading: false,
			dataLoaded: false,
			dbConnected: false,
			dbNetworkError: false,
			hasWinRef: false,
		};
		this.restdb = undefined;

		this.once('gotWindow', (window) => {
			discordOauth2.setUrl(window.location.search); // Send oauth code to its handler
			window.Promise = Promise; // Polyfill Promises with Bluebird
		});

		this.once('dbConnect', () => {
			this.status.dbConnected = true;
			restDBDirect
				.onReceiveNodes(
					this.assimilateNodes.bind(this)
				)
				.onNetworkStart(
					() => {
						this.status.dataLoading = true;
						this.reRenderCallback();
					}
				)
				.on('networkError',
					() => {
						this.status.dbNetworkError = true;
						this.reRenderCallback();
					}
				)
				.on('networkClear',
					() => {
						this.status.dbNetworkError = false;
						this.reRenderCallback();
					}
				)
				.onNetworkEnd(
					() => {
						this.status.dataLoading = false;
						this.reRenderCallback();
					}
				);
			this.loadData({ freshest: false });
		});

		this.ee.emit('dbConnect');
	}

	getLocalData() {
		return JSON.parse(this.window.localStorage.getItem('d3'));
	}

	setLocalData(data) {
		this.window.localStorage.setItem('d3', JSON.stringify(data));
	}

	getRestDBDirect() {
		return restDBDirect;
	}

	on(eventName, callBack) {
		return this.ee.on(eventName, callBack);
	}

	once(eventName, callBack) {
		return this.ee.once(eventName, callBack);
	}

	isInitialized() {
		const {
			dataLoaded,
			dataLoading,
			dbConnected,
			hasWinRef
		} = this.status;

		return (
			dataLoaded &&
			dbConnected &&
			hasWinRef
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

	getDataById(nodeId) {
		const data = this.data.find(item => item.id === nodeId);
		if (data === undefined) {
			console.warn(`AnnuitCœptis: Node #${nodeId} not found`);
			return undefined;
		}
		return this.hydrateData(data);
	}

	hydrateData(data) {
		// Todo: Relations
		return data;
	}

	createData(data) {
		if (!this.isInitialized()) {
			console.error('Data cannot be created until app initializes.', this.status);
			return new Promise((r,a) => {});
		}
		const receiveCreatedData = (createdData) => {
			console.log('Created node ', createdData, ' using data ', data, ' with id ', createdData.id);
			const { reRenderCallback = () => {} } = this;
			this.assimilateNodes([createdData]);
			reRenderCallback();
			return createdData;
		};

		const newData = this.conceiveData(data);
		const promise = restDBDirect
				.createNode(newData)
				.then(receiveCreatedData);

		return promise;
	}

	conceiveData(data) {
		return {
			...data,
			date: new Date()
		};
	}

	assimilateNodes(nodes) {
		nodes.forEach((node) => {
			if (!this.getDataById(node.id)) {
				this.data.push(node);
				this.reRenderCallback();
			} else {/*
				console.warn(
					`Resisted assimilation of ${node.text} on account of the ID is already in the local cache.`, node
				);
			*/}
		});
	}

	loadData() {
		this.status.dataLoaded = false;
		this.status.dataLoading = true;
		console.log('Loading Data', this);
		const { reRenderCallback = () => {} } = this;

		const receiveData = (nodes) => {
			this.status.dataLoaded = true;
			this.status.dataLoading = false;
			this.reRenderCallback();
			console.log(`Loaded ${nodes.length} nodes from the server.`);
			return nodes;
		};

		return restDBDirect
			.getNodes()
			.then((nodes) => {
				console.log('Assimilating nodes ', nodes);
				this.assimilateNodes(nodes);
				return nodes;
			})
			.then(receiveData)
			.catch((err) => {
				console.error('Error fetching nodes.', err);
			});
	}

	setReRenderCallback(cb) {
		this.reRenderCallback = debounce(cb, 1000);
	}

	setRestDB(restDB) {
		if (!this.restdb) {
			this.restdb = restDB;

			this.getRestDB().on('DISCONNECT', () => {
				this.ee.emit('dbDisconnect');
				this.status.dbConnected = false;
				this.reRenderCallback();
			});

			this.getRestDB().on('POST', (error, eventData) => {
				const {
					_version, _id,
					...newData
				} = eventData.data;

				if (this.getDataById(_id) === undefined) {
					this.data.push({
						id: _id,
						creator: 'setRestDB()',
						...newData
					});
					console.log('RestDB.RDE: Assimilated.', eventData);
				} else {
					console.log('RestDB.RDE: ID already exists locally, ignoring.', eventData);
				}
			});

			this.status.dbConnected = true;
			this.ee.emit('dbConnect');
			console.log('RestDB.RDE now listening.');
		}
	}

	setWindow(window) {
		if (window) {
			this.window = window;
			window.annuitCœptis = this;
			this.status.hasWinRef = true;
			this.ee.emit('gotWindow', window);
		}
	}

	getWindow() {
		return this.window;
	}

	getRestDB() {
		return this.restdb;
	}
};

// Mix in mixins
for (var x=0, AnnuitCœptisII=AnnuitCœptis; x<mixins.length; x++) {
	AnnuitCœptisII = (mixins[x].extend || function(y) { return y })(AnnuitCœptisII);
}

// New instance
const annuitCœptis = new AnnuitCœptisII(mixins);

if (runStartupScript) {
	// Testing
	const
		RT_CHILD_OF = 0,
		RT_AUTHOR_OF = 1,
		RT_TRAVELER = 2
	;

	const nodes = {};

	annuitCœptis.createData({
		text: 'SYSTEM',
	}).then(
		(SYSTEM) => {
			nodes.SYSTEM = SYSTEM;
			annuitCœptis.setUser(SYSTEM);
			return SYSTEM;
		}
	).then(
		(SYSTEM) => annuitCœptis.createUser({
			text: 'Joel Kramer',
			rel: {
				[ RT_AUTHOR_OF ]: [ SYSTEM ]
			}
		})
	).then(
		(usrJoelKramer) => {
			nodes.usrJoelKramer = usrJoelKramer;
			annuitCœptis.setUser(usrJoelKramer);
			return usrJoelKramer;
		}
	).then(
		(usrJoelKramer) => annuitCœptis.createAvatar({
			text: 'Heyoka',
			rel: {
				[ RT_AUTHOR_OF ]: [ usrJoelKramer ]
			}
		})
	).then(
		(avaHeyoka) => {
			nodes.avaHeyoka = avaHeyoka;
			annuitCœptis.setAvatar(avaHeyoka);
			return avaHeyoka;
		}
	).then(
		() => annuitCœptis.createAvatar({
			text: 'Drew',
			rel: {
				[ RT_AUTHOR_OF ]: [ nodes.usrJoelKramer ]
			}
		})
	).then(
		(avaDrew) => {
			nodes.avaDrew = avaDrew;
			return avaDrew;
		}
	).then(
		(avaDrew) => annuitCœptis.createData({
			text: 'Hello, world!',
			rel: {
				[ RT_AUTHOR_OF ]: [ nodes.avaHeyoka ]
			}
		})
	).then(
		(comHeyoka1) => {
			nodes.comHeyoka1 = comHeyoka1;
			return comHeyoka1;
		}
	).then(
		(comHeyoka1) => annuitCœptis.createData({
			text: 'Hi.',
			rel: {
				[ RT_AUTHOR_OF ]: [ nodes.avaDrew ],
				[ RT_CHILD_OF ]: [ comHeyoka1 ]
			}
		})
	).then(
		() => {
			annuitCœptis.navigate(undefined, nodes.comHeyoka1);
			annuitCœptis.navigate(nodes.comHeyoka1, nodes.comDrew1);
		}
	);
}

export {
	annuitCœptis
};
