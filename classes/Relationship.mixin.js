const RelationshipTypes = [
	{
		id: 0,
		text: 'Lineage',
		titles: [
			{s: 'child', p: 'children'},
			{s: 'parent', p: 'parents'}
		]
	},
	{
		id: 1,
		text: 'Authorship',
		titles: [
			{s: 'work', p: 'works'},
			{s: 'author', p: 'authors'}
		]
	},
	{
		id: 2,
		text: 'Path\'s step',
		titles: [
			{s: 'path', p: 'paths'},
			{s: 'step', p: 'steps'}
		]
	},
	{
		id: 3,
		text: 'Traveler\'s Path',
		titles: [
			{s: 'path', p: 'paths'},
			{s: 'traveler', p: 'travelers'}
		]
	},
];

const relationshipGetterNames = [
	'getChildren', 'getParents', 'getWorks', 'getAuthors', 'getPaths', 'getSteps', 'getTravelers'
];

// Preferences for getData() method
const suppressRelationNodes = true; // Exclude all nodes which contain relationship information
const expandRelationships = false; // Include related nodes as branches of main nodes (1 level deep)

const Relationship = {
	extend: (AnnuitCœptis) => {
		class AnnuitCœptisII extends AnnuitCœptis {
			getData() {
				return super
					.getData()
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
			}

			getRelationshipTypes() {
				return RelationshipTypes.map(rt => this.getRelationshipTypeById(rt.id));
			}

			getRelationshipTypeById(id) {
				const rt = RelationshipTypes.find(rt => rt.id === id);
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
			}

			link(node1, node2, relationshipType) {
				//console.log(`Relationship type #${relationshipType.id} created between ${node1.text} and ${node2.text}`);
				this.createData({
					relationType_id: relationshipType.id,
					relatives: [node1.id, node2.id]
				});
			}

			hydrateData(data) {
				const superData = super.hydrateData(data);

				console.log(data.text);

				return {
					...superData,
					...this.getRelationshipTypes().map(
						(relationshipType) => relationshipType.titles.reduce(
							(titleAcc, title) => ({
								...titleAcc,
								[title.g]: () => this.data.filter(
									(node, idx) => {
										return (
											node.relationType_id !== undefined &&
											node.relatives.indexOf(superData.id) === (idx === 0 ? 1 : 0)
										);
									}
								).map(
									relationshipNode => {
										const x = relationshipNode.relatives.indexOf(superData.id);
										const relatedNode = this.getDataById(
											relationshipNode.relatives[x === 0 ? 1 : 0]
										);

										console.log(`${relationshipType.text}: ${superData.text} (#${superData.id}) => ${relatedNode.text} (#${relatedNode.id}`);
										return relatedNode;
									}
								)
							}), {}
						)
					).reduce( (acc, val) => ({ ...acc, ...val }) )
				};
			}

			conceiveData(data) {
				const superData = super.conceiveData(data);
				const { rel, ...newData } = superData;
				if (rel !== undefined && superData) {
					for (var relationshipTypeIds=Object.keys(rel), x=0; x<relationshipTypeIds.length; x++) {
						const relationshipTypeId = parseInt(relationshipTypeIds[x]);
						const relationshipType = this.getRelationshipTypeById(relationshipTypeId);
						for (var y=0; y<rel[relationshipTypeId].length; y++) {
							const targetNode = rel[relationshipTypeId][y];
							if (targetNode) {
								console.log(`${superData.text}(#${superData.id}) is now ${relationshipType.titles[0].s} of ${targetNode.text}(#${targetNode.id})`);
								this.link(superData, targetNode, relationshipType);
							} else {
								console.error(`No target node to link @`, rel[relationshipTypeId]);
							}
						}
					}
				}
				return {
					...newData
				};
			}
		};
		return AnnuitCœptisII;
	}
};

export default Relationship;
