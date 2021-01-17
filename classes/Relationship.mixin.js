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
		text: 'Author',
		titles: [
			{s: 'work', p: 'works'},
			{s: 'author', p: 'authors'}
		]
	},
];

const suppressRelationNodes = true;

const Relationship = {
	extend: (AnnuitCœptis) => {
		class AnnuitCœptisII extends AnnuitCœptis {
			getData() {
				return suppressRelationNodes ?
					super
						.getData()
						.filter(item => item.relationType_id === undefined)
					: super.getData();
			}

			link(node1, node2, relationshipType) {
				this.createData({
					relationType_id: relationshipType.id,
					relatives: [node1.id, node2.id]
				});
			}

			hydrateData(data) {
				const superData = super.hydrateData(data);
				const relatives = {};

				if (superData !== undefined) {
					const relationNodes = this.data.filter(
						node => (
							node.relationType_id !== undefined &&
							node.relatives.indexOf(superData.id) !== -1
						)
					);
					
					relationNodes.forEach(
						relationNode => {
							const relationshipTypeId = parseInt(relationNode.relationType_id);
							const relationshipType = RelationshipTypes.find(rt => rt.id === relationshipTypeId);
							const plural = relationshipType.titles[
								relationNode.relatives.indexOf(superData.id) === 1 ? 0 : 1
							].p;
							const getterName = 'get' + plural.replace(/\b[a-zA-Z]/g, (match) => match.toUpperCase());
							relatives[getterName] = () => {
								const rels = relationNode.relatives;
								const x = rels
									.filter(nodeId => nodeId !== superData.id)
									.map(this.getDataById.bind(this));
								return x;
							};
						}
					);
				}

				return {
					...superData,
					...relatives
				};
			}

			conceiveData(data) {
				const superData = super.conceiveData(data);
				const { rel, ...newData } = superData;
				if (rel !== undefined && superData) {
					for (var relationshipTypeIds=Object.keys(rel), x=0; x<relationshipTypeIds.length; x++) {
						const relationshipTypeId = parseInt(relationshipTypeIds[x]);
						const relationshipType = RelationshipTypes.find(rt => rt.id === relationshipTypeId);
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
