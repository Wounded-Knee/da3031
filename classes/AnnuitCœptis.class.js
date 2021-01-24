import test from './test.mixin';
import NodeType from './NodeType.mixin';
import Author from './Author.mixin';
import Relationship from './Relationship.mixin';
import Navigation from './Navigation.mixin';
import User from './User.mixin';
import Avatar from './Avatar.mixin';
import config from '../config';
const {
	apikey,
	restdbUrl,
	restdbTimeout,
	runStartupScript
} = config;

const axios = (require('axios')).create({
	baseURL: restdbUrl,
	timeout: restdbTimeout,
	withCredentials: false,
	headers: {
		"cache-control": "no-cache",
		"Content-Type": "application/json; charset=utf-8",
		"x-apikey": apikey
	}
});
const mixins = [User, Avatar, Relationship, Navigation];

class AnnuitCœptis {
	constructor(mixins) {
		this.data = [];
		this.lastId = 0;
		for (var x=0; x<mixins.length; x++) {
			mixins[x].initialize ? mixins[x].initialize(this) : '';
		}
		this.setReRenderCallback( () => {} );
		this.restdb = undefined;
	}

	link(relationshipType, relatives) {
		return this.createData({
			relationshipType_id: relationshipType.id,
			relatives: relatives.map( relative => relative.id )
		});
	}

	getData() {
		return this.data.map(
			this.hydrateData.bind(this)
		);
	}

	filter(criteriaFunc) {
		return this.data.filter(criteriaFunc).map(this.hydrateData.bind(this));
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
		const newData = this.conceiveData(data);
		const promise = new Promise(
			(resolve, reject) => axios
				.post(undefined, JSON.stringify(data))
				.then(res => {
					const {
						_changed, _changedby, _created, _createdby, _keywords, _tags, _version, _id,
						...nodeData
					} = res.data;
					return {
						id: _id,
						date: _created,
						...nodeData
					};
				})
				.then(nodeData => {
					const { reRenderCallback = () => {} } = this;
					this.data.push(nodeData);
					resolve(nodeData);
					reRenderCallback();
				})
				.catch(err => {
					reject();
				})
		);

		return promise;
	}

	conceiveData(data) {
		return {
			...data,
			date: new Date()
		};
	}

	loadData() {
		console.log('Loading Data', annuitCœptis);
		const { reRenderCallback = () => {} } = this;
		axios
			.get()
			.then(res => res.data.map(
				data => {
					const {
						_changed, _changedby, _created, _createdby, _keywords, _tags, _version, _id,
						...nodeData
					} = data;

					const newData = {
						id: _id,
						date: _created,
						...nodeData
					};

					return newData;
				}
			))
			.then(nodes => {
				console.log(`Loaded ${nodes.length} nodes from the server.`);
				return nodes;
			})
			.then(nodes => this.data = nodes)
			.then(reRenderCallback)
			.catch(err => {
				console.error('AXIOS error ', err);
			});
	}

	setReRenderCallback(cb) {
		this.reRenderCallback = cb;
	}

	setRestDB(restDB) {
		if (!this.restdb) {
			this.restdb = restDB;

			this.getRestDB().on('POST', (error, eventData) => {
				const {
					_version, _id,
					...newData
				} = eventData.data;

				if (this.getDataById(_id) === undefined) {
					this.data.push({
						id: _id,
						...newData
					});
					console.log('RestDB.RDE: Assimilated.', eventData);
				} else {
					console.log('RestDB.RDE: ID already exists locally, ignoring.', eventData);
				}
			});

			console.log('RestDB.RDE now listening.');
		}
	}

	getRestDB() {
		return this.restdb;
	}

	_getNewID() {
		const id = this.lastId++;
		return id;
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
