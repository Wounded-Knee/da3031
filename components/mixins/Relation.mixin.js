const { addMixin } = require('../../util/mixin');

const relationshipGetterNames = [
	'getChildren', 'getParents', 'getWorks', 'getAuthors', 'getPaths', 'getSteps', 'getTravelers'
];

// Preferences for getData() method
const suppressRelationNodes = true; // Exclude all nodes which contain relationship information
const expandRelationships = true; // Include related nodes as branches of main nodes (1 level deep)

const Relation = {
	name: 'Relation',

	uuid: 'd75f74d5-45d7-4c02-906e-bfd947a1f440',

	d3: {
		getData: function({ _super }, ...options) {
				return _super(...options)
					.map(
						item => ( expandRelationships ? {
							...item,
							...relationshipGetterNames.reduce(
								(propList, getterName) => ({
									...propList,
									[getterName]: item[getterName] ? item[getterName]() : undefined
								}),
								{}
							)
						} : item )
					)
					.filter(item => !suppressRelationNodes || item.relationType_id === undefined);
		},
		
		getRelationshipTypes: function({ _super, getMixinNodes }) {
			return getMixinNodes().map(rt => this.getRelationshipTypeById(rt.relationType_id));
		},
		
		getRelationshipTypeById: function({ _super, getMixinNodes }, id) {
			const rt = getMixinNodes().find(rt => rt.relationType_id === id);
			return {
				...rt,
				titles: [
					...rt.titles.map(
						title => ({
							...title,
							g: 'get' + title.p.replace(
								/\b[a-zA-Z]/g,
								(match) => match.toUpperCase()
							)
						})
					)
				]
			};
		},
		
		link: function({ _super }, relationshipType, relatives) {
			console.group(`Relationship: Linking nodes ${relatives.map( rel => rel.text ).join(', ') } as ${relationshipType.text}`);
			return this.createNode({
				relationType_id: relationshipType.id,
				relatives: relatives.map( relative => relative.id )
			}).then(
				(res) => {
					console.groupEnd();
					return res;
				}
			);
		},
	
		hydrateData: function({ _super }, data) {
			const superData = _super(data);
	
			return {
				...superData,
				...this.getRelationshipTypes().map(
					(relationshipType) => relationshipType.titles.reduce(
						(getters, title, titleIndex) => ({
							...getters,
							[title.g]: () => this.state.nodes.filter(
								(node) => {
									if (!node.relatives) return false;
									const relativeTitleIndex = node.relatives.indexOf(superData.id);
									return (
										node.relationType_id === relationshipType.id &&
										relativeTitleIndex !== -1 &&
										relativeTitleIndex !== titleIndex &&
										node.relatives[titleIndex] !== null
									);
								}
							).map(
								relationshipNode => {
									const relatedNode = this.getNodeById(
										relationshipNode.relatives[titleIndex]
									);
	
									if (!relatedNode) {
										console.error(`hydrateData(${relationshipType.text}): Cannot find ${node.text}'s' ${title} with a bad ID#${relationshipNode.relatives[titleIndex]}`);
										return {};
									} else {
										//console.log(`hydrateData(${relationshipType.text}): ${superData.text} (#${superData.id}) ${title.s} of ${relatedNode.text} (#${relatedNode.id})`);
										return relatedNode;
									}
								}
							)
						}), {}
					)
				).reduce( (acc, val) => ({ ...acc, ...val }) )
			};
		},
	
		createNode: function({ _super }, data) {
			const { rel, ...newData } = data;
			return _super(newData).then(
				(parentNode) => {
					if (rel !== undefined && parentNode) {
						for (var relationshipTypeIds=Object.keys(rel), x=0; x<relationshipTypeIds.length; x++) {
							const relationshipTypeId = parseInt(relationshipTypeIds[x]);
							const relationshipType = this.getRelationshipTypeById(relationshipTypeId);
							for (var y=0; y<rel[relationshipTypeId].length; y++) {
								const targetNode = rel[relationshipTypeId][y];
								if (targetNode) {
									return this
										.link(relationshipType, [ parentNode, targetNode ])
										.then((res) => {
											console.log(`${parentNode.text}(#${parentNode.id}) is now ${relationshipType.titles[0].s} of ${targetNode.text}(#${targetNode.id})`);
											return parentNode;
										})
										.catch((err) => {
											console.error(`Relationship link failed: ${parentNode.text}(#${parentNode.id}) as ${relationshipType.titles[0].s} of ${targetNode.text}(#${targetNode.id})`);
										});
								} else {
									console.error(`No target node to link @`, rel[relationshipTypeId]);
								}
							}
						}
					}
					return parentNode;
				}
			);
		},

/*
	Mixin: (d3) => {
		const getMixinNodes = () => d3.state.nodes.filter((node) => node.mixin_id === id);
		return withEngine(d3).extend({
		});
*/

	},

	nodes: [
		{
			relationType_id: 0,
			text: 'Lineage',
			constant: 'CHILD_OF',
			titles: [
				{s: 'child', p: 'children'},
				{s: 'parent', p: 'parents'}
			]
		},
		{
			relationType_id: 1,
			text: 'Authorship',
			constant: 'WORK_OF',
			titles: [
				{s: 'work', p: 'works'},
				{s: 'author', p: 'authors'}
			]
		},
		{
			relationType_id: 2,
			text: 'Path\'s step',
			titles: [
				{s: 'path', p: 'paths'},
				{s: 'step', p: 'steps'}
			]
		},
		{
			relationType_id: 3,
			text: 'Traveler\'s Path',
			titles: [
				{s: 'path', p: 'paths'},
				{s: 'traveler', p: 'travelers'}
			]
		},
	]
};

module.exports = addMixin(Relation);
