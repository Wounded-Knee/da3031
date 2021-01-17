import test from './test.mixin';
import NodeType from './NodeType.mixin';
import Author from './Author.mixin';
import Relationship from './Relationship.mixin';
//const mixins = [test, NodeType, Author];
const mixins = [Relationship];
//const mixins = [];

const authorId = 100;

class AnnuitCœptis {
	constructor(mixins) {
		this.data = [
		];
		this.lastId = 0;
		this.activeUser = null;
		this.activeAvatar = null;
		this.defaultDataType = {
			id: 0
		}

		for (var x=0; x<mixins.length; x++) {
			mixins[x].initialize ? mixins[x].initialize(this) : '';
		}
	}

	getDefaultDataType() {
		return this.data.find(item => item.id === 0);
	}

	getNode(id=1) {
		return this.getDataById(id);
	}

	getDataById(id) {
		const thisNode = this.data.find((node) => node.id === parseInt(id));
		if (thisNode === undefined) throw new Error('Cannot find node id#' + id);
		thisNode.getRelations = this.getRelationsOf.bind(this, thisNode);
		return thisNode;
	}

	getRelationsOf(node) {
	}

	getRelationship(nodeRelation) {
		return {
			...nodeRelation,
			author: getDataById(nodeRelation.author_id)
		};
	}

	activateUser(user) {
		console.log(user.text, ' activated');
		return this.activeUser = user;
	}

	createUser(username, emoji) {
		const user = this.createData(meta.nodeTypes.user, { text: username, emoji: emoji });
		return {
			...user,
			activate: this.activateUser.bind(this, user)
		};
	}

	createAvatar(username, emoji) {
		return this.createData(meta.nodeTypes.user, { text: username, emoji: emoji });
	}

	createNode(text) {
		return this.createData('node', { text: text });
	}

	// Used methods are below this line -------------

	link(relationshipType, node1, node2) {
		return this.createData({
			relationshipType_id: relationshipType.id,
			relatives: [node1.id, node2.id]
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
		}
		return this.hydrateData(data);
	}

	hydrateData(data) {
		// Todo: Relations
		return data;
	}

	createData(data) {
		const newData = this.conceiveData(data);
		this.data.push(newData);
		return newData;
	}

	conceiveData(data) {
		return {
			...data,
			id: this._getNewID(),
			date: new Date()
		};
	}

	_getNewID() {
		const id = this.lastId++;
		console.log('_getNewID()', id);
		return id;
	}
};

// Mix in mixins
for (var x=0, AnnuitCœptisII=AnnuitCœptis; x<mixins.length; x++) {
	AnnuitCœptisII = (mixins[x].extend || function(y) { return y })(AnnuitCœptisII);
}

// New instance
const annuitCœptis = new AnnuitCœptisII(mixins);

// Testing
const
	RT_CHILD_OF = 0,
	RT_AUTHOR_OF = 1
;
console.log('annuitCœptis ', annuitCœptis);

const SYSTEM = annuitCœptis.createData({
	text: 'SYSTEM',
});
const usrJoelKramer = annuitCœptis.createData({
	text: 'Joel Kramer',
	rel: {
		[ RT_AUTHOR_OF ]: [ SYSTEM ]
	}
});
const avaHeyoka = annuitCœptis.createData({
	text: 'Heyoka',
	rel: {
		[ RT_AUTHOR_OF ]: [ usrJoelKramer ]
	}
});
const avaDrew = annuitCœptis.createData({
	text: 'Drew',
	rel: {
		[ RT_AUTHOR_OF ]: [ usrJoelKramer ]
	}
});
const comHeyoka1 = annuitCœptis.createData({
	text: 'Hello, world!',
	rel: {
		[ RT_AUTHOR_OF ]: [ avaHeyoka ]
	}
});
const comDrew2 = annuitCœptis.createData({
	text: 'Hi.',
	rel: {
		[ RT_AUTHOR_OF ]: [ avaDrew ],
		[ RT_CHILD_OF ]: [ comHeyoka1 ]
	}
});

// const meta = {
// 	nodeTypes: {
// 		relation: annuitCœptis.createData({ text: 'Relation' }),
// 		user: annuitCœptis.createData({ text: 'User' }),
// 		avatar: annuitCœptis.createData({ text: 'Avatar' }),
// 		comment: annuitCœptis.createData({ text: 'Comment' })
// 	}
// };

/*,
	relation: {
		lineage: annuitCœptis.createData('relation', {
			name: "Lineage",
			titles: [
				{s: 'parent', p: 'parents'},
				{s: 'child', p: 'children'}
			]
		}),
		lineage: annuitCœptis.createData('relation', {
			name: "Confederation",
			titles: [
				{s: 'federation', p: 'federations'},
				{s: 'state', p: 'states'}
			]
		}),
		lineage: annuitCœptis.createData('relation', {
			name: "Authorship",
			titles: [
				{s: 'author', p: 'authors'},
				{s: 'work', p: 'works'}
			]
		}),
	}
};

const usrHeyoka = annuitCœptis.createUser('Heyoka').activate();
const avaBillCarson = annuitCœptis.createAvatar('Bill Carson');
const txtHelloWorld = annuitCœptis.createNode('Hello, world!');
*/

export default annuitCœptis;
