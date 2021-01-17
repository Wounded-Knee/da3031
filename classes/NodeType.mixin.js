const NodeTypes = [
	'NodeType',
	'User',
	'Avatar',
	'Comment'
];

const NodeType = {
	extend: (AnnuitCœptis) => {
		class AnnuitCœptisII extends AnnuitCœptis {
			constructor(mixins) {
				const rv = super(mixins);
				this.nodeTypes = NodeTypes.map(
					nodeType => this.createData({
						text: nodeType,
						rel: {
							[ this.cardinal.id ]: [ this.cardinal.id ]
						}
					})
				);
				this.cardinal = this.nodeTypes[0];
				return rv;
			}

			getNodeTypes() {
				return this.nodeTypes;
			}

			conceiveData(data) {
				return {
					...super.conceiveData(data)
				};
			}

			hydrateData(data) {
				const superData = super.hydrateData(data); if (superData === undefined) return superData;
				const {
					rel,
					...newData
				} = superData;

				console.log(rel);
				if (rel && rel[this.cardinal.id] !== undefined) {
					const nodeType_id = rel[this.cardinal.id][0];

					return {
						rel,
						...newData,
						type: this.getDataById(nodeType_id)
					};
				} else {
					return superData;
				}
			}
		};
		return AnnuitCœptisII;
	}
};

export default NodeType;
