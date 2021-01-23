import test from './test.mixin';
import NodeType from './NodeType.mixin';
import Author from './Author.mixin';
import Relationship from './Relationship.mixin';
import Navigation from './Navigation.mixin';
import User from './User.mixin';
import Avatar from './Avatar.mixin';
const mixins = [User, Avatar, Relationship, Navigation];
const axios = (require('axios')).create({
	baseURL: 'https://da3031-adea.restdb.io/rest/nodes',
	timeout: 15000,
	withCredentials: false,
	headers: {
		"cache-control": "no-cache",
		"Content-Type": "application/json; charset=utf-8",
		"x-apikey": "600b23461346a1524ff12d30"
	}
});
const authorId = 100;

class AnnuitCœptis {
	constructor(mixins) {
		this.data = [];
		this.lastId = 0;
		for (var x=0; x<mixins.length; x++) {
			mixins[x].initialize ? mixins[x].initialize(this) : '';
		}
		this.setReRenderCallback( () => {} );
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
			console.log(`AnnuitCœptis: Node #${nodeId} not found`);
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
					console.log('AXIOS response ', nodeData);
					this.data.push(nodeData);
					resolve(nodeData);
					reRenderCallback();
					//this.data.push(newData);
				})
				.catch(err => {
					reject();
					console.error('AXIOS error ', err);
				})
		);

		console.warn('AXIOS Promise', promise, this);
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
			.then(res => { console.log('Loaded nodes: ', res); return res; })
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
			.then(nodes => this.data = nodes)
			.then(reRenderCallback)
			.catch(err => {
				console.error('AXIOS error ', err);
			});
	}

	setReRenderCallback(cb) {
		this.reRenderCallback = cb;
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

/*
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
*/
export {
	annuitCœptis
};
